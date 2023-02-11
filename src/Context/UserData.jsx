
import {createContext, useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const UserDataContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState();

  auth().onAuthStateChanged(res => {
    res ? setUid(res.uid) : setUid(null);
  });

  useEffect(() => {
    uid
      ? firestore()
          .collection('barbers')
          .where('uid', '==', uid)
          .get()
          .then(async ({_docs}) => {
            setUser(_docs[0]._data);
          })
      : setUser(null);
  }, [uid]);

  return (
    <UserDataContext.Provider value={{user, setUser, uid, setUid}}>
      {children}
    </UserDataContext.Provider>
  );
};
