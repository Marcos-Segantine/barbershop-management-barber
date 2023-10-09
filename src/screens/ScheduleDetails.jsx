import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/UserContext';
import { SomethingWrongContext } from '../context/SomethingWrongContext';
import { ScheduleContext } from '../context/ScheduleContext';

import { Button } from '../components/Button';
import { ComeBack } from '../components/ComeBack';
import { Loading } from '../components/Loading';
import { DefaultModal } from '../components/modals/DefaultModal';

import { getScheduleByDateAndHour } from '../services/schedules/getScheduleByDateAndHour';
import { cancelSchedule } from '../services/schedules/cancelSchedule';

import { globalStyles } from '../assets/globalStyles';
import { FreeTimeImage } from '../assets/imgs/FreeTimeImage';
import DefaultPicture from "../assets/icons/DefaultPicture.png"
import { CancelSchedule } from '../assets/imgs/CancelSchedule';

import { getNameLastName } from '../utils/getNameLastName';

export const ScheduleDetails = ({ route, navigation }) => {
  const [data, setData] = useState(null)
  const [confirmCancelScheduleVisible, setConfirmCancelSchedule] = useState(false)

  const { userData } = useContext(UserContext)
  const { schedule, setSchedule } = useContext(ScheduleContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const { hour, isScheduleFree, date } = route.params;

  useEffect(() => {
    (async () => {

      setData(
        await getScheduleByDateAndHour(isScheduleFree, userData.uid, hour, date, setSomethingWrong)
      );

    })();

  }, []);

  const handleCancelSchedule = () => {
    setConfirmCancelSchedule({
      image: <CancelSchedule />,
      mainMessage: "Tem certeza disso?",
      message: "Essa ação é irreversível, depois de feita não é possível voltar atrás",
      firstButtonText: "Estou ciente disso",
      firstButtonAction: () => {
        cancelSchedule(data.clientUid, data, setSomethingWrong);
        navigation.navigate("SchedulesClients")
      },
      secondButtonText: "Cancelar",
      secondButtonAction: () => setConfirmCancelSchedule(null)
    })
  }

  const handleNewSchedule = () => {
    navigation.navigate('GetClient', { isToClearScheduleContext: false })
    setSchedule({ ...schedule, day: date, professionalUid: userData.uid, professional: userData.name, schedule: hour })
  }

  if (data === null) return <Loading flexSize={1} />

  if (isScheduleFree === true && data === undefined) {
    return (
      <View style={[globalStyles.container, { flex: 1, justifyContent: "space-around" }]}>
        <ComeBack text={"Horário Livre"} />
        <FreeTimeImage height={"70%"} width={"100%"} />

        <Button
          text={'Agendar Cliente'}
          action={handleNewSchedule}
        />
      </View>
    )
  }

  if (data) {
    return (
      <ScrollView
        contentContainerStyle={globalStyles.container}
        overScrollMode="never"
        bounces={false}
      >
        <ComeBack text={hour} />
        <DefaultModal
          modalContent={confirmCancelScheduleVisible}
        />

        <View style={styles.content}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View>
              {
                data.profilePicture ?
                  <Image
                    src={data.profilePicture}
                    style={{ borderRadius: 200, width: 200, height: 200, alignSelf: "center" }}
                  /> :
                  <Image source={DefaultPicture} style={{ width: 200, height: 200, alignSelf: "center" }} />
              }

            </View>

            <Text style={styles.clientName}>{data && getNameLastName(data.name)}</Text>

            <View style={{ alignItems: 'flex-start', marginTop: 25, width: "100%" }}>
              <Text style={styles.description}>Email: <Text style={styles.info}>{data && data.email}</Text></Text>
              <Text style={styles.description}>Celular: <Text style={styles.info}>{data && data.phone}</Text></Text>
              <Text style={styles.description}>
                Serviço(s):
              </Text>
              <View style={styles.contentButtons}>
                {
                  data.services && data.services.map((service, index) => {
                    return (
                      <View key={index} style={styles.serviceContentList}>
                        <View style={{ width: 8, height: 8, borderRadius: 150, backgroundColor: "black", marginRight: 10 }}></View>
                        <Text style={[styles.info, { marginVertical: 0 }]}>{service.name}</Text>
                      </View>

                    )
                  })
                }
              </View>
            </View>
          </View>

          <Button
            text={'Cancelar Agendamento'}
            action={handleCancelSchedule}
          />
        </View>

      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: 50,
    marginBottom: 25,
    alignItems: 'center',
    flexDirection: "column",
    justifyContent: "space-between",
  },

  input: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 17,
    borderWidth: 3,
    borderColor: '#E95401',
    marginVertical: 5,
    borderRadius: 20,
  },

  clientName: {
    color: "#000000",
    fontSize: globalStyles.fontSizeMedium,
    fontFamily: globalStyles.fontFamilyBold,
    maxWidth: "100%",
    textAlign: 'center',
    marginTop: 20,
  },

  description: {
    color: "#000000",
    fontSize: globalStyles.fontSizeSmall,
    marginVertical: 8,
    fontFamily: globalStyles.fontFamilyBold,
    maxWidth: "80%",
  },

  info: {
    color: "#000000",
    fontSize: globalStyles.fontSizeSmall,
    marginVertical: 15,
    maxWidth: "100%",
    fontFamily: globalStyles.fontFamilyMedium,
  },

  serviceContentList: {
    fontSize: globalStyles.fontSizeSmall,
    marginVertical: 5,
    marginLeft: 15,
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "center",
  },

  contentButtons: {
    marginTop: 5,
    marginBottom: 20,
  }
});
