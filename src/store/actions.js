import requestMethod from '../utils/request';

import { pcData, total, pcGroup, pcIP} from './state';

// action类型
export const GET_PCDATA = 'GET_PCDATA';
export const UPDATE_PCDATA = 'UPDATE_PCDATA';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';

// action创建函数

export function getPCData() {
    requestMethod({
        url: '/getHosts',
        method: 'get'
    })
        .then(function (res) {
            const data = res.data;
            pcData = data.data;
            total = pcData.length;
            pcGroup = data.pcGroup;
            //console.log(typeof pcData);
            for (let i = 0; i<total; i++) {
                pcIP[i] = pcData[i].pcIP;
            }
        });
    
        return {
            type: GET_PCDATA,
            response: {
                pcData,
                total,
                pcGroup,
                pcIP
            }
        }
}

export function updatePCData() {
    return {
        type: UPDATE_PCDATA,
        updatedPCData: getPCData().response.pcData
    }
}

export function updateTotal() {
    return {
        type: UPDATE_TOTAL,
        updatedTotal: getPCData().response.total
    }
}