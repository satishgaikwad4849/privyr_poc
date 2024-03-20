import React, { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

const MessageNotification = ({ message,show }) => {

  return (
    <View style={[styles.container, show ? styles.visible : styles.hidden]}>
    <Snackbar
      visible={show}
      duration={Snackbar.DURATION_SHORT} // Duration is set to short (3 seconds)
    >
      <Text style={styles.message}>{message}</Text>
    </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width:"80%",
      position: 'absolute',
      marginTop:140,
    //   backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
      borderRadius: 10,
      padding: 10,
      alignSelf: 'center',
      zIndex: 999, // Ensure it appears above other components
    },
    visible: {
      display: 'flex',
    },
    hidden: {
      display: 'none',
    },
    message: {
      color: 'white',
      fontSize: 16,
    },
  });
  
export default MessageNotification;
