import { State } from "react-native-gesture-handler"

const initialState = {
    time: 0,
    distance: 0,
    address: [],
    resCoords: {},
    cusCoords: {}
}

function reducer (state = initialState, {type, payload}){
    switch(type) {
        case 'SET_TIME/TIME':
            return {
                ...state,
                time: payload
            }
        case 'SET_DISNTANCE/DISTANCE':
            return {
                ...state,
                distance: payload
            }
        case 'SET_ADDRESS/ADDRESS':
            return {
                ...state,
                address: payload
            }
        case 'SET_RESCOORDS/RESCOORDS':
            return {
                ...state,
                resCoords: payload
            }
        case 'SET_CUSCOORDS/CUSCOORDS':
            return {
                ...state,
                cusCoords: payload
            }
        default :
        return state
    }

}

export default reducer