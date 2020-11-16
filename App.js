import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true //show notification even when app is open
    };
  }
});

export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then(statusObj => {
        if (statusObj.status !== 'granted') {
          return;
        }
      });
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log(notification);
      }
    );

    return () => {
      subscription.remove();
    };
  });

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

// for ios permissions
// expo install expo-permissions
