import firestore from '@react-native-firebase/firestore';

export const getUserDataByEmailOrPhone = async (
  email,
  phone,
  schedule,
  setSchedule,
  setModalServiceVisible,
) => {
  try {

    let userDocData

    if (email) {
      const usersRef = firestore().collection('users').where('email', '==', email);
      userDocData = (await usersRef.get()).docs[0].data()
    }
    else if (phone) {
      const usersRef = firestore().collection('users').where('phone', '==', `+55${phone}`);
      userDocData = (await usersRef.get()).docs[0].data()
    } else {
      setModalServiceVisible(false)
      throw Error("USER NOT FOUND")
    }

    setSchedule({ ...schedule, client: { ...userDocData } });
    setModalServiceVisible(true);

  } catch (error) {
    console.log('Error getting user data:', error);
    setModalServiceVisible(false);
    return null;
  }
};
