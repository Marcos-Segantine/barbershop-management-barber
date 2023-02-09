import {Text, Pressable, StyleSheet} from 'react-native';

export const Button = ({text, action, waitingData = true}) => {
  return (
    <Pressable
      onPress={waitingData ? action : () => {}}
      style={waitingData ? style.button : style.buttonWaitingData}>
      <Text style={waitingData ? style.text : style.textWaitingData}>
        {text}
      </Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  buttonWaitingData: {
    backgroundColor: '#8B3200',
    width: '65%',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 13,
  },

  button: {
    backgroundColor: '#E95401',
    width: '65%',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 13,
  },

  textWaitingData: {
    color: '#A4A4A4',
  },

  text: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
