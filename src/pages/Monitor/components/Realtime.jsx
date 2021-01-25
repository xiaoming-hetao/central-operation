import React, { Component } from "react";

class MonitorRealtime extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            JSON.stringify(prevProps.disk) !== JSON.stringify(this.props.disk)
        ) {
            console.log(this.props.disk);
        }
    };
    render() {
        return <div>123</div>;
    }
}

export default MonitorRealtime;
