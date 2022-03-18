import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthentiationContext = createContext();
import { HOMEPAGE } from '../../routes';
import { SIGN_IN, SIGN_UP } from '../../apiEndpoints';

const defaultState = {
  email: '',
  password: '',
  signinError: '',
  signupError: '',
  userdata: '',
  token: localStorage.getItem('token') ?? ''
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
        token: action.payload
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
    default:
      return {
        ...state
      };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducerFunc, defaultState);
  const { email, password, signinError, signupError, userdata, token } = state;
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const storedEmail = JSON.parse(localStorage.getItem('userData')).email;
      const storedPassword = JSON.parse(
        localStorage.getItem('userData')
      ).password;
      const storedToken = localStorage.getItem('token');
      if (storedEmail === email && storedPassword === password) {
        dispatch({ type: 'TOKEN-SAVED', payload: storedToken });
      } else {
        const resp = await axios.post(SIGN_IN, {
          email,
          password
        });
        const { createdUser, encodedToken } = response.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
      }
    } catch (err) {
      dispatch({ type: 'SIGNIN-ERROR' });
      console.log(err);
    } finally {
      navigate(HOMEPAGE);
    }
  };

  const handleSignUp = async () => {
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
      navigate(HOMEPAGE);
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOKEN-REMOVED' });
    // localStorage.removeItem('token');
    navigate(HOMEPAGE);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      dispatch({ type: 'TOKEN-SAVED', payload: 'TOKENSAVED' });
    }
  }, []);

  return (
    <AuthentiationContext.Provider
      value={{
        email,
        password,
        userdata,
        token,
        signinError,
        signupError,
        dispatch,
        handleSignIn,
        handleSignUp,
        handleSignOut
      }}
    >
      {children}
    </AuthentiationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthentiationContext);
export { useAuthCtx, AuthProvider };
