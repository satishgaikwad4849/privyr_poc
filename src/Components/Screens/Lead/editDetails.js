import { IconButton, TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Api from '../../../lib/Api';

const LeadsEditStackScreen = ({ navigation, route }) => {
  const [leadName, setLeadName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [recordId, setRecordId] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const { givenName, familyName, phoneNumber, email, notes, recordID } = route?.params.lead || route.params.client;
    setRecordId(recordID);
    setLeadName(givenName + ' ' + familyName);
    setMobileNumber(phoneNumber);
    setWhatsappNumber(phoneNumber);
    setEmail(email);
    setNotes(notes);
  }, [route?.params]);

  const handleSaveChanges = async () => {
    console.log("Saving changes:", { leadName, mobileNumber, whatsappNumber, email, notes, recordId });
    const data = {
      recordID: recordId,
      givenName: leadName.split(' ')[0],
      familyName: leadName.split(' ')[1],
      phoneNumber: mobileNumber,
      whatsappNumber: whatsappNumber ?? mobileNumber,
      emailId: email,
      notes: notes
    }
    try {
      if (route.params.lead) {
        const editLeadsResult = await Api.editLeads(data.recordID, data);
        if (editLeadsResult.status === "success") {
          route?.params.onAction();
          navigation.navigate('Leads');
        }
      } else if (route.params.client) {
        const editClientsResult = await Api.editClients(data.recordID, data);
        if (editClientsResult.status === "success") {
          route?.params.onAction();
          navigation.navigate('Leads');
        }
      }
    } catch (error) {
      console.error('Error while editing lead:', error);
    }
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" color="#007bff" onPress={handleGoBack} style={styles.backButton} />

      <Text style={styles.text}>Edit Lead Information</Text>

      <TextInput
        label="Lead Name"
        value={leadName}
        onChangeText={(text) => setLeadName(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Whatsapp Number"
        value={whatsappNumber}
        onChangeText={(text) => setWhatsappNumber(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <TextInput
        label="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
        style={[styles.input, styles.notesInput]}
        theme={{ colors: { primary: '#007bff' } }}
      />

      <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton} labelStyle={styles.saveButtonText}>
        Save Changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgb(54, 172, 170)',
  },
  input: {
    width: '80%',
    marginBottom: 20,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'rgb(54, 172, 170)',
    width: '80%',
  },
  saveButtonText: {
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default LeadsEditStackScreen;
