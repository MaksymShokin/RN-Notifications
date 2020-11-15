import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  const pushNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'First notifications',
        body: 'Sent with expo'
      },
      trigger: {
        seconds: 5
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title='Push notification' onPress={pushNotificationHandler} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

//expo install expo-notifications
