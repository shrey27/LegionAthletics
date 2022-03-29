import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SIGNOUT, HOMEPAGE } from '../../routes';
import { SIGNINAPI, SIGNUPAPI } from '../../apiEndpoints';
import { ToastMessage } from '../common/toast';
import { useLocalStorage } from '../helpers';
import { guestCredentials } from '../common/constants';

const AuthentiationContext = createContext();

const defaultState = {
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
const authReducerFunc = (state, action) => {
  switch (action.type) {
    case 'SIGNIN-EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'EMAIL-INCORRECT':
      return {
        ...state,
        emailError: 'Enter the email in correct format'
      };
    case 'SIGNIN-PASSWORD':
      return {
        ...state,
        password: action.payload
      };
    case 'PASSWORD-INCORRECT':
      return {
        ...state,
        passwordError: 'Password should be atleast 8 chars long'
      };
    case 'SIGNUP-EMAIL':
      return {
        ...state,
        signUpEmail: action.payload
      };
    case 'SIGNUP-EMAIL-INCORRECT':
      return {
        ...state,
        signUpEmailError: 'Enter the email in correct format'
      };
    case 'SIGNUP-PASSWORD':
      return {
        ...state,
        signUpPassword: action.payload
      };
    case 'SIGNUP-PASSWORD-INCORRECT':
      return {
        ...state,
        signUpPasswordError: 'Password should be atleast 8 chars long'
      };
    case 'SIGNUP-USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SIGNUP-USERNAME-ERROR':
      return {
        ...state,
        userNameError: 'Username can only have alphabets'
      };
    case 'CONFIRM-PASSWORD':
      return {
        ...state,
        cnfPassword: action.payload
      };
    case 'CONFIRM-PASSWORD-INCORRECT':
      return {
        ...state,
        cnfpasswordError: 'Password should be atleast 8 chars long'
      };
    case 'PASSWORDS-MISMATCH':
      return {
        ...state,
        signupError: "Passwords Don't Match"
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
        signupError: 'SIGN UP FAILED! TRY AFTER SOME TIME'
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

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducerFunc, defaultState);
  const {
    email,
    password,
    signUpEmail,
    signUpPassword,
    cnfPassword,
    username,
    rememberMe,
    signinRememberMe,
    token
  } = state;

  const navigate = useNavigate();
  const {
    storedEmail,
    storedPassword,
    storedToken,
    storedName,
    storedSurname
  } = useLocalStorage();

  function validateSignIn() {
    const errorArray = [];
    if (
      !email ||
      !email.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
    ) {
      errorArray.push('EMAIL-INCORRECT');
    }
    if (!password || password.length < 8) {
      errorArray.push('PASSWORD-INCORRECT');
    }
    if (errorArray.length) {
      errorArray.forEach((elem) => dispatch({ type: elem }));
      return false;
    }
    return true;
  }

  function validationSignUp() {
    const errorArray = [];
    if (!username || !username.match(/^[a-zA-Z ]+/)) {
      errorArray.push('SIGNUP-USERNAME-ERROR');
    }
    if (
      !signUpEmail ||
      !signUpEmail.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
    ) {
      errorArray.push('SIGNUP-EMAIL-INCORRECT');
    }
    if (!signUpPassword || signUpPassword.length < 8) {
      errorArray.push('SIGNUP-PASSWORD-INCORRECT');
    }
    if (!cnfPassword || cnfPassword.length < 8) {
      errorArray.push('CONFIRM-PASSWORD-INCORRECT');
    }
    if (cnfPassword !== signUpPassword) {
      errorArray.push('PASSWORDS-MISMATCH');
    }
    if (errorArray.length) {
      errorArray.forEach((elem) => dispatch({ type: elem }));
      return false;
    }
    return true;
  }

  const handleSignIn = async () => {
    if (validateSignIn()) {
      if (!rememberMe) {
        try {
          const {
            data: { foundUser, encodedToken }
          } = await axios.post(SIGNINAPI, {
            email,
            password
          });
          if (foundUser) {
            localStorage.setItem('token', encodedToken);
            localStorage.setItem('userData', JSON.stringify(foundUser));
            dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
            dispatch({
              type: 'SIGNUP-USERNAME',
              payload: guestCredentials.username
            });
            navigate(HOMEPAGE);
            ToastMessage('Sign In was Successfull', 'success');
          } else {
            throw new Error('User not Found');
          }
        } catch (err) {
          console.log('SIGNIN-ERROR', err);
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: 'User Not Found. Either Sign-up or try again later'
          });
          ToastMessage('Sign In failed! User Not Found', 'error');
        }
      } else {
        if (storedEmail === email && storedPassword === password) {
          dispatch({ type: 'TOKEN-SAVED', payload: storedToken });
          // dispatch({ type: 'SET-DEFAULT' });
          dispatch({
            type: 'SIGNUP-USERNAME',
            payload: storedName + ' ' + storedSurname
          });
          navigate(HOMEPAGE);
          ToastMessage('Sign In was Successfull', 'success');
        } else {
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: 'User Not Found. Either Sign-up or try again later'
          });
          dispatch({ type: 'SET-DEFAULT' });
          ToastMessage('Sign In failed! User Not Found', 'error');
        }
      }
    } else {
      console.log('failed');
    }
  };

  const handleSignUp = async () => {
    if (validationSignUp()) {
      try {
        const response = await axios.post(SIGNUPAPI, {
          firstName: username.split(' ')[0],
          lastName: username.split(' ')[1],
          email,
          password
        });
        const { createdUser, encodedToken } = response.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
        navigate(HOMEPAGE);
        ToastMessage('Sign Up was Successfull', 'success');
      } catch (err) {
        console.log(err);
        dispatch({ type: 'CLEAR-FIELDS' });
        dispatch({ type: 'SIGNUP-ERROR' });
        ToastMessage('Sign Up failed! Try Again later', 'error');
      }
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOKEN-REMOVED' });
    if (!rememberMe && !signinRememberMe) localStorage.clear();
    dispatch({ type: 'SET-DEFAULT' });
    navigate(SIGNOUT);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      dispatch({ type: 'TOKEN-SAVED', payload: localStorage.getItem('token') });
      const parsedData = JSON.parse(storedData);
      dispatch({
        type: 'SIGNUP-USERNAME',
        payload: `${parsedData.firstName} ${parsedData.lastName}`
      });
    }
  }, []);

  return (
    <AuthentiationContext.Provider
      value={{
        ...state,
        token,
        dispatch,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        firstName: username.split(' ')[0],
        lastName: username.split(' ')[1]
      }}
    >
      {children}
    </AuthentiationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthentiationContext);
export { useAuthCtx, AuthProvider };
