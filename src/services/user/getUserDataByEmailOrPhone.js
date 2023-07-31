import firestore from '@react-native-firebase/firestore';

export const getUserDataByEmailOrPhone = async (
  email,
  phone,
  setNotFoundUserVisible,
  setModalShowUser,
  setSomethingWrong
) => {
  try {

    const usersRef = email ?
      await firestore().collection("users").where("email", "==", email).get() :
      await firestore().collection("users").where("phone", "==", phone).get()

    if (usersRef.docs.length === 0) {
      setNotFoundUserVisible(true)
      return
    }

    if (email) {
      const user = usersRef.docs[0].data()

      setModalShowUser(true)
      return user;
    }

    else if (phone) {
      const user = usersRef.docs[0].data()

      setModalShowUser(true)
      return user
    }

  } catch (error) {
    console.log(error);
    setSomethingWrong(true)
  }
};
