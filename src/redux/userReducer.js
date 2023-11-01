const initialState = {
  user: {}
}


export const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("in login success", action)
      return {
        ...state, user: action.payload
      }
    case "LOGIN_ERROR":
      return initialState; 
    default:
      return initialState;
  }
}