import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { IconButton, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import Api from '../../../lib/Api';

const LeadsAddStackScreen = ({ navigation }) => {
  const [leadName, setLeadName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const postLeads = async () => {
    try {
      let LeadData={
        recordID: uuid.v1(),
        givenName:leadName.split(' ')[0],
        familyName:leadName.split(' ')[1],
        phoneNumber:mobileNumber,
        whatsappNumber:whatsappNumber?? mobileNumber,
        emailId:email,
        notes:notes
      }

      const postLeadResult = await Api.postLeads(LeadData)

      console.log(postLeadResult,"posttt lead result")
      if(postLeadResult.status === "success"){
        navigation.navigate('Leads',{index:1});
      }
 
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", { leadName, mobileNumber, whatsappNumber, email, notes });
    postLeads();
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" color="#fff" onPress={handleGoBack} style={styles.backButton} />

      <Text style={styles.title}>Add Lead</Text>

      <TextInput
        label="Lead Name"
        value={leadName}
        onChangeText={text => setLeadName(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Mobile Number"
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Whatsapp Number"
        value={whatsappNumber}
        onChangeText={text => setWhatsappNumber(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Notes"
        value={notes}
        onChangeText={text => setNotes(text)}
        multiline
        style={[styles.input, styles.notesInput]}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton} labelStyle={styles.saveButtonText}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgb(54, 172, 170)',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  notesInput: {
    height: 100,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'rgb(54, 172, 170)',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
  },
});

export default LeadsAddStackScreen;
