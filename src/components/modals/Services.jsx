import {
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
  View,
} from 'react-native';

import { Title } from '../Title';
import { Button } from '../Button';
import { useContext, useEffect, useState } from 'react';

import { AddScheduleContext } from '../../context/ScheduleContext';

import { globalStyles } from '../../assets/globalStyles';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export const Services = ({ modalVisible, setModalVisible }) => {
  const { schedule, setSchedule } = useContext(AddScheduleContext);
  const [serviceUserSelected, setServiceUserSelected] = useState();
  const [services, setServices] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('services')
      .doc('services')
      .get()
      .then(({ _data }) => {
        setServices(_data);
      });
  }, []);

  const handleConfirmButton = () => {
    schedule.service && (navigation.navigate('ConfirmNewSchedule'), setModalVisible(false))
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={style.content}>
        <Title title="Selecione o serviço" />
        <ScrollView
          style={style.services}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {services
            ? services.services.map((service, index) => {
              return (
                <Pressable
                  style={
                    serviceUserSelected === service
                      ? style.serviceSelected
                      : style.service
                  }
                  key={index}
                  onPress={() => {
                    setSchedule({ ...schedule, service: `${service}` });
                    setServiceUserSelected(service);
                  }}>
                  <Text style={style.serviceText}>{service}</Text>
                </Pressable>
              );
            })
            : null}
        </ScrollView>
        <Button
          text="Confirmar"
          action={handleConfirmButton}
          waitingData={schedule ? !!schedule.service : false}
        />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  services: {
    flex: 1,
    width: '100%',
    maxHeight: 330,
    backgroundColor: '#1E1E1E',
    marginVertical: 50,
  },

  service: {
    marginVertical: 7,
    width: '80%',
    borderWidth: 3,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderColor: '#E95401',
    fontFamily: globalStyles.fontFamilyBold,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  serviceSelected: {
    backgroundColor: '#E95401',
    marginVertical: 7,
    width: '80%',
    borderWidth: 3,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderColor: '#E95401',
    fontFamily: globalStyles.fontFamilyBold,
    paddingVertical: 5,
    paddingHorizontal: 25,
    alignItems: 'center',
  },

  serviceText: {
    color: '#FFFFFF',
    fontSize: globalStyles.fontSizeMedium,
    fontFamily: globalStyles.fontFamilyBold,
  },
});
