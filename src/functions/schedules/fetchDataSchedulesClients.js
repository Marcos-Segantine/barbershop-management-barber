import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const fetchDataSchedulesClients = async (setDataFiltered) => {
    const {email} = auth().currentUser;
    const barbersQuerySnapshot = await firestore()
      .collection('barbers')
      .where('email', '==', email)
      .get();
    const barberName = barbersQuerySnapshot.docs[0].data().name;

    const schedulesQuerySnapshot = await firestore()
      .collection('schedules_month')
      .get();
    const dataTemp = [];
    schedulesQuerySnapshot.forEach(doc => {
      const data = doc.data();
      Object.keys(data).forEach(day => {
        const barberSchedule = data[day][barberName];
        if(!barberSchedule) return
        const keys__barberSchedule = Object.keys(barberSchedule)
        if (barberSchedule && keys__barberSchedule.length > 0) {
          dataTemp.push(barberSchedule[Object.keys(barberSchedule)[0]]);
        }
      });
    });
    setDataFiltered(dataTemp);
  };