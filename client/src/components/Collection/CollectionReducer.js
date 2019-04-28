import * as actionType from '../../Constant'
import * as appConstant from '../AppConstant';
let intialState={
  movieCollectionData:"",
  pendingMovieList:"",
  userMovieList:"",
  genreListData:""
}

export function CollectionReducer(newState = intialState, action){
  let response="";
  switch (action.type) {
    case actionType.getMovieList:
      response=action.responseData;      
      if(response.Status===appConstant.successStatus){
        return Object.assign({}, newState, {      
          movieCollectionData: response.data
        });
      }      
      return newState
    case actionType.getPendingMovieListOfUser:
      response=action.responseData;      
      if(response.Status===appConstant.successStatus){
        return Object.assign({}, newState, {      
          pendingMovieList: response.data
        });        
      }      
      return newState
    case actionType.getUserMovieList:
      response=action.responseData;      
      if(response.Status===appConstant.successStatus){
        return Object.assign({}, newState, {      
          userMovieList: response.data
        });
      }      
      return newState    
    case actionType.getGenreList:
      response=action.responseData;      
      if(response.Status===appConstant.successStatus){
        return Object.assign({}, newState, {      
          genreListData: response.data
        });
      }      
      return newState  
    default:
      return newState
  }
}

export default CollectionReducer;