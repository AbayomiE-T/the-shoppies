import { GET_MOVIES } from '../actions/types'

const initialState = {
    movies: null
}

export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.data
            }
        default:
            return state;
    }
}