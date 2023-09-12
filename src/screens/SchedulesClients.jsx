import { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, Pressable, ScrollView } from 'react-native';

import { UserContext } from '../context/UserContext';
import { SomethingWrongContext } from '../context/SomethingWrongContext';

import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../assets/globalStyles';
import { FreeTimeImage } from '../assets/imgs/FreeTimeImage';

import { fetchDataSchedulesClients } from '../services/schedules/fetchDataSchedulesClients';
import { filterSchedulesByDate } from '../services/schedules/filterSchedulesByDate';

import { HeaderScreensMenu } from '../components/HeaderScreensMenu';
import { Day } from '../components/Day';
import { Menu } from '../components/Menu';
import { Loading } from '../components/Loading';
import { Button } from '../components/Button';

export const SchedulesClients = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [dataFiltered, setDataFiltered] = useState(null);
  const [dateToFilter, setDateToFilter] = useState([null, null]);

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
      <FlatList
        contentContainerStyle={[globalStyles.container, { alignItems: "flex-start" }]}
        ListHeaderComponent={<Top data={data} dateToFilter={dateToFilter} setDateToFilter={setDateToFilter} />}
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

const Top = ({ data, setDateToFilter, dateToFilter }) => {
  return (
    <View>
      <HeaderScreensMenu screenName={!data?.length ? "No momento, sua agenda está vazia" : "Seus Agendamentos"} />

      <View style={{ height: 90 }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={dateToFilter[0] === "2023" ? [style.buttonFilter, { backgroundColor: globalStyles.orangeColor }] : style.buttonFilter}
            onPress={() => setDateToFilter(["2023", dateToFilter[1]])}
          >
            <Text style={dateToFilter[0] === "2023" ? [style.buttonFilterText, { color: "white" }] : style.buttonFilterText}>
              2023
            </Text>
          </Pressable>
          <Pressable
            style={dateToFilter[0] === "2024" ? [style.buttonFilter, { backgroundColor: globalStyles.orangeColor }] : style.buttonFilter}
            onPress={() => setDateToFilter(["2024", dateToFilter[1]])}
          >
            <Text style={dateToFilter[0] === "2024" ? [style.buttonFilterText, { color: "white" }] : style.buttonFilterText}>
              2024
            </Text>
          </Pressable>
        </ScrollView>

        <ScrollView
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            style={dateToFilter[1] === "09" ? [style.buttonFilter, { backgroundColor: globalStyles.orangeColor }] : style.buttonFilter}
            onPress={() => setDateToFilter([dateToFilter[0], "09"])}
          >
            <Text style={dateToFilter[1] === "09" ? [style.buttonFilterText, { color: "white" }] : style.buttonFilterText}>
              Set
            </Text>
          </Pressable>
          <Pressable
            style={dateToFilter[1] === "10" ? [style.buttonFilter, { backgroundColor: globalStyles.orangeColor }] : style.buttonFilter}
            onPress={() => setDateToFilter([dateToFilter[0], "10"])}
          >
            <Text style={dateToFilter[1] === "10" ? [style.buttonFilterText, { color: "white" }] : style.buttonFilterText}>
              Out
            </Text>
          </Pressable>
          <Pressable
            style={dateToFilter[1] === "11" ? [style.buttonFilter, { backgroundColor: globalStyles.orangeColor }] : style.buttonFilter}
            onPress={() => setDateToFilter([dateToFilter[0], "11"])}
          >
            <Text style={dateToFilter[1] === "11" ? [style.buttonFilterText, { color: "white" }] : style.buttonFilterText}>
              Nov
            </Text>
          </Pressable>
          <Pressable
            style={dateToFilter[1] === "12" ? [style.buttonFilter, { backgroundColor: globalStyles.orangeColor }] : style.buttonFilter}
            onPress={() => setDateToFilter([dateToFilter[0], "12"])}
          >
            <Text style={dateToFilter[1] === "12" ? [style.buttonFilterText, { color: "white" }] : style.buttonFilterText}>
              Dez
            </Text>
          </Pressable>
        </ScrollView>
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

  buttonFilter: {
    width: 75,
    height: 30,
    marginHorizontal: 4,
    borderColor: globalStyles.orangeColor,
    borderWidth: 1,
    borderRadius: 150,
    justifyContent: "center"
  },

  buttonFilterText: {
    color: globalStyles.orangeColor,
    fontSize: globalStyles.fontSizeSmall,
    fontFamily: globalStyles.fontFamilyBold,
    textAlign: 'center'
  }
});
