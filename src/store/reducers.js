// 整个react应用只有一个单一的reducer函数
// reducer 只是一个接收 state 和 action，并返回新的 state 的函数

import { combineReducers } from 'redux';
import { GET_PCDATA, UPDATE_PCDATA, UPDATE_TOTAL } from './actions'
// import data from './state';

// const initialState = data;

function getPCData(state = [], action) {
    switch(action.type) {
        case GET_PCDATA:
            return action.response.pcData
        default:
            return state
    }
}

function updatePCData(state = [], action) {
    switch(action.type) {
        case UPDATE_PCDATA:
            return action.updatedPCData
        default:
            return state
    }
}
function updateTotal(state = 0, action) {
    switch(action.type) {
        case UPDATE_TOTAL:
            return action.updatedTotal
        default:
            return state
    }
}


// 合并各个分reducer为总reducer
const appData = combineReducers({
    getPCData,
    updatePCData,
    updateTotal
});

export default appData;