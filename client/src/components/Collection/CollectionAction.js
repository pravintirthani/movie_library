import * as action from '../../Constant.js';
import {async} from '../../api/index.js';

export function getMovieList(data={}){
  data.action=action.getMovieList;    
  return dispatch => {
      async("/movie.php","POST",data)
      .then(resp => dispatch({ type: action.getMovieList, responseData:resp }))
   }  
}
export function getGenreList(data={}){
  data.action=action.getGenreList;    
  return dispatch => {
      async("/genres.php","POST",data)
      .then(resp => dispatch({ type: action.getGenreList, responseData:resp }))
   }
}

export function getPendingMovieListOfUser(data={}){
  data.action=action.getPendingMovieListOfUser;    
  return dispatch => {
      async("/movie.php","POST",data)
      .then(resp => dispatch({ type: action.getPendingMovieListOfUser, responseData:resp }))
   }
}

export function getUserMovieList(data={}){
  data.action=action.getUserMovieList;    
  return dispatch => {
      async("/movie.php","POST",data)
      .then(resp => dispatch({ type: action.getUserMovieList, responseData:resp }))
   }
}
