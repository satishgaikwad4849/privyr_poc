// ListItem.js
import React,{useEffect}from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Avatar from '../Components/Screens/Lead/avatar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import uuid from 'react-native-uuid';

const getAvatarInitials = (textString) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  return textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
};

const ContactItem = ({ item, onPress, onAction, actionIcon, actionType,listType,onAddAction,editAction,deleteAction}) => {
  const handleEditAction = (item) => {
     if (listType === 'Leads') {
      editAction(item);
    } else if (listType === 'Clients') {
      editAction(item);
    }
  };

  const handleDeleteAction = (item) => {
    if (listType === 'Leads') {
      deleteAction(item);
    } else if (listType === 'Clients') {
      deleteAction(item);
    }
  }
useEffect(()=>{

},[])
  const postContact = async (newContact) => {
    try {
      console.log('Posting contact:', newContact);
      const contactData = {
        recordID: uuid.v1(),
        givenName: newContact.givenName,
        familyName: newContact.familyName,
        phoneNumber: newContact?.phoneNumbers[0]?.number,
        whatsappNumber: newContact?.phoneNumbers[0]?.number,
        emailId: "",
        notes: ""
      };
      const response = await axios.post('http://192.168.1.109:3001/api/contacts', {
        contacts: [contactData],
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      if (data.status === "success") {
        onAction();
        console.log(data, 'Contact data res from contact');
      }

    } catch (error) {
      console.error('Error while posting contact:', error);
    }
  };

  const showDetails = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={showDetails}>{console.log(item,"item contact item")}
      <View style={styles.itemContainer}>
        <View style={styles.leftElementContainer}>
          {/* <Avatar
            img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
            placeholder={getAvatarInitials(`${item.givenName} ${item.familyName}`)}
            width={40}
            height={40}
          /> */}
        </View>
        <View style={styles.rightSectionContainer}>
          <View style={styles.mainTitleContainer}>
          {/* <Text style={styles.titleStyle}>{`${item.firstName}`}</Text> */}
            <Text style={styles.titleStyle}>{`${item.givenName} ${item.familyName}`}</Text>
            <Text style={styles.titleStyle}>{listType === "Contacts"?item?.phoneNumbers[0]?.number:item?.phoneNumber}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {/* {actionType && actionType === 'addContact' ? (
              <Icon
                name={actionIcon || 'plus'}
                size={20}
                color="#486e75"
                onPress={handleAction}
              />
            ) : (
              <Icon
                name={actionIcon || 'edit'}
                size={20}
                color="#486e75"
                onPress={handleAction}
              />
            )} */}
               {listType === 'Contacts' ? <Icon
                name="plus"
                size={20}
                color="#486e75"
                onPress={() => onAddAction(item)}
              />:
              (
                <>
             <Icon
                  name="edit"
                  size={20}
                  color="#486e75"
                  onPress={() =>  handleEditAction(item)}
                  style={{ marginRight: 10 }}
                />
                <Icon
                  name="trash"
                  size={20}
                  color="#486e75"
                  onPress={() => handleDeleteAction(item)}
                />
              </>)
          }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 18,
  },
});

export default ContactItem;

// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// // import Avatar from './avatar';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import PropTypes from 'prop-types';

// const ContactItem = ({
//   item,
//   onPress,
//   getItem,
//   isLead = false,
//   client = false, // new prop
//   handleAddContact,
//   handleEditContact,
//   handleDeleteContact,
// }) => {
//   const showDetails = () => {
//     if (isLead || client) {
//       getItem();
//       navigation.navigate(client?'StackClientDetails':'StackLeadDetails');
      
//     } else {
//       onPress(item);
//     }
//   };

//   return (
//     <TouchableOpacity>
//       <View style={styles.itemContainer}>{console.log(item,"client item")}
//         <View style={styles.leftElementContainer}>
//           {/* <Avatar
//             img={item.hasThumbnail ? { uri: item.thumbnailPath } : undefined}
//             placeholder={getAvatarInitials(
//               `${item.givenName} ${item.familyName}`
//             )}
//             width={40}
//             height={40}
//           /> */}
//         </View>
//         <View style={styles.rightSectionContainer}>
//           <View style={styles.mainTitleContainer}>
//             <Text style={styles.titleStyle}>
//             {/* {!isLead ? `${item?.givenName} ${item?.familyName}` : `${item?.firstName} ${item?.lastName}`} */}
//            ${item?.firstName}
//               {/* {!isLead ? `${item?.givenName} ${item?.familyName}` : `${item?.firstName} ${item?.lastName}`} */}
//             </Text>
//             <Text style={styles.titleStyle}>
//               {/* {!isLead ? `${item?.phoneNumbers[0]?.number}` : `${item.phoneNumber}`} */}
//             </Text>
//           </View>
//           <View style={styles.buttonContainer}>
//             {/* {!isLead ? (
//               <Icon
//                 name="plus"
//                 size={20}
//                 color="#486e75"
//                 onPress={() => handleAddContact(item)}
//               />
//             ) : (
//               <View style={{ flexDirection: 'row' }}>
//                 {client && (
//                   <Icon
//                     name="user"
//                     size={20}
//                     color="#486e75"
//                     onPress={() => handleClient(item)}
//                     style={{ marginRight: 10 }}
//                   />
//                 )}
//                 <Icon
//                   name="edit"
//                   size={20}
//                   color="#486e75"
//                   onPress={() => handleEditContact(item)}
//                   style={{ marginRight: 10 }}
//                 />
//                 <Icon
//                   name="trash"
//                   size={20}
//                   color="#486e75"
//                   onPress={() => handleDeleteContact(item)}
//                 />
//               </View>
//             )} */}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// ContactItem.propTypes = {
//   item: PropTypes.object.isRequired,
//   onPress: PropTypes.func.isRequired,
//   onAddContact: PropTypes.func.isRequired,
//   isLead: PropTypes.bool,
//   client: PropTypes.bool, // new prop
//   handleAddContact: PropTypes.func.isRequired,
//   handleEditContact: PropTypes.func.isRequired,
//   handleDeleteContact: PropTypes.func.isRequired,
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flexDirection: 'row',
//     minHeight: 44,
//     height: 63,
//   },
//   leftElementContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 2,
//     paddingLeft: 13,
//   },
//   rightSectionContainer: {
//     marginLeft: 18,
//     flexDirection: 'row',
//     flex: 20,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderColor: '#515151',
//   },
//   mainTitleContainer: {
//     justifyContent: 'center',
//     flexDirection: 'column',
//     flex: 1,
//   },
//   titleStyle: {
//     fontSize: 16,
//   },
//   buttonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingRight: 18,
//   },
// });

// export default ContactItem;
