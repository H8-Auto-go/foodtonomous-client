const initialState = {
  schedule: []
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {

  case 'SET_AUTO_SCHEDULE/SCHEDULE':
    return { ...state, schedule: payload }

  default:
    return state
  }
}
