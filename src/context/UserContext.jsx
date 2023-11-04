
import { createContext, useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { handleError } from '../handlers/handleError';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState();

  auth().onAuthStateChanged(res => {
    res ? setUser(res) : setUser(null);
  });

  useEffect(() => {
    try {
      user
        ? firestore()
          .collection('barbers')
          .where('email', '==', user.email)
          .get()
          .then(async ({ _docs }) => {
            setUserData(_docs[0]._data);
          })
        : setUserData(null);
    } catch ({ message }) {
      handleError("UserProvider", message);
    }
  }, [user]);


  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
