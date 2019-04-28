import * as action from '../../Constant.js';
import {async} from '../../api/index.js';

export function addFavouriteMovie(data={}){
  data.action=action.addFavouriteMovie;    
  return dispatch => {
      async("/movie.php","POST",data)
      .then(resp => dispatch({ type: action.addFavouriteMovie, responseData:resp }))
   }  
}
export function removeFavouriteMovie(data={}){
  data.action=action.removeFavouriteMovie;    
  return dispatch => {
      async("/movie.php","POST",data)
      .then(resp => dispatch({ type: action.removeFavouriteMovie, responseData:resp }))
   }
}