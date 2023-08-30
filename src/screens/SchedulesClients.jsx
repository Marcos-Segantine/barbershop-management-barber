import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

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
import { Button } from '../components/Button';

export const SchedulesClients = ({ navigation }) => {
  const [dataFiltered, setDataFiltered] = useState(null);

  const { userData } = useContext(UserContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const schedulesMonthRef = firestore().collection('schedules_month')

  useEffect(() => {
    const unsubscribe = schedulesMonthRef.onSnapshot(async () => {
      userData && await fetchDataSchedulesClients(setDataFiltered, userData.uid, setSomethingWrong);
    });

    return () => unsubscribe();

  }, [userData]);

  if (dataFiltered === null) return <Loading flexSize={1} />

  if (!dataFiltered?.length) return (
    <>
      <View style={[globalStyles.container, { flex: 1, justifyContent: "space-between" }]}>
        <HeaderScreensMenu screenName={!dataFiltered?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

        <FreeTimeImage width={"100%"} height={"60%"} />

        <Button
          text={"Agendar horário"}
          action={() => navigation.navigate("GetClient")}
        />
      </View>

      <Menu />
    </>
  )

  return (
    <>
      <FlatList
        contentContainerStyle={[globalStyles.container, { alignItems: "flex-start" }]}
        ListHeaderComponent={() => (
          <HeaderScreensMenu screenName={!dataFiltered?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />
        )}
        data={dataFiltered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Day day={item.day} />
        )}
        numColumns={2}
        columnWrapperStyle={style.contentDays}
      />

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
