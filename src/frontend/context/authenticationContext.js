import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthentiationContext = createContext();
import { HOMEPAGE } from '../../routes';
import { SIGN_IN, SIGN_UP } from '../../apiEndpoints';

const defaultState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  cnfPassword: '',
  cnfpasswordError: '',
  signinError: '',
  signupError: '',
  rememberMe: false,
  userdata: '',
  token: null
};
const authReducerFunc = (state, action) => {
  switch (action.type) {
    case 'SIGNIN-EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'SIGNIN-PASSWORD':
      return {
        ...state,
        password: action.payload
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
        signinError: 'SIGN IN FAILED! TRY AFTER SOME TIME'
      };
    case 'SIGNUP-ERROR':
      return {
        ...state,
        signupError: 'SIGN UP FAILED! TRY AFTER SOME TIME'
      };
    case 'PASSWORDS-MISMATCH':
      return {
        ...state,
        signupError: "Passwords Don't Match"
      };
    case 'CONFIRM-PASSWORD':
      return {
        ...state,
        cnfPassword: action.payload
      };
    case 'EMAIL-INCORRECT':
      return {
        ...state,
        emailError: 'Enter the email in correct format'
      };
    case 'PASSWORD-INCORRECT':
      return {
        ...state,
        passwordError: 'Password should be atleast 8 chars long'
      };
    case 'CONFIRM-PASSWORD-INCORRECT':
      return {
        ...state,
        cnfpasswordError: 'Password should be atleast 8 chars long'
      };
    case 'CLEAR-ALL-ERRORS':
      return {
        ...state,
        cnfpasswordError: '',
        passwordError: '',
        emailError: '',
        signupError: '',
        signinError: ''
      };
    case 'REMEMBER-ME':
      return {
        ...state,
        rememberMe: !state.rememberMe
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
    cnfPassword,
    rememberMe,
    signinError,
    signupError,
    userdata,
    token,
    emailError,
    passwordError,
    cnfpasswordError
  } = state;
  const navigate = useNavigate();

  function validationFun() {
    if (
      !email ||
      !email.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
    ) {
      dispatch({ type: 'EMAIL-INCORRECT' });
      return false;
    }

    if (!password || password.length < 8) {
      dispatch({ type: 'PASSWORD-INCORRECT' });
      return false;
    }

    if (!cnfPassword || cnfPassword.length < 8) {
      dispatch({ type: 'CONFIRM-PASSWORD-INCORRECT' });
      return false;
    }

    if (cnfPassword !== password) {
      dispatch({ type: 'PASSWORDS-MISMATCH' });
      return false;
    }

    return true;
  }

  const handleSignIn = async () => {
    if (!rememberMe) {
      try {
        // const storedEmail = JSON.parse(localStorage.getItem('userData')).email;
        // const storedPassword = JSON.parse(
        //   localStorage.getItem('userData')
        // ).password;
        // const storedToken = localStorage.getItem('token');
        // if (storedEmail === email && storedPassword === password) {
        //   dispatch({ type: 'TOKEN-SAVED', payload: storedToken });
        // } else {
        const resp = await axios.post(SIGN_IN, {
          email,
          password
        });
        const { createdUser, encodedToken } = resp.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
        // }
      } catch (err) {
        dispatch({ type: 'SIGNIN-ERROR' });
        console.log(err);
      } finally {
        dispatch({ type: 'SET-DEFAULT' });
        navigate(HOMEPAGE);
      }
    } else {
      dispatch({ type: 'TOKEN-SAVED', payload: localStorage.getItem('token') });
      dispatch({ type: 'SET-DEFAULT' });
      navigate(HOMEPAGE);
    }
  };

  const handleSignUp = async () => {
    if (validationFun()) {
      try {
        const response = await axios.post(SIGN_UP, {
          email,
          password
        });
        const { createdUser, encodedToken } = response.data;
        console.log(createdUser, encodedToken);
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
      } catch (err) {
        dispatch({ type: 'SIGNUP-ERROR' });
        console.log(err);
      } finally {
        dispatch({ type: 'SET-DEFAULT' });
        navigate(HOMEPAGE);
      }
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOKEN-REMOVED' });
    if (!rememberMe) localStorage.clear();
    navigate(HOMEPAGE);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      dispatch({ type: 'TOKEN-SAVED', payload: localStorage.getItem('token') });
    }
  }, []);

  return (
    <AuthentiationContext.Provider
      value={{
        email,
        password,
        userdata,
        cnfPassword,
        rememberMe,
        token,
        signinError,
        signupError,
        dispatch,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        emailError,
        passwordError,
        cnfpasswordError
      }}
    >
      {children}
    </AuthentiationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthentiationContext);
export { useAuthCtx, AuthProvider };
