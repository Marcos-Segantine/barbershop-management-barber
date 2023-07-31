import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext, useEffect, useState } from "react"

import { ScheduleContext } from "../context/ScheduleContext"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { Professionals } from "../components/Professionals"
import { CalendarComponent } from "../components/CalendarComponent"
import { Schedules } from "../components/Schedules"

import { globalStyles } from "../assets/globalStyles"

export const AddSchedule = ({ navigation, route }) => {
  const [preferProfessional, setPreferProfessional] = useState(true)

  const preferProfessionalStyle__Yes = preferProfessional ? [styles.btn, { backgroundColor: globalStyles.orangeColor, borderColor: 'transparent' }] : styles.btn
  const preferProfessionalStyle__No = !preferProfessional ? [styles.btn, { backgroundColor: globalStyles.orangeColor, borderColor: 'transparent' }] : styles.btn

  const { headerText, scheduleToUpdate, isToUpdateSchedule } = route.params

  const { schedule, setSchedule } = useContext(ScheduleContext)

  useEffect(() => {
    setSchedule({ ...schedule, professional: null, schedule: null, day: null })

  }, [])

  const handleConfirm = () => {
    navigation.navigate("OurServices", { scheduleToUpdate, isToUpdateSchedule, })
  }

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { paddingBottom: "20%" }]}>
      <ComeBack text={headerText} />

      <Text style={styles.text}>Voce tem preferência por profissional?</Text>
      <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity style={preferProfessionalStyle__Yes} activeOpacity={.8} onPress={() => setPreferProfessional(true)}>
          <Text style={preferProfessional ? { fontWeight: globalStyles.fontFamilyBold, color: '#FFFFFF' } : { fontWeight: globalStyles.fontFamilyBold, color: '#000000' }}>Sim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={preferProfessionalStyle__No} activeOpacity={.8} onPress={() => setPreferProfessional(false)}>
          <Text style={!preferProfessional ? { fontWeight: globalStyles.fontFamilyBold, color: '#FFFFFF' } : { fontWeight: globalStyles.fontFamilyBold, color: '#000000' }}>Nao</Text>
        </TouchableOpacity>
      </View>

      {
        preferProfessional ?
          (
            <>
              <Professionals preferProfessional={preferProfessional} />
              <CalendarComponent />
              <Schedules preferProfessional={preferProfessional} />
            </>
          ) :
          (
            <>
              <Schedules preferProfessional={preferProfessional} />
              <CalendarComponent />
              <Professionals preferProfessional={preferProfessional} />
            </>
          )
      }

      <Button
        text={"Continuar"}
        action={handleConfirm}
        isToBlockButton={(!!schedule.professional && !!schedule.schedule && !!schedule.day) === false ? true : false}
        addStyles={{ marginTop: 30 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00000020",
    width: "35%",
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  text: {
    color: "#000000",
    fontWeight: globalStyles.fontFamilyBold,
    width: "100%",
    fontSize: globalStyles.fontSizeSmall,
    marginTop: 30,
    marginBottom: 10,
  },
})