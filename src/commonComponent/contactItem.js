import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Avatar, IconButton, List, Menu, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const getAvatarInitials = (textString) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  return textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
};

const ContactItem = ({ item, onPress, listType, onAddAction, editAction, deleteAction }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const Navigation = useNavigation();

  const handleShareAction = () => {
    hideModal();
    Navigation.navigate('Content', { item: item });
  };

  const handleEditAction = (item) => {
    editAction(item);
    hideModal();
  };

  const handleDeleteAction = (item) => {
    deleteAction(item);
    hideModal();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <List.Item
        title={`${item.givenName} ${item.familyName}`}
        description={listType === "Contacts" ? item?.phoneNumbers[0]?.number : item?.phoneNumber}
        left={() => (
          <Avatar.Text size={40} label={getAvatarInitials(`${item.givenName} ${item.familyName}`)} />
        )}
        right={() => (
          <Menu visible={visible} anchor={<IconButton icon="dots-vertical" color="#486e75" size={20} onPress={showModal} />}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
                <IconButton icon="close" color="#486e75" size={20} onPress={hideModal} style={styles.closeButton} />
                {listType === 'Contacts' ? (
                  <TouchableOpacity onPress={() => { onAddAction(item); hideModal(); }}>
                    <View style={styles.addButtonContainer}>
                      <IconButton icon="plus" color="#486e75" size={40} />
                      <Text style={styles.actionButtonText}>Add {listType}</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity onPress={() => { handleEditAction(item); hideModal() }}>
                      <View style={styles.actionButtonContainer}>
                        <IconButton icon="account-edit" color="#486e75" size={40} />
                        <Text style={styles.actionButtonText}>Edit {listType}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleDeleteAction(item); hideModal() }}>
                      <View style={styles.actionButtonContainer}>
                        <IconButton icon="delete-circle" color="#486e75" size={40} />
                        <Text style={styles.actionButtonText}>Delete {listType}</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity onPress={handleShareAction}>
                  <View style={styles.actionButtonContainer}>
                    <IconButton icon="share-variant" color="#486e75" size={40} />
                    <Text style={styles.actionButtonText}>Share Content With {listType}</Text>
                  </View>
                </TouchableOpacity>
              </Modal>
            </Portal>
          </Menu>
        )}
      />
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#36acaa',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999,
  },
});
