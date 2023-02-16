import firestore from '@react-native-firebase/firestore';

export const getUserDataByEmailOrPhone = async (
  email,
  phone,
  schedule,
  setSchedule,
  setModalServiceVisible,
) => {
  try {
    const querySnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setSchedule({...schedule, client: userData});
      setModalServiceVisible(true);
    } else {
      const querySnapshot = await firestore()
        .collection('users')
        .where('phone', '==', phone)
        .get();
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setSchedule({...schedule, client: userData});
        setModalServiceVisible(true);
      } else {
        console.log('User not found');

        setSchedule({...schedule, client: null});
        setModalServiceVisible(true);
        return null;
      }
    }
  } catch (error) {
    console.log('Error getting user data:', error);
    setSchedule({...schedule, client: null});
    setModalServiceVisible(false);
    return null;
  }
};
