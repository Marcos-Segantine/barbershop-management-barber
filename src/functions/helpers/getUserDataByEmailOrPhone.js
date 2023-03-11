import firestore from '@react-native-firebase/firestore';

import { takeOutFormatPhoneNumber } from './takeOutFormatPhoneNumber';

export const getUserDataByEmailOrPhone = async (
  email,
  phone,
  schedule,
  setSchedule,
  setModalServiceVisible,
) => {
  try {

    let userDocData

    // users collection reference
    const usersRef = firestore().collection('users')

    // if email was gave, search user by email
    if (email) {
      const userData = usersRef.where('email', '==', email);
      if (!(await userData.get()).docs.length) throw Error("User not found!")

      userDocData = (await userData.get()).docs[0].data()
    }

    // if phone number was gave, search user by phone number
    else if (phone) {
      const userData = usersRef.where('phone', '==', `+55${takeOutFormatPhoneNumber(phone)}`);
      if (!(await userData.get()).docs.length) throw Error("User not found!")

      userDocData = (await userData.get()).docs[0].data()
    }

    console.log(userDocData);
    // set data from user in context
    setSchedule({ ...schedule, client: { ...userDocData } });

    // show the services to keep on schedule
    setModalServiceVisible(true);

  } catch (error) {

    console.log(error);
    setModalServiceVisible(false);
    return null;
  }
};
