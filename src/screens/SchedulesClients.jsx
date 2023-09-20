import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, Pressable } from 'react-native';

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

import { getMonthName } from '../utils/getMonthName';

export const SchedulesClients = ({ navigation }) => {
  const currentYear = String(new Date().getFullYear());
  const currentMonth = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1

  const [data, setData] = useState(null);
  const [dataFiltered, setDataFiltered] = useState(null);
  const [dateToFilter, setDateToFilter] = useState([currentYear, currentMonth]);
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

  const dataExpression = dateToFilter[0] === null && dateToFilter[1] === null ? data : dataFiltered

  if (data === null) return <Loading flexSize={1} />

  if (!data?.length) return (
    <>
      <View style={[globalStyles.container, { flex: 1, justifyContent: "space-between" }]}>
        <HeaderScreensMenu screenName={!data?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

        <FreeTimeImage width={"100%"} height={"60%"} />

        <Button
          text={"Agendar horário"}
          action={() => navigation.navigate("GetClient", { isToClearScheduleContext: true })}
        />
      </View>

      <Menu />
    </>
  )

  return (
    <>
      <Filter
        visible={showModalFilter}
        setShowModalFilter={setShowModalFilter}
        dateToFilter={dateToFilter}
        setDateToFilter={setDateToFilter}
      />

      <FlatList
        contentContainerStyle={[globalStyles.container, { alignItems: "flex-start" }]}
        ListHeaderComponent={<Top data={data} showModalFilter={showModalFilter} dateToFilter={dateToFilter} setShowModalFilter={setShowModalFilter} />}
        data={dataExpression}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Day day={item.day} />
        )}
        numColumns={2}
        columnWrapperStyle={style.contentDays}
      />

      {
        data !== null && (dataFiltered === null || dataFiltered?.length === 0) &&
        (
          <>
            <Text style={{ color: "#00000090", textAlign: "center", fontSize: globalStyles.fontSizeSmall }}>Não há agendamentos para esse mês e/ou ano.</Text>
            < FreeTimeImage width={"100%"} height={300} />
          </>
        )
      }

      <Menu />
    </>
  );
};

const Top = ({ data, dateToFilter, setShowModalFilter, showModalFilter }) => {
  return (
    <View>
      <HeaderScreensMenu screenName={!data?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

      <View style={style.contentFilterInfo}>
        <View>
          <Text style={{ color: "#00000070", fontSize: globalStyles.fontSizeVerySmall, marginBottom: 5 }}>Filtros atual</Text>
          <Text style={style.contentFilterText}>Ano:
            <Text style={{ fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }}> {dateToFilter[0] || "---"}</Text>
          </Text>
          <Text style={style.contentFilterText}>Mês:
            <Text style={{ fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }}> {dateToFilter && getMonthName(dateToFilter[1])}</Text>
          </Text>
        </View>

        <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setShowModalFilter(!showModalFilter)}>
          <Text style={{ color: "#000000", marginRight: 5, fontSize: globalStyles.fontSizeVerySmall }}>Aplicar Filtros</Text>
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
    width: "82%",
    marginBottom: 20
  },

  contentFilterText: {
    fontSize: globalStyles.fontSizeSmall,
    fontFamily: globalStyles.fontFamilyMedium,
    color: "#000000",
  }
});
