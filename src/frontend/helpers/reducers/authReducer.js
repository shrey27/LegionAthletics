export const defaultState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  signUpEmail: '',
  signUpEmailError: '',
  signUpPassword: '',
  signUpPasswordError: '',
  cnfPassword: '',
  cnfpasswordError: '',
  username: '',
  userNameError: '',
  signinError: '',
  signupError: '',
  rememberMe: false,
  signinRememberMe: false,
  token: ''
};
export const authReducerFunc = (state, action) => {
  switch (action.type) {
    case 'SIGNIN-EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'EMAIL-INCORRECT':
      return {
        ...state,
        emailError: action.payload
      };
    case 'SIGNIN-PASSWORD':
      return {
        ...state,
        password: action.payload
      };
    case 'PASSWORD-INCORRECT':
      return {
        ...state,
        passwordError: action.payload
      };
    case 'SIGNUP-EMAIL':
      return {
        ...state,
        signUpEmail: action.payload
      };
    case 'SIGNUP-EMAIL-INCORRECT':
      return {
        ...state,
        signUpEmailError: action.payload
      };
    case 'SIGNUP-PASSWORD':
      return {
        ...state,
        signUpPassword: action.payload
      };
    case 'SIGNUP-PASSWORD-INCORRECT':
      return {
        ...state,
        signUpPasswordError: action.payload
      };
    case 'SIGNUP-USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SIGNUP-USERNAME-ERROR':
      return {
        ...state,
        userNameError: action.payload
      };
    case 'CONFIRM-PASSWORD':
      return {
        ...state,
        cnfPassword: action.payload
      };
    case 'CONFIRM-PASSWORD-INCORRECT':
      return {
        ...state,
        cnfpasswordError: action.payload
      };
    case 'PASSWORDS-MISMATCH':
      return {
        ...state,
        signupError: action.payload
      };
    case 'TOKEN-SAVED':
      return {
        ...state,
        userdata: 'TOKENSAVED',
        token: action.payload,
        signupError: ''
      };
    case 'TOKEN-REMOVED':
      return {
        ...state,
        userdata: '',
        token: ''
      };
    case 'SIGNIN-ERROR':
      return {
        ...state,
        signinError: action.payload
      };
    case 'SIGNUP-ERROR':
      return {
        ...state,
        signupError: action.payload
      };
    case 'CLEAR-ALL-ERRORS':
      return {
        ...state,
        cnfpasswordError: '',
        passwordError: '',
        emailError: '',
        signupError: '',
        signinError: '',
        userNameError: '',
        signUpEmailError: '',
        signUpPasswordError: ''
      };
    case 'REMEMBER-ME':
      return {
        ...state,
        rememberMe: !state.rememberMe
      };
    case 'SIGNIN-REMEMBER-ME':
      return {
        ...state,
        signinRememberMe: !state.signinRememberMe
      };
    case 'SET-DEFAULT':
      return {
        ...defaultState
      };
    default:
      return {
        ...state
      };
  }
};
