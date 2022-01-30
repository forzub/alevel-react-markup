import { createContext, useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { admSetCurrentUser } from '../../store/admin';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const redux_user = useSelector(store => store.admin.current_user);

  useEffect(()=>{
    setUser(redux_user);
  },[redux_user])

  const singin = (newUser, cb) => {
    setUser(newUser);
    dispatch( admSetCurrentUser(newUser) );
    cb();
  }

  const singout = (cb) => {
    setUser(null);
    dispatch( admSetCurrentUser(null) );
    localStorage.clear();
    cb();
  }

  const value = { user, singin, singout };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}