import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, Pressable, ScrollView } from 'react-native';

import { UserContext } from '../context/UserContext';
import { SomethingWrongContext } from '../context/SomethingWrongContext';

import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../assets/globalStyles';
import { FreeTimeImage } from '../assets/imgs/FreeTimeImage';
import { FilterIcon } from '../assets/icons/FilterIcon';

import { fetchDataSchedulesClients } from '../services/schedules/fetchDataSchedulesClients';
import { filterSchedulesByDate } from '../services/schedules/filterSchedulesByDate';

import { HeaderScreensMenu } from '../components/HeaderScreensMenu';
import { Day } from '../components/Day';
import { Menu } from '../components/Menu';
import { Loading } from '../components/Loading';
import { Button } from '../components/Button';
import { Filter } from '../components/modals/Filter';

export const SchedulesClients = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [dataFiltered, setDataFiltered] = useState(null);
  const [dateToFilter, setDateToFilter] = useState([null, null]);
  const [showModalFilter, setShowModalFilter] = useState(false);

  const { userData } = useContext(UserContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const schedulesMonthRef = firestore().collection('schedules_month')

  useEffect(() => {
    const unsubscribe = schedulesMonthRef.onSnapshot(async () => {
      userData && await fetchDataSchedulesClients(setData, userData.uid, setSomethingWrong);
    });

    return () => unsubscribe();

  }, [userData]);

  useEffect(() => {
    if (dateToFilter[0] === null && dateToFilter[1] === null) return

    setDataFiltered(filterSchedulesByDate(data, dateToFilter))

  }, [data, dateToFilter])

  if (data === null) return <Loading flexSize={1} />

  if (!data?.length) return (
    <>
      <View style={[globalStyles.container, { flex: 1, justifyContent: "space-between" }]}>
        <HeaderScreensMenu screenName={!data?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

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
      <Filter
        visible={showModalFilter}
        showModalFilter={showModalFilter} 
        setShowModalFilter={setShowModalFilter} 
      />

      <FlatList
        contentContainerStyle={[globalStyles.container, { alignItems: "flex-start" }]}
        ListHeaderComponent={<Top data={data} showModalFilter={showModalFilter} setShowModalFilter={setShowModalFilter} />}
        data={dateToFilter[0] === null && dateToFilter[1] === null ? data : dataFiltered}
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

const Top = ({ data, setShowModalFilter, showModalFilter }) => {
  return (
    <View>
      <HeaderScreensMenu screenName={!data?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

      <View style={style.contentFilterInfo}>
        <View>
          <Text style={style.contentFilterText}>Ano:
            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}> 2023</Text>
          </Text>
          <Text style={style.contentFilterText}>Mês:
            <Text style={{ fontFamily: globalStyles.fontFamilyBold }}> Setembro</Text>
          </Text>
        </View>

        <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setShowModalFilter(!showModalFilter)}>
          <Text style={{ marginRight: 5, fontSize: globalStyles.fontSizeVerySmall }}>Aplicar Filtros</Text>
          <FilterIcon />
        </Pressable>
      </View>

    </View>
  )
}

const style = StyleSheet.create({
  contentDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10,
  },

  contentFilterInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "87%",
    marginBottom: 20
  },

  contentFilterText: {
    fontSize: globalStyles.fontSizeSmall,
    fontFamily: globalStyles.fontFamilyMedium,
    color: "#000000",
  }
});
