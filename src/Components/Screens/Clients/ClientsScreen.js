// ClientsComponent.js
import React,{useState,useEffect} from 'react';
import { Searchbar } from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';
import ContactListItem from './contact';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import Contacts from 'react-native-contacts';
const ClientsComponent = () => {
  const tabs = ['All Clients', 'Team', 'Groups'];
  const [index, setIndex] = React.useState(0);
  const [showContacts, setShowContacts] = useState(false);
    let [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          }).then(() => {
            loadContacts();
          }
        );
      } else {
        loadContacts();
      }
    }, []);
  
    const loadContacts = () => {
      Contacts.getAll()
    .then(contacts => {
      contacts.sort((a, b) => {
        if (a.givenName && b.givenName) {
          const nameA = a.givenName.toLowerCase();
          const nameB = b.givenName.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        return 0;
      });
      setContacts(contacts.slice(0,100));
    })
    .catch(error => {
      console.error('Error while fetching contacts:', error);
    });
  
    
    };
  
    const search = (text) => {
      const phoneNumberRegex = 
        /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
      if (text === '' || text === null) {
        loadContacts();
      } else if (phoneNumberRegex.test(text)) {
        Contacts.getContactsByPhoneNumber(text).then(contacts => {
          contacts.sort(
            (a, b) => 
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setContacts(contacts);
        });
      } else {
        Contacts.getContactsMatchingString(text).then(contacts => {
          contacts.sort(
            (a, b) => 
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setContacts(contacts);
          console.log('contacts', contacts);
        });
      }
    };
  
    const openContact = (contact) => {
      console.log(JSON.stringify(contact));
      Contacts.openExistingContact(contact);
    };
    const renderPlusIcon = () => {
      return (
        <TouchableOpacity
          style={styles.plusIcon}
          onPress={() => setShowContacts(true)}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      );
    };
  return (
    <View style={{ width: '100%', height: '100%' }}>
      {/* Search Input */}
    
          <Text >
            Access Contact List in React Native
          </Text>
          {/* <TextInput
            onChangeText={search}
            placeholder="Search"
            style={styles.searchBar}
          /> */}
           <Searchbar placeholder="Search" onChangeText={search}/>
           
      {/* Tabs */}
      

      {/* Content for each tab */}
      
      <MaterialTabs
        items={tabs}
        selectedIndex={index}
        onChange={setIndex}
        // barColor="#2196F3" // You can customize the color
        // indicatorColor="#FFEB3B" // You can customize the color
      />
      {index === 0 && (
        <View>
          <Text>This is the All Clients tab</Text>
          {/* Add content related to all clients here */}
        </View>
      )}
      {index === 1 && (
        <View>
          <Text>This is the Team tab</Text>
          {/* Add content related to team here */}
        </View>
      )}
      {index === 2 && (
        <View>
          <Text>This is the Groups tab</Text>
          {/* Add content related to groups here */}
        </View>
      )}
      {showContacts && 
      <FlatList
            data={contacts}
            renderItem={(contact) => {
              {
                console.log('contact -> ' + JSON.stringify(contact));
              }
              return (
                <ContactListItem
                  key={contact.item.recordID}
                  item={contact.item}
                  onPress={openContact}
                />
              );
            }}
            keyExtractor={(item) => item.recordID}
          />
}
{renderPlusIcon()}
    </View>
  );
};

export default ClientsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Make the container relative to position its children
    height:'100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
  },
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
});