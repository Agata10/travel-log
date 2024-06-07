import { createContext, useEffect, useState } from 'react';
import { getUser } from '../../api/userAPI';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // console.log('AuthContext state ', authUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(isLoading);
    const getUserData = async () => {
      if (token) {
        console.log(token);
        const user = await getUser();
        if (user) {
          setAuthUser({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            token: token,
          });
          console.log('new user', authUser);
        } else {
          setAuthUser(null);
        }
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
