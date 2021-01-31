import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    EditOutlined,
} from "@ant-design/icons";
import requestMethod from "../../utils/request";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

// 函数组件
const EditableTable = (props) => {
    const [form] = Form.useForm();
    const [YuzhiData, setYuzhiData] = useState([]);

    useEffect(() => {
        const fetchYuzhiData = async () => {
            const result = await requestMethod({
                url: "/getThreshold",
                method: "get",
            });

            const data = result.data;
            const originData = [];
            for (let i = 0; i < data.length; i++) {
                originData.push({
                    key: i.toString(),
                    ...data[i],
                });
            }
            console.log(originData);
            setYuzhiData(originData);
        };

        fetchYuzhiData();
    }, []);

    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            max_condition: "",
            min_condition: "",
            desc: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...YuzhiData];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setYuzhiData(newData);
                setEditingKey("");
                props.onEdit(newData);
            } else {
                newData.push(row);
                setYuzhiData(newData);
                setEditingKey("");
                props.onEdit(newData);
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const settingModalColumns = [
        {
            title: "键",
            dataIndex: "name",
            key: "name",
            width: "15%",
        },
        {
            title: "最大值",
            dataIndex: "max_condition",
            key: "max_condition",
            width: "20%",
            editable: true,
        },
        {
            title: "最小值",
            key: "min_condition",
            dataIndex: "min_condition",
            width: "20%",
            editable: true,
        },
        {
            title: "警报描述",
            key: "desc",
            dataIndex: "desc",
            width: "30%",
            editable: true,
        },
        {
            title: "操作",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <CheckCircleOutlined
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        />

                        <Popconfirm title="确定取消吗?" onConfirm={cancel}>
                            <CloseCircleOutlined />
                        </Popconfirm>
                    </span>
                ) : (
                    <EditOutlined
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    />
                );
            },
        },
    ];

    const mergedColumns = settingModalColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "desc" ? "text" : "number",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={YuzhiData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{ position: ["bottomLeft"] }}
            />
        </Form>
    );
};

export default EditableTable;
