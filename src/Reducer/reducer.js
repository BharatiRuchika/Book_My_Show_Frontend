const initialState = {
    profile:"",
    name:"",
    email:"",
    mobile:""
}
const SELECTED_PROFILE = "SELECTED_PROFILE"
const SELECTED_NAME = "SELECTED_NAME"
const SELECTED_EMAIL = "SELECTED_EMAIL"
const SELECTED_MOBILE = "SELECTED_MOBILE"
export default function reducer(state=initialState,action){
  switch(action.type){
case SELECTED_PROFILE:
    return Object.assign({}, state, { profile: action.payload })
case SELECTED_NAME:
    return Object.assign({}, state, { name: action.payload })
case SELECTED_EMAIL:
    return Object.assign({}, state, { email: action.payload }) 
case SELECTED_MOBILE:
    return Object.assign({},state,{mobile:action.payload})
default:
    return state
}
}
export function selectedProfile(profile){
  return {
      type:SELECTED_PROFILE,
      payload:profile
  }
}
export function selectedName(name){
    return {
        type:SELECTED_NAME,
        payload:name
    }
}
export function selectedEmail(email){
    return {
        type:SELECTED_EMAIL,
        payload:email
    }
}
export function selectedMobile(mobile){
    return {
        type:SELECTED_MOBILE,
        payload:mobile
    }
}
