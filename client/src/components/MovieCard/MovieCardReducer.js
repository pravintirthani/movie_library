import * as actionType from '../../Constant'
import * as appConstant from '../AppConstant';
let intialState={
  addFavouriteMovieStatus:false,
  removeFavouriteMovieStatus:false
}

export function MovieCardReducer(newState = intialState, action){
  let response="";
  switch (action.type) {
    case actionType.addFavouriteMovie:
      response=action.responseData;      
      if(response.Status===appConstant.successStatus){
        return Object.assign({}, newState, {      
          addFavouriteMovieStatus: response.data
        });
      }      
      return newState
    case actionType.removeFavouriteMovie:
      response=action.responseData;      
      if(response.Status===appConstant.successStatus){
        return Object.assign({}, newState, {      
          removeFavouriteMovieStatus: response.data
        });        
      }      
      return newState    
    default:
      return newState
  }
}

export default MovieCardReducer;