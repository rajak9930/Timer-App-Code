import React, {useState} from 'react';
import {View, TextInput, Button, Modal, StyleSheet} from 'react-native';

const TimerModal = ({visible, onClose, onAddTimer}) => {
  const [timerName, setTimerName] = useState('');
  const [timerDuration, setTimerDuration] = useState('');
  const [timerCategory, setTimerCategory] = useState('');

  const handleAddTimer = () => {
    onAddTimer({
      name: timerName,
      duration: parseInt(timerDuration),
      category: timerCategory,
    });
    setTimerName('');
    setTimerDuration('');
    setTimerCategory('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          placeholder="Timer Name"
          value={timerName}
          onChangeText={setTimerName}
          style={styles.input}
        />
        <TextInput
          placeholder="Duration (seconds)"
          value={timerDuration}
          onChangeText={setTimerDuration}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={timerCategory}
          onChangeText={setTimerCategory}
          style={styles.input}
        />
        <Button title="Save Timer" onPress={handleAddTimer} />
        <Button title="Cancel" onPress={onClose}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    marginBottom: 15,
  },
});

export default TimerModal;
