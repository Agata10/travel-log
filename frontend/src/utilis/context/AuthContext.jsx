import { createContext, useEffect, useState } from 'react';
import { getUser } from '../../api/userAPI';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(isLoading);
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
        } else {
          setAuthUser(null);
        }
        setIsLoading(false);
      }
    };

    getUserData();
  }, [isLoading]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
