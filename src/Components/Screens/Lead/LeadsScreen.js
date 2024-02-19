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
import ContactItem from '../../../commonComponent/contactItem';
import Api from '../Client/clientApi';
import uuid from 'react-native-uuid';

const LeadsComponent = ({route}) => {
  const tabs = ['Contacts', 'Leads', 'Clients', 'Lost'];
  const [index, setIndex] = React.useState(0);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [visible, setVisible] = React.useState(false);


  useEffect(()=>{
    console.log(route?.params?.index,"indexxxxx client==========>")
    if(route?.params?.index==1){
      setTimeout(()=>{
        loadLeads();
      },500)
    }
    if(route?.params?.index==2){
      // loadLeads();
      setTimeout(()=>{
        loadClients();
      },500)
      
    }
  },[route?.params])
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const postLeads = async (newLead) => {
    try {
      console.log('Posting lead:', newLead);
      let leadData={
        recordID: uuid.v1(),
        givenName:newLead.givenName,
        familyName:newLead.familyName,
        phoneNumber:newLead?.phoneNumbers[0]?.number||"",
        whatsappNumber:newLead?.phoneNumbers[0]?.number||"",
        emailId:"",
        notes:""
      }
      const response = await axios.post('http://192.168.1.109:3001/api/leads', {
        leads: [leadData],
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
      if(data.status === "success"){
        loadLeads();
        console.log(data, 'Leads data res from contact');
      }
 
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };
  
  


  const loadLeads = async () => {
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/leads');
      const data = response.data || [];
      console.log(data, "Leads data res",data.status === "success");
  
      if (data.status === "success") {
        setSelectedContacts(data.leads);
        console.log('Leads success called');
        // loadClients();
        // if(route?.params?.index===1){
        //   setIndex(1);
          
        // }
      
      }
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };

  const loadClients = async () => {
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/clients');
      const data = response.data || [];
      console.log(data, "clients data res",data.status === "success");
  
      if (data.status === "success") {
        console.log('clients success called');
        setSelectedClients(data.clients);
        // if(route?.params?.index===2){
        //   setIndex(2);
          
        // }
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
        loadLeads(); 
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
  const editLead=(item)=>{
    console.log("Edit lead:", item);
    navigation.navigate('StackLeadEdit', { lead: item, onAction: loadLeads});
  }

  const editClient = (item)=>{
    console.log("Edit contact:", item);
    navigation.navigate('StackLeadEdit', { client: item,onAction:loadClients});
  }
 const deleteLead=(item)=>{
  axios.delete(`http://192.168.1.109:3001/api/leads/${item.recordID}`)
  .then((response) => {
    if(response.data.status === "success"){
    console.log(response.data,"delete lead");
    loadLeads();
    }
    // Handle success
  })
  .catch((error) => {
    console.error('Error while deleting contact:', error);
    // Handle error
  });
  }
  const deleteClient = (item)=>{
    axios.delete(`http://192.168.1.109:3001/api/clients/${item.recordID}`)
    .then((response) => {
      if(response.data.status === "success"){
      console.log(response.data,"delete client");
      loadClients();
      }
      // Handle success
    })
    .catch((error) => {
      console.error('Error while deleting contact:', error);
      // Handle error
    });
  }
  useEffect(() => {
    fetchData()
    // if(index===2){
      // loadClients();
      // loadLeads();
    // }
  }, []);
  // useEffect(() => {
  //   if(index===1){
  //     loadLeads();
  //   }
  //   if(index===2){
  //     loadClients();
  //   }
    
  // }, [index]);
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
      const response = await axios.get(`http://192.168.1.109:3001/api/search/leads?search=${searchText}`);
     
      if (response.data.status === "success") {
        console.log("Filtered leads:", response.data.leads);
        setSelectedContacts(response.data.leads);
        return response.data.leads; // Return the filtered leads array
      } else {
        console.error("Failed to search leads:", data.error);
        return []; // Return an empty array in case of failure
      }
    } catch (error) {
      console.error("Error searching leads:", error);
      return []; // Return an empty array in case of an error
    }
  };
  
  const searchClients = async (searchText) => {
    try {
      const response = await axios.get(`http://192.168.1.109:3001/api/search/clients?search=${searchText}`);
      if (response.data.status === "success") {
        console.log("Filtered clients:", response.data.clients);
        setSelectedClients(response.data.clients);
        return response.data.clients; // Return the filtered clients array
      } else {
        console.error("Failed to search clients:", data.error);
        return []; // Return an empty array in case of failure
      }
    } catch (error) {
      console.error("Error searching clients:", error);
      return []; // Return an empty array in case of an error
    }
  };
  
  // Usage example
  const searchText = "John"; // Example search text
  // searchLeads(searchText)
  //   .then((leads) => {
  //     // Process the filtered leads array
  //   })
  //   .catch((error) => {
  //     console.error("Error searching leads:", error);
  //   });
  
  // // Usage example
  // const searchText2 = "Doe"; // Example search text
  // searchClients(searchText)
  //   .then((clients) => {
  //     // Process the filtered clients array
  //   })
  //   .catch((error) => {
  //     console.error("Error searching clients:", error);
  //   });
  
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

  const navigation = useNavigation();
  const handleModalButtonPress = () => {
    navigation.navigate('StackLeadAdd');
    hideModal();
    console.log('Modal button pressed');
    setIndex(1);

  };

  const handleModalButtonPressForClient = () => {
    navigation.navigate('StackClientAdd');
    hideModal();
    console.log('Modal button modal pressed');
    setIndex(2);

  };

  const renderContent = () => {
    switch (index) {
      case 0:
        return (
          <View>
          <FlatList
            // data={contacts}
            // renderItem={(contact) => (
            //   <ContactListItem
            //     key={contact.item.recordID}
            //     item={contact.item}
            //     onPress={openContact}
            //     onloadLeads={loadLeads}
            //   />
            // )}
            // keyExtractor={(item) => item.recordID}
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
            // data={selectedContacts}
            // renderItem={({ item }) => (
            //   <ContactListItem
            //     key={item.recordID}
            //     item={item}
            //     onPress={openContact}
            //     onloadLeads={loadLeads}
            //     isLead={true}
            //   />
            // )}
            // keyExtractor={(item) => item.recordID}
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
      {/* Search Input */}
      <Searchbar placeholder="Search" onChangeText={handleSearch} 
      onSubmitEditing={({ nativeEvent }) => handleSearch(nativeEvent.text)}/>
      {console.log(route?.params?.index,"indexxxxx client==========>")}
      {/* Tabs */}
      <MaterialTabs
        items={tabs}
        selectedIndex={index}
        onChange={setIndex}
      />
      {renderContent()}
      {/* Content for each tab */}
      {/* {index === 0 && (
        <View>
          <FlatList
            data={contacts}
            renderItem={(contact) => (
              <ContactListItem
                key={contact.item.recordID}
                item={contact.item}
                onPress={openContact}
                onloadLeads={loadLeads}
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
                onloadLeads={loadLeads}
                isLead={true}
              />
            )}
            keyExtractor={(item) => item.recordID}
          />
        </View>
      )}
      {index === 2 && (
       <View>{console.log("selectedClients",selectedClients)}
       <FlatList
         data={selectedClients}
         renderItem={(contact) => (
           <ContactItem
             key={contact.item.recordID}
             item={contact.item}
             onPress={openContact}
             getItem={loadClients}
             isClient={true}
           />
         )}
         keyExtractor={(item) => item.recordID}
       />
     </View>
      )}
      {index === 3 && (
        <View>
          <Text>This is the Groups tab</Text>
        </View>
      )} */}
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
