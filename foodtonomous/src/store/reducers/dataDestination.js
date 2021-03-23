const initialState = {
    time: 0,
    distance: 0,
    address: []
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
        default :
        return state
    }

}

export default reducer