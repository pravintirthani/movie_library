import * as actionType from '../../Constant'
import * as appConstant from '../AppConstant';
let intialState={
  loginStatus:false
}

const UtilReducer = (newState = intialState, action) => {
  let response="";
  switch (action.type) {
    case actionType.login:    
      response=action.responseData;
      if(response.Status===appConstant.successStatus){          
          localStorage.setItem("serverAccessToken",response.data.token);  
          return Object.assign({}, newState, {      
            loginStatus: true
          });                
      }
      return newState
    default:
      return newState
  }
}

export default UtilReducer