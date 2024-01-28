// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

import React, {memo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

// import PropTypes from 'prop-types';
import Avatar from './avatar';

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
  const shouldComponentUpdate = () => {
    return false;
  };
  const {item, onPress} = props;
  console.log(item,"item contatcs",item?.givenName)
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(item)}>
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
                }>{`${item?.givenName} ${item?.familyName}`}</Text>
                  <Text
                style={
                  styles.titleStyle
                }>{`${item?.phoneNumbers[0]?.number}`}</Text>
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
});

export default ContactListItem;

// ContactListItem.propTypes = {
//   item: PropTypes.object,
//   onPress: PropTypes.func,
// };
// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// const Contact = ({contact}) => {
//   return (
//     <View style={styles.contactCon}>
//       <View style={styles.imgCon}>
//         <View style={styles.placeholder}>
//           <Text style={styles.txt}>{contact?.givenName[0]}</Text>
//         </View>
//       </View>
//       <View style={styles.contactDat}>
//         <Text style={styles.name}>
//           {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
//           {contact?.familyName}
//         </Text>
//         <Text style={styles.phoneNumber}>
//           {contact?.phoneNumbers[0]?.number}
//         </Text>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   contactCon: {
//     flex: 1,
//     flexDirection: 'row',
//     padding: 5,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#d9d9d9',
//   },
//   imgCon: {},
//   placeholder: {
//     width: 55,
//     height: 55,
//     borderRadius: 30,
//     overflow: 'hidden',
//     backgroundColor: '#d9d9d9',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   contactDat: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 5,
//   },
//   txt: {
//     fontSize: 18,
//   },
//   name: {
//     fontSize: 16,
//   },
//   phoneNumber: {
//     color: '#888',
//   },
// });
// export default Contact;