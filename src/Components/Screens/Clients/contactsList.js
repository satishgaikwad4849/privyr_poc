// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

// Import React
import React, {useState, useEffect} from 'react';

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from 'react-native';

import Contacts from 'react-native-contacts';
import ContactListItem from './contact';

const ContactsList = () => {
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

  return (
    <SafeAreaView >
      <View >
        <Text >
          Access Contact List in React Native
        </Text>
        <TextInput
          onChangeText={search}
          placeholder="Search"
          // style={styles.searchBar}
        />
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
      </View>
    </SafeAreaView>
  );
};
export default ContactsList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#4591ed',
//     color: 'white',
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     fontSize: 20,
//   },
//   searchBar: {
//     backgroundColor: '#f0eded',
//     paddingHorizontal: 30,
//     paddingVertical: Platform.OS === 'android' ? undefined : 15,
//   },
// });
// import React, {useEffect, useState} from 'react';
// import {FlatList, View, Text, StyleSheet,PermissionsAndroid,Alert,Linking} from 'react-native';
// import Contacts from 'react-native-contacts';
// import Contact from './contact';


// const requestContactsPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//         {
//           title: 'Contacts',
//           message: 'This app would like to view your contacts.',
//           buttonPositive: 'Please accept bare mortal',
//         }
//       );
//   console.log(granted,"permission called")
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         // Permission granted, fetch contacts
//         Contacts.getAll()
//           .then((contacts) => {
//             // Work with contacts
//             console.log(contacts);
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//       } else {
//         // Permission denied or never ask again
//         if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//           // Handle the scenario where the user has denied the permission with never ask again
//           Alert.alert(
//             'Permission Denied',
//             'To enable the app to read contacts, please go to App Settings and grant the Contacts permission.',
//             [
//               {
//                 text: 'Cancel',
//                 style: 'cancel',
//               },
//               {
//                 text: 'Open Settings',
//                 onPress: () => {
//                   // Redirect the user to the app settings using Linking
//                   Linking.openSettings();
//                 },
//               },
//             ]
//           );
//         } else {
//           console.log('Contacts permission denied');
//         }
//       }
//     } catch (error) {
//       console.error('Permission error: ', error);
//     }
//   };
  
//   // Call the function to request contacts permission
//   requestContactsPermission();


// const ContactsList = () => {
//   const [contacts, setContacts] = useState([]);
//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = () => {
//     Contacts.getAll().then(contacts => {
//       console.log(contacts,"contactss")
//       setContacts(contacts);
//     }).catch((e) => {console.log(e,"error contacts") });
//   };
//   const keyExtractor = (item, idx) => {
//     return item?.recordID?.toString() || idx.toString();
//   };
//   const renderItem = ({item, index}) => {
//     return <Contact contact={item} />;
//   };
//   const renderContactItem = ({ item }) => (
//     <TouchableOpacity>
//       <Text>{item.displayName}</Text>
//     </TouchableOpacity>
//   );
//   return (
//     <>
//     <Text>svdv</Text>
//     {/* // <FlatList
//     //   data={contacts}
//     //   renderItem={renderItem}
//     //   keyExtractor={keyExtractor}
//     //   style={styles.list}
//     // /> */}
//      <Text>Contact List</Text>
//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => item.recordID}
//         renderItem={renderContactItem}
//       />
//     </>
    
//   );
// };
// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//   },
// });
// export default ContactsList;