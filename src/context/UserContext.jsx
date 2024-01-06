
import { createContext, useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { handleError } from '../handlers/handleError';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((res) => {
      res ? setUser(res) : setUser(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const userRef = firestore().collection("barbers").where("email", "==", user.email)
          const userDataCollection = (await userRef.get()).docs

          if (userDataCollection.length > 0) {
            setUserData(userDataCollection[0].data());
          }
        }
      } catch ({ message }) {
        handleError("UserProvider", message)
      }

    })();

  }, [user]);

  // console.log(userData);


  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
