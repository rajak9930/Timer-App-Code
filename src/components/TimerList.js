import React from 'react';
import { FlatList } from 'react-native';
import TimerItem from './TimerItem';

const TimerList = ({ timers, onStart, onPause, onReset }) => {
  return (
    <FlatList
      data={timers}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TimerItem
          timer={item}
          onStart={() => onStart(item.id)}
          onPause={() => onPause(item.id)}
          onReset={() => onReset(item.id)}
        />
      )}
    />
  );
};

export default TimerList;