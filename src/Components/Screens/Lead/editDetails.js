// Import necessary modules

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const LeadsEditStackScreen = ({ navigation,route }) => {
  const [leadName, setLeadName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const handleGoBack = () => {
    navigation.goBack();
  };
useEffect(()=>{
  const{firstName,lastName,phoneNumber,email,notes}=route?.params.lead;
console.log(route?.params.lead,"edit params lead")
setLeadName(firstName+' '+lastName);
setMobileNumber(phoneNumber);
setWhatsappNumber(phoneNumber);
setEmail(email);
setNotes(notes);

},[route?.params.lead])
const handleSaveChanges = () => {
  // Implement logic to save changes
  console.log("Saving changes:", { leadName, mobileNumber, whatsappNumber, email, notes });
  const leadData={
    recordID: route?.params.lead.recordID,
    firstName:leadName.split(' ')[0],
    lastName:leadName.split(' ')[1],
    phoneNumber:mobileNumber,
    whatsappNumber:whatsappNumber?? mobileNumber,
    emailId:email,
    notes:notes
  }
  axios.put(`http://192.168.1.109:3001/api/leads/${leadData.recordID}`, { lead: leadData })
  .then((response) => {
    console.log(response.data,"edit api");
    if(response.data.status ==="success"){
      route?.params.onAddContact();
    }
    // Handle success
    navigation.navigate('Leads');
  })
  .catch((error) => {
    console.error('Error while editing contact:', error);
    // Handle error
  });
};
  return (
    <View style={styles.container}>
      {/* Add your screen content here */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.text}>Edit lead Information</Text>

      {/* lead Name Input */}
      <TextInput
        style={styles.input}
        placeholder="lead Name"
        value={leadName}
        onChangeText={(text) => setLeadName(text)}
      />

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />

      {/* Whatsapp Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Whatsapp Number"
        value={whatsappNumber}
        onChangeText={(text) => setWhatsappNumber(text)}
      />

      {/* Email Address Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Notes Input */}
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
        <Text style={{ color: '#fff' }}>Save Changes</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});


export default LeadsEditStackScreen;
