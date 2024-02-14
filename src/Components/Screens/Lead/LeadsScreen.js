// LeadsComponent.js
import React, { useState, useEffect } from 'react';
import { Searchbar,Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';
import ContactListItem from './contact';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Contacts from 'react-native-contacts';
import { NavigationContainer,useNavigation } from '@react-navigation/native';


const LeadsComponent = ({route}) => {
  const tabs = ['Contacts', 'Leads', 'Clients', 'Lost'];
  const [index, setIndex] = React.useState(0);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [visible, setVisible] = React.useState(false);

  useEffect(()=>{
    if(route?.params?.refresh){
      addContact();
    }
  },[route?.params?.refresh])
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const addContact = async () => {
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/leads');
      const data = response.data || [];
      console.log(data, "Leads data res",data.status === "success");
  
      if (data.status === "success") {
        console.log('Leads success called');
        setSelectedContacts(data.leads);
      }
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };
  const loadContacts = async () => {
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/contacts');
      console.log('Raw response:', response.data);
      const contacts = response.data.contacts || [];
      contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
      setContacts(contacts.slice(0, 100));
    } catch (error) {
      console.error('Error while fetching contacts:', error);
    }
  };

  const postContacts = async (newContacts) => {
    try {
      const response = await axios.post('http://192.168.1.109:3001/api/contacts', {
        contacts: newContacts,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data, 'contacts data req',response.data.status);
      if(response?.data.status == "success"){
        console.log("success called")
        addContact(); 
      }
     
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };
  const fetchData = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          },
        );
        const contacts = await Contacts.getAll();
        contacts.sort((a, b) => {
          const nameA = a.givenName.toLowerCase();
          const nameB = b.givenName.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setContacts(contacts.slice(0, 100));
        await postContacts(contacts.slice(0, 100)); // Initial post with fetched contacts
          addContact();
      } catch (error) {
        console.error('Error while fetching contacts:', error);
      }
    } else {
      try {
        const contacts = await Contacts.getAll();
        contacts.sort((a, b) => {
          const nameA = a.givenName.toLowerCase();
          const nameB = b.givenName.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setContacts(contacts.slice(0, 100));
        await postContacts(contacts.slice(0, 100)); // Initial post with fetched contacts
      } catch (error) {
        console.error('Error while fetching contacts:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const search = async (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    try {
      if (text === '' || text === null) {
        await loadContacts();
      } else if (phoneNumberRegex.test(text)) {
        const contacts = await Contacts.getContactsByPhoneNumber(text);
        contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
        setContacts(contacts);
      } else {
        const contacts = await Contacts.getContactsMatchingString(text);
        contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
        setContacts(contacts);
      }
    } catch (error) {
      console.error('Error while searching contacts:', error);
    }
  };

  const openContact = (contact) => {
    // Contacts.openExistingContact(contact);
  };

  const navigation = useNavigation();
  const handleModalButtonPress = () => {
    navigation.navigate('StackLeadAdd');
    hideModal();
    console.log('Modal button pressed');

  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {/* Search Input */}
      <Searchbar placeholder="Search" onChangeText={search} />

      {/* Tabs */}
      <MaterialTabs
        items={tabs}
        selectedIndex={index}
        onChange={setIndex}
      />
      {/* Content for each tab */}
      {index === 0 && (
        <View>
          <FlatList
            data={contacts}
            renderItem={(contact) => (
              <ContactListItem
                key={contact.item.recordID}
                item={contact.item}
                onPress={openContact}
                onAddContact={addContact}
              />
            )}
            keyExtractor={(item) => item.recordID}
          />
        </View>
      )}
      {index === 1 && (
        <View>
          <FlatList
            data={selectedContacts}
            renderItem={(contact) => (
              <ContactListItem
                key={contact.item.recordID}
                item={contact.item}
                onPress={openContact}
                onAddContact={addContact}
                isLead={true}
              />
            )}
            keyExtractor={(item) => item.recordID}
          />
        </View>
      )}
      {index === 2 && (
        <View>
          <Text>This is the Team tab</Text>
        </View>
      )}
      {index === 3 && (
        <View>
          <Text>This is the Groups tab</Text>
        </View>
      )}
      {/* {renderPlusIcon()} */}
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    {/* Add your content for the modal, e.g., buttons */}
    <Button
      mode="contained"
      onPress={handleModalButtonPress}
      style={styles.modalButton}
    >
      Quick Add & Send Message
    </Button>
    <Button
      mode="contained"
      onPress={handleModalButtonPress}
      style={styles.modalButton}
    >
      Enter a New Lead
    </Button>
    {/* Close Button */}
    <Button
      mode="contained"
      onPress={hideModal}
      style={styles.modalButton}
    >
      Close
    </Button>
        </Modal>
      </Portal>
      <TouchableOpacity
      style={styles.plusIcon}
      onPress={showModal}
    >
      <Text style={styles.plusText}>+</Text>
    </TouchableOpacity>
    </View>
  );
};

export default LeadsComponent;

const styles = StyleSheet.create({
  plusIcon: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust the width as needed
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black', // Text color
  },
  modalButton: {
    marginTop: 10,
    width: '100%', // Adjust the width as needed
  },
});
