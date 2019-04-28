import { combineReducers } from 'redux'
import CollectionReducer from './components/Collection/CollectionReducer';
import MovieCardReducer from './components/MovieCard/MovieCardReducer';
import UtilReducer from './components/Util/Reducer';
export default combineReducers({
    CollectionReducer,    
    UtilReducer,
    MovieCardReducer
})