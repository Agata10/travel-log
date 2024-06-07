import { createContext, useEffect, useState } from 'react';
import { getUser } from '../../api/userAPI';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  // console.log('AuthContext state ', authUser);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const user = await getUser();
        if (user) {
          setAuthUser({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            token: token,
          });
        }
      }
    };
    getUserData();
  }, [token]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
