import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TimerItem = ({ timer, onStart, onPause, onReset }) => {
  return (
    <View style={styles.timerContainer}>

      <Text style={styles.title}>{timer.name} - {timer.remaining}s - {timer.status}</Text>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
      <Button title="Start" onPress={onStart} />
      <Button title="Pause" onPress={onPause} />
      <Button title="Reset" onPress={onReset} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth:1,
    alignItems:'center',
    padding:10,
    borderRadius:5

  },
  title:{
    color:'black',
    fontSize:20,
    fontFamily:'300',
    marginBottom:10
  }
});

export default TimerItem;