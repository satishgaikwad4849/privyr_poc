// LeadsComponent.js
import React, { useState, useEffect } from 'react';
import { Searchbar, Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';

import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';
import ContactItem from '../../../commonComponent/contactItem';
import Api from '../../../lib/Api';
import uuid from 'react-native-uuid';
import MessageNotification from '../../../commonComponent/notificationMessage';

const LeadsComponent = ({ route }) => {
  const tabs = ['Contacts', 'Leads', 'Clients', 'Lost'];
  const [index, setIndex] = React.useState(0);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [nameOfMessage, setNameOfMessage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    console.log(route?.params?.index, "indexxxxx client==========>", index)
    if (route?.params?.index && route?.params?.index == 1) {
      setTimeout(() => {
        loadLeads();
      }, 500)
    }
    if (route?.params?.index && route?.params?.index == 2) {
      // loadLeads();
      setTimeout(() => {
        loadClients();
      }, 500)

    }
  }, [route?.params])

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showMessage]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const postLeads = async (newLead) => {
    try {
      let leadData = {
        recordID: uuid.v1(),
        givenName: newLead.givenName,
        familyName: newLead.familyName,
        phoneNumber: newLead?.phoneNumbers[0]?.number || "",
        whatsappNumber: newLead?.phoneNumbers[0]?.number || "",
        emailId: "",
        notes: ""
      }
      const postLeadResult = await Api.postLeads(leadData)
      if (postLeadResult.status === "success") {
        loadLeads();
        setShowMessage(true);
        setNameOfMessage("Contact is added as a Lead")
        setIndex(1);
      }
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };




  const loadLeads = async () => {
    try {
      const response = await Api.getLeads();
      const leadsData = response.leads || [];

      if (response.status === "success") {
        setSelectedContacts(leadsData);
      }
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };

  const loadClients = async () => {
    try {
      const response = await Api.getClients();
      const clientsData = response.clients || [];

      if (response.status === "success") {
        setSelectedClients(clientsData);

      }
    } catch (error) {
      console.error('Error while getting clients:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await Api.getContacts();
      const contacts = response.contacts || [];
      contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
      setContacts(contacts.slice(0, 100));
    } catch (error) {
      console.error('Error while fetching contacts:', error);
    }
  };

  const postContacts = async (newContacts) => {
    try {
      const postContactResult = await Api.postContacts(newContacts)
      if (postContactResult.status === "success") {
        loadLeads();
        // setShowMessage(true);
        // setNameOfMessage("Contact list is added")
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
        await postContacts(contacts.slice(0, 100));
        loadLeads();
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
  const editLead = (item) => {
    navigation.navigate('StackLeadEdit', { lead: item, onAction: loadLeads });
  }

  const editClient = (item) => {
    navigation.navigate('StackLeadEdit', { client: item, onAction: loadClients });
  }

  const deleteLead = async (item) => {
    try {
      const deleteLeadsResult = await Api.deleteLeads(item.recordID);
      if (deleteLeadsResult.status === "success") {
        loadLeads();
        setShowMessage(true);
        setNameOfMessage("Lead is Deleted Successfully")
      }
    } catch (error) {
      console.error('Error while deleting contact:', error);
    };
  }

  const deleteClient = async (item) => {
    try {
      const deleteClientsResult = await Api.deleteClients(item.recordID);
      if (deleteClientsResult.status === "success") {
        setShowMessage(true);
        setNameOfMessage("Client is Deleted Successfully")
        loadClients();
      }
    } catch (error) {
      console.error('Error while deleting client:', error);
    };
  }



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

  const searchLeads = async (searchText) => {
    try {
      const response = await Api.searchLeads(searchText);

      if (response.status === "success") {
        setSelectedContacts(response.leads);
        return response.leads; // Return the filtered leads array
      } else {
        console.error("Failed to search leads:", response.error);
        return []; // Return an empty array in case of failure
      }
    } catch (error) {
      console.error("Error searching leads:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const searchClients = async (searchText) => {
    try {
      const response = await Api.searchClients(searchText);
      if (response.status === "success") {
        setSelectedClients(response.clients);
        return response.clients; // Return the filtered clients array
      } else {
        console.error("Failed to search clients:", response.error);
        return []; // Return an empty array in case of failure
      }
    } catch (error) {
      console.error("Error searching clients:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const handleSearch = (text) => {
    if (index === 1) {
      searchLeads(text);
    } else if (index === 2) {
      searchClients(text);
    } else {
      search(text);
    }
  };
  const openContact = (contact) => {
    // Contacts.openExistingContact(contact);
  };

  const handleModalButtonPress = () => {
    navigation.navigate('StackLeadAdd');
    hideModal();
    setIndex(1);

  };

  const handleModalButtonPressForClient = () => {
    navigation.navigate('StackClientAdd');
    hideModal();
    setIndex(2);

  };

  const renderContent = () => {
    switch (index) {
      case 0:
        return (
          <View>
            <FlatList
              data={contacts}
              renderItem={(contact) => (
                <ContactItem
                  key={contact.item.recordID}
                  item={contact.item}
                  onPress={openContact}
                  onAddAction={postLeads}
                  onAction={loadLeads}
                  actionType={'addContact'}
                  listType={'Contacts'}
                />
              )}
              keyExtractor={(item) => item.recordID}

            />
          </View>
        );
      case 1:
        return (
          <FlatList
            data={selectedContacts}
            renderItem={({ item }) => (
              <ContactItem
                key={item.recordID}
                item={item}
                onPress={openContact}
                onAction={loadLeads}
                listType={'Leads'}
                editAction={editLead}
                deleteAction={deleteLead}
              // isLead={true}
              />
            )}
            keyExtractor={(item) => item.recordID}
          />
        );
      case 2:
        return (
          <FlatList
            data={selectedClients}
            renderItem={({ item }) => (
              <ContactItem
                key={item.recordID}
                item={item}
                onPress={openContact}
                // getItem={loadClients}
                onAction={loadClients}
                editAction={editClient}
                deleteAction={deleteClient}
                listType={'Clients'}
              />
            )}
            keyExtractor={(item) => item.recordID}
          />
        );
      case 3:
        return (
          <View>
            <Text>This is the Groups tab</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>

      <Searchbar placeholder="Search" onChangeText={handleSearch}
        onSubmitEditing={({ nativeEvent }) => handleSearch(nativeEvent.text)} />

      <MaterialTabs
        items={tabs}
        selectedIndex={index}
        onChange={setIndex}
      />
      {renderContent()}

      {showMessage && <MessageNotification message={nameOfMessage} show={showMessage} />}

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

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
          <Button
            mode="contained"
            onPress={handleModalButtonPressForClient}
            style={styles.modalButton}
          >
            Enter a New Client
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
