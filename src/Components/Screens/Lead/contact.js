// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

import React, {memo, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import PropTypes from 'prop-types';
import Avatar from './avatar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import uuid from 'react-native-uuid';

const getAvatarInitials = (textString) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

const ContactListItem = (props) => {

  const navigation = useNavigation();
  const { item, onPress, onAddContact,isLead=false } = props;
  
  // const postLeads = (newLead) => {
  //   fetch('http://192.168.1.109:3001/api/Leads', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ Leads: [newLead] }), // Send the new contact in an array
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data, "Leads data res");
  //     })
  //     .catch((error) => {
  //       console.error('Error while posting contacts:', error);
  //     });
  // };
  const postLeads = async (newLead) => {
    try {
      console.log('Posting lead:', newLead);
      let leadData={
        recordID: uuid.v1(),
        firstName:newLead.givenName,
        lastName:newLead.familyName,
        phoneNumber:newLead?.phoneNumbers[0]?.number,
        whatsappNumber:newLead?.phoneNumbers[0]?.number,
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
          onAddContact();
        console.log(data, 'Leads data res from contact');
      }
 
    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  };
  
  

  const showLeadsDetails=()=>{
    if (isLead) {
      navigation.navigate('StackLeadDetails');
    } else {
      onPress(item); // Call onPress only if isLead is false
    }
  }
  const handleAddContact = (item_,item) => {
    // Call the onAddContact function with the contact item
    console.log('lead itemmm',item_,"item_----",item)
    // onAddContact(item);
    postLeads(item);
    // onPress(item_)
  };
 
  const handleEditContact = (item_,item) => {
    console.log("Edit contact:", item);
    navigation.navigate('StackLeadEdit', { lead: item , onAddContact:onAddContact});
    // For API request, you can use the following code

  };

  const handleDeleteContact = (item_,item) => {
    console.log("Delete contact:", item);
    // For API request, you can use the following code
    axios.delete(`http://192.168.1.109:3001/api/leads/${item.recordID}`)
      .then((response) => {
        if(response.data.status === "success"){
          onAddContact();
        }
        // Handle success
      })
      .catch((error) => {
        console.error('Error while deleting contact:', error);
        // Handle error
      });
  };

  // console.log("item contatcs",props,"props")
  return (
    <View>
      <TouchableOpacity onPress={showLeadsDetails}>
        <View style={styles.itemContainer}>
          <View style={styles.leftElementContainer}>
            <Avatar
              img={
                item.hasThumbnail ?
                  {uri: item.thumbnailPath} : undefined
              }
              placeholder={getAvatarInitials(
                `${item.givenName} ${item.familyName}`,
              )}
              width={40}
              height={40}
            />
          </View>
          <View style={styles.rightSectionContainer}>
            <View style={styles.mainTitleContainer}>
              <Text
                style={
                  styles.titleStyle
                }>{!isLead?`${item?.givenName} ${item?.familyName}`:`${item?.firstName} ${item?.lastName}`}</Text>
                  <Text
                style={
                  styles.titleStyle
                }>{!isLead?`${item?.phoneNumbers[0]?.number}`:`${item.phoneNumber}`}</Text>
            </View>
            <View style={styles.buttonContainer}>
              {!isLead ? (
                <Icon
                  name="plus"
                  size={20}
                  color="#486e75"
                  onPress={(item_)=>{handleAddContact(item_,item)}}
                />
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    name="edit" // Use the appropriate icon for edit
                    size={20}
                    color="#486e75"
                    onPress={(item_) => handleEditContact(item_,item)}
                    style={{ marginRight: 10 }}
                  />
                  <Icon
                    name="trash" // Use the appropriate icon for delete
                    size={20}
                    color="#486e75"
                    onPress={(item_) => handleDeleteContact(item_,item)}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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

export default ContactListItem;
