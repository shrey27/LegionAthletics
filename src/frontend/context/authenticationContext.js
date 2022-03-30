import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  SIGNOUT,
  HOMEPAGE,
  SIGNINAPI,
  SIGNUPAPI,
  UPDATEDETAILS
} from '../routes/routes';
import { ToastMessage } from '../components';
import {
  useLocalStorage,
  validateSignIn,
  validationSignUp,
  validateUpdateDetails,
  authReducerFunc,
  defaultState
} from '../helpers';
import { errorStatements } from '../utility/constants';

const AuthentiationContext = createContext();

const AuthProvider = ({ children }) => {
  const [disable, setDisable] = useState(true);
  const [state, dispatch] = useReducer(authReducerFunc, defaultState);
  const {
    email,
    password,
    signUpEmail,
    signUpPassword,
    firstName,
    lastName,
    phone,
    address,
    rememberMe,
    signinRememberMe,
    token
  } = state;

  const navigate = useNavigate();
  const {
    storedEmail,
    storedToken,
    storedName,
    storedSurname,
    storedPhone,
    storedAddress,
    updateLocalStorage
  } = useLocalStorage();

  const handleUserDetails = (userDetails) => {
    const { firstName, lastName, phone, address, email } = userDetails;
    dispatch({
      type: 'SIGNUP-FIRSTNAME',
      payload: firstName
    });
    dispatch({
      type: 'SIGNUP-LASTNAME',
      payload: lastName
    });
    dispatch({
      type: 'SIGNUP-PHONE',
      payload: phone
    });
    dispatch({
      type: 'SIGNUP-ADDRESS',
      payload: address
    });
    dispatch({
      type: 'SIGNUP-EMAIL',
      payload: email
    });
    dispatch({
      type: 'SIGNIN-EMAIL',
      payload: email
    });
  };
  const handleSignIn = async () => {
    if (validateSignIn(state, dispatch)) {
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
            handleUserDetails(foundUser);
            navigate(HOMEPAGE);
            ToastMessage('Sign In was Successfull', 'success');
          } else {
            throw new Error('User not Found');
          }
        } catch (err) {
          console.log('SIGNIN-ERROR', err);
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: errorStatements['SIGN-IN-ERROR']
          });
          ToastMessage(errorStatements['SIGN-IN-ERROR'], 'error');
        }
      } else {
        if (storedEmail === email) {
          dispatch({ type: 'TOKEN-SAVED', payload: storedToken });
          handleUserDetails({
            firstName: storedName,
            lastName: storedSurname,
            phone: storedPhone,
            address: storedAddress
          });
          navigate(HOMEPAGE);
          ToastMessage('Sign In was Successfull', 'success');
        } else {
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: errorStatements['SIGN-IN-ERROR']
          });
          dispatch({ type: 'SET-DEFAULT' });
          ToastMessage(errorStatements['SIGN-IN-ERROR'], 'error');
        }
      }
    } else {
      console.log('failed');
    }
  };

  const handleSignUp = async () => {
    if (validationSignUp(state, dispatch)) {
      try {
        const response = await axios.post(SIGNUPAPI, {
          firstName,
          lastName,
          email: signUpEmail,
          password: signUpPassword,
          phone,
          address
        });
        const { createdUser, encodedToken } = response.data;
        delete createdUser.password;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
        navigate(HOMEPAGE);
        ToastMessage('Sign Up was Successfull', 'success');
      } catch (err) {
        console.log(err);
        dispatch({ type: 'CLEAR-FIELDS' });
        dispatch({
          type: 'SIGNUP-ERROR',
          payload: errorStatements['SIGN-UP-ERROR']
        });
        ToastMessage('Sign Up Failed!', 'error');
      }
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOKEN-REMOVED' });
    if (!rememberMe && !signinRememberMe) localStorage.clear();
    dispatch({ type: 'SET-DEFAULT' });
    navigate(SIGNOUT);
  };

  const profileUpdateCancelled = () => {
    dispatch({
      type: 'SIGNUP-FIRSTNAME',
      payload: storedName
    });
    dispatch({
      type: 'SIGNUP-LASTNAME',
      payload: storedSurname
    });
    dispatch({ type: 'SIGNUP-ADDRESS', payload: storedAddress });
    dispatch({ type: 'SIGNUP-PHONE', payload: storedPhone });
    setDisable(true);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (validateUpdateDetails(state, dispatch)) {
      console.log('details to update', {
        firstName,
        lastName,
        phone,
        email,
        signUpEmail,
        address
      });
      try {
        const {
          data: { updatedDetails }
        } = await axios.post(
          UPDATEDETAILS,
          {
            firstName,
            lastName,
            phone,
            email: email ?? signUpEmail,
            address
          },
          {
            headers: {
              authorization: token
            }
          }
        );
        console.log('updatedDetails', updatedDetails);
        // handleUserDetails(updatedDetails);
        updateLocalStorage('firstName', firstName);
        updateLocalStorage('lastName', lastName);
        updateLocalStorage('phone', phone);
        updateLocalStorage('address', address);
        updateLocalStorage('email', email);
        setDisable(true);
        ToastMessage('Details updated Successfully', 'success');
      } catch (err) {
        console.log('profile details error', err);
        profileUpdateCancelled();
        ToastMessage('Profile updation failed', 'error');
      }
    } else {
      ToastMessage('Please enter correct details', 'error');
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      dispatch({ type: 'TOKEN-SAVED', payload: localStorage.getItem('token') });
      const parsedData = JSON.parse(storedData);
      handleUserDetails(parsedData);
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
        handleProfileUpdate,
        profileUpdateCancelled,
        disable,
        setDisable
      }}
    >
      {children}
    </AuthentiationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthentiationContext);
export { useAuthCtx, AuthProvider };
