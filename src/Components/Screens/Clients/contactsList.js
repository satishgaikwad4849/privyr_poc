// // Access Device’s Contact List in React Native App
// // https://aboutreact.com/access-contact-list-react-native/

// // Import React
// import React, {useState, useEffect} from 'react';

// // Import all required component
// import {
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
// } from 'react-native';

// import Contacts from 'react-native-contacts';
// import ContactListItem from './contact';

// const ContactsList = () => {
//   let [contacts, setContacts] = useState([]);
//   let [selectedContacts, setSelectedContacts] = useState([]);



//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//           title: 'Contacts',
//           message: 'This app would like to view your contacts.',
//         }).then(() => {
//           loadContacts();
//         }
//       );
//     } else {
//       loadContacts();
//     }
//   }, []);

//   const loadContacts = () => {
//     Contacts.getAll()
//   .then(contacts => {
//     contacts.sort((a, b) => {
//       if (a.givenName && b.givenName) {
//         const nameA = a.givenName.toLowerCase();
//         const nameB = b.givenName.toLowerCase();
//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }
//       }
//       return 0;
//     });
//     setContacts(contacts.slice(0,100));
//   })
//   .catch(error => {
//     console.error('Error while fetching contacts:', error);
//   });

  
//   };

//   const search = (text) => {
//     const phoneNumberRegex = 
//       /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
//     if (text === '' || text === null) {
//       loadContacts();
//     } else if (phoneNumberRegex.test(text)) {
//       Contacts.getContactsByPhoneNumber(text).then(contacts => {
//         contacts.sort(
//           (a, b) => 
//           a.givenName.toLowerCase() > b.givenName.toLowerCase(),
//         );
//         setContacts(contacts);
//       });
//     } else {
//       Contacts.getContactsMatchingString(text).then(contacts => {
//         contacts.sort(
//           (a, b) => 
//           a.givenName.toLowerCase() > b.givenName.toLowerCase(),
//         );
//         setContacts(contacts);
//         console.log('contacts', contacts);
//       });
//     }
//   };

//   const openContact = (contact) => {
//     // contact.stopPropagation();
//     console.log(JSON.stringify(contact),"contact_1");
//     setSelectedContacts((prevSelectedContacts) => [...prevSelectedContacts, contact]);
//     // Contacts.openExistingContact(contact);
//   };
//   const addContact = (contact) => {
//     console.log(contact,"contact one")
//     setSelectedContacts((prevSelectedContacts) => [...prevSelectedContacts, contact]);
//   };
//   return (
//     <SafeAreaView >
//       <View >
//         <Text >
//           Access Contact List in React Native
//         </Text>
//         <Text>Selected Contacts: {JSON.stringify(selectedContacts)}</Text>
//         <TextInput
//           onChangeText={search}
//           placeholder="Search"
//           // style={styles.searchBar}
//         />
//         <FlatList
//           data={contacts}
//           renderItem={(contact) => {
//             {
//               console.log('contact -> ' + JSON.stringify(contact));
//             }
//             return (
//               <>
//                {/* <TouchableOpacity onPress={() => openContact(contact)}> */}
//               <ContactListItem
//                 key={contact.item.recordID}
//                 item={contact.item}
//                 onPress={openContact}
//                 onAddContact={addContact}
//               />
//               {/* </TouchableOpacity> */}
//               </>
//             );
//           }}
//           keyExtractor={(item) => item.recordID}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };
// export default ContactsList;
