import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FollowUpsComponent = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.overdue]}>
        <Icon name="clock" size={20} color="#333" style={styles.icon} />
        <Text style={[styles.buttonText, styles.textStart]}>OVERDUE</Text>
        <Icon name="angle-right" size={20} color="#333" style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.upcoming]}>
        <Icon name="calendar-alt" size={20} color="#333" style={styles.icon} />
        <Text style={[styles.buttonText, styles.textStart]}>UPCOMING</Text>
        <Icon name="angle-right" size={20} color="#333" style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.someday]}>
        <Icon name="calendar-day" size={20} color="#333" style={styles.icon} />
        <Text style={[styles.buttonText, styles.textStart]}>SOMEDAY</Text>
        <Icon name="angle-right" size={20} color="#333" style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.today]}>
        <Icon name="calendar-check" size={20} color="#333" style={styles.icon} />
        <Text style={[styles.buttonText, styles.textStart]}>TODAY</Text>
        <Icon name="angle-right" size={20} color="#333" style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  textStart: {
    textAlign: 'left', // Align text to start
    flexGrow: 1, // Allow text to expand to fill available space
  },
  icon: {
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  overdue: {
    borderTopWidth: 0, // Remove top border for the first button
  },
  upcoming: {
    borderTopWidth: 1,
  },
  someday: {
    borderTopWidth: 1,
  },
  today: {
    borderTopWidth: 1,
  },
});

export default FollowUpsComponent;
