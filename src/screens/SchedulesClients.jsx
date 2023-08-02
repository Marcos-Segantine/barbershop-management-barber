import { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { UserContext } from '../context/UserContext';
import { SomethingWrongContext } from '../context/SomethingWrongContext';

import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../assets/globalStyles';
import { FreeTimeImage } from '../assets/imgs/FreeTimeImage';

import { fetchDataSchedulesClients } from '../services/schedules/fetchDataSchedulesClients';

import { HeaderScreensMenu } from '../components/HeaderScreensMenu';
import { Day } from '../components/Day';
import { Menu } from '../components/Menu';
import { Loading } from '../components/Loading';

export const SchedulesClients = () => {
  const [dataFiltered, setDataFiltered] = useState(null);

  const { userData } = useContext(UserContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const schedulesMonthRef = firestore().collection('schedules_month')

  useEffect(() => {
    const unsubscribe = schedulesMonthRef.onSnapshot(async () => {
      userData && await fetchDataSchedulesClients(setDataFiltered, userData.name, setSomethingWrong);
    });
    
    return () => unsubscribe();

  }, [userData]);


  if (dataFiltered === null) return <Loading flexSize={1} />

  return (
    <>
      <ScrollView contentContainerStyle={[globalStyles.container, { flex: 1 }]}>
        <HeaderScreensMenu screenName={!dataFiltered?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

        {
          !dataFiltered.length && <FreeTimeImage width={400} height={"80%"} />
        }

        <View style={style.contentDays}>
          {
            !!dataFiltered.length &&
            dataFiltered.map((day, index) => {
              return <Day key={index} day={day.day} />;
            })
          }

        </View>
      </ScrollView>

      <Menu />
    </>
  );
};

const style = StyleSheet.create({
  contentDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 20,
  },
});
