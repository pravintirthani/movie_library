import * as Constant from '../AppConstant';

export function genrateRequiredMsg(field){
    return field+Constant.getRequiredFieldMsg
}
export function genrateNotProperMsg(field){
    return field+Constant.getNotProperMsg
}