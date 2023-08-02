import { StyleSheet, View, Text, Image } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/UserContext';
import { SomethingWrongContext } from '../context/SomethingWrongContext';

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

import { formatPhoneNumber } from '../utils/formatPhoneNumber';

export const ScheduleDetails = ({ route, navigation }) => {
  const [data, setData] = useState(null)
  const [confirmCancelScheduleVisible, setConfirmCancelSchedule] = useState(false)

  const { userData } = useContext(UserContext)
  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const { hour, isScheduleFree, date } = route.params;

  useEffect(() => {
    (async () => {

      setData(
        await getScheduleByDateAndHour(isScheduleFree, userData.name, hour, date, setSomethingWrong)
      );

    })();

  }, []);

  const handleCancelSchedule = () => {
    setConfirmCancelSchedule({
      image: <CancelSchedule />,
      mainMessage: "Tem certeza disso?",
      message: "Essa ação é IRREVERSÍVEL, depois de feita não é possível voltar atrás",
      firstButtonText: "Estou ciente disso",
      firstButtonAction: () => {
        cancelSchedule(data.clientUid, data, setSomethingWrong);
        navigation.navigate("SchedulesClients")
      },
      secondButtonText: "Cancelar",
      secondButtonAction: () => setConfirmCancelSchedule(null)
    })
  }

  const services = data && data.services.map((service, index) => {
    if (index === data.services.length - 1) return service.name
    return ',' + service.name
  }).join('')

  if (data === null) return <Loading flexSize={1} />

  return (
    <View style={globalStyles.container}>
      <ComeBack text={!isScheduleFree ? `${hour}` : "Horário Livre"} />
      {
        data &&
        (
          <DefaultModal
            modalContent={confirmCancelScheduleVisible}
          />
        )
      }

      {
        !isScheduleFree && data ?
          (
            <>
              <View style={styles.content}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View>
                    {
                      data?.profilePicture ?
                        <Image
                          src={data.profilePicture}
                          style={{ borderRadius: 200, width: 200, height: 200, alignSelf: "center" }}
                        /> :
                        <Image source={DefaultPicture} style={{ width: 200, height: 200, alignSelf: "center" }} />
                    }

                  </View>

                  <Text style={styles.clientName}>{data && data.name}</Text>

                  <View style={{ alignItems: 'flex-start', marginTop: 25 }}>
                    <Text style={styles.description}>Email: <Text style={styles.info}>{data && data.email}</Text></Text>
                    <Text style={styles.description}>Celular: <Text style={styles.info}>{data && formatPhoneNumber(data.phone, setSomethingWrong)}</Text></Text>
                    <Text style={styles.description}>Serviço(s): <Text style={styles.info}>{services}</Text></Text>
                  </View>
                </View>

                <Button
                  text={'Cancelar agendamento'}
                  action={handleCancelSchedule}
                />
              </View>

            </>
          ) : (
            <View style={styles.content}>
              <FreeTimeImage height={"70%"} width={400} />

              <Button
                text={'Agendar cliente'}
                action={() => navigation.navigate('GetClient')}
              />
            </View>
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: "80%",
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
    fontFamily: globalStyles.fontFamilyBold,
  }
});
