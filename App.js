import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
  const [pushToken, setPushToken] = useState(null);

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
          throw new Error('Permission not granted');
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then(res => {
        setPushToken(res.data);
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      notification => {
        console.log(notification);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  });

  const pushNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'First notifications',
    //     body: 'Sent with expo'
    //   },
    //   trigger: {
    //     seconds: 5
    //   }
    // });

    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        to: pushToken,
        title: 'SUPERTEST',
        body: 'MEGATEST'
      })
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
