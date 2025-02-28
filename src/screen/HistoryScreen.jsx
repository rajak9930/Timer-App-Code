import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { loadTimers } from '../utils/storage';

const HistoryScreen = () => {
  const [completedTimers, setCompletedTimers] = useState([]);

  useEffect(() => {
    const fetchCompletedTimers = async () => {
      const timers = await loadTimers();
      const completed = timers.filter(timer => timer.status === 'Completed');
      setCompletedTimers(completed);
    };

    fetchCompletedTimers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name} - Completed at {new Date(item.completionTime).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History of Completed Timers</Text>
      <FlatList
        data={completedTimers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default HistoryScreen;