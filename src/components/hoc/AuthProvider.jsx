import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const singin = (newUser, cb) => {
    setUser(newUser);
    cb();
  }
  const singout = (cb) => {
    setUser(null);
    cb();
  }

  const value = { user, singin, singout };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}