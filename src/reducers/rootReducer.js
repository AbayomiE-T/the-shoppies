import { combineReducers } from 'redux'
import movieReducer from './movieReducer'

export default combineReducers({
    movieCollection: movieReducer
})