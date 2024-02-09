import React, {useContext, useReducer} from 'react';

import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {SET_USER_DATA, UPDATE_CREDIT} from '../types';

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, {
    credit: 3000,
    isDarkTheme: false,
  });

  const setUserData = userData => {
    dispatch({type: SET_USER_DATA, payload: userData});
  };

  const updateCredit = newCredit => {
    dispatch({type: UPDATE_CREDIT, payload: newCredit});
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        credit: state.credit,
        isDarkTheme: state.isDarkTheme,
        setUserData,
        updateCredit,
      }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

export {UserProvider, useUser};
