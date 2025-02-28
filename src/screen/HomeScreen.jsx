import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import TimerList from '../components/TimerList';
import TimerModal from '../components/TimerModal';
import {loadTimers, saveTimers} from '../utils/storage';

const HomeScreen = ({navigation}) => {
  const [timers, setTimers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTimers().then(setTimers);
  }, []);

  const addTimer = newTimer => {
    const timer = {
      id: Date.now().toString(),
      ...newTimer,
      remaining: newTimer.duration,
      status: 'Paused',
    };
    const updatedTimers = [...timers, timer];
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const startTimer = id => {
    const updatedTimers = timers.map(timer => {
      if (timer.id === id && timer.status === 'Paused') {
        timer.status = 'Running';
        timer.interval = setInterval(() => {
          setTimers(prevTimers => {
            const updated = prevTimers.map(t => {
              if (t.id === id) {
                t.remaining = t.remaining > 0 ? t.remaining - 1 : 0;
                if (t.remaining === 0) {
                  clearInterval(t.interval);
                  t.status = 'Completed';
                  t.completionTime = Date.now();
                  Alert.alert('Timer Completed', `${t.name} has completed!`);
                }
              }
              return t;
            });
            saveTimers(updated);
            return updated;
          });
        }, 1000);
      }
      return timer;
    });
    setTimers(updatedTimers);
  };

  const pauseTimer = id => {
    const updatedTimers = timers.map(timer => {
      if (timer.id === id && timer.status === 'Running') {
        clearInterval(timer.interval);
        timer.status = 'Paused';
      }
      return timer;
    });
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const resetTimer = id => {
    const updatedTimers = timers.map(timer => {
      if (timer.id === id) {
        clearInterval(timer.interval);
        timer.remaining = timer.duration;
        timer.status = 'Paused';
      }
      return timer;
    });
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  return (
    <View style={{flex: 1,padding:10}}>
      <Button title='Add Timer' onPress={() => setModalVisible(true)} />

      <TimerList
        timers={timers}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
      <TimerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTimer={addTimer}
      />
      <Button title="History" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
