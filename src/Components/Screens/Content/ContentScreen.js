import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContentComponent = ({route}) => {
  const navigation = useNavigation();
  console.log(route?.params,"route params content")
  const { givenName } = route.params && route.params.item ? route.params.item : { givenName: "Client" };
  const data = [
    {
      id: 1,
      title: "First Message to a New Lead",
      description: `Hi ,${givenName} Thank you for your interest in ACME Residences. I’ll be happy to share more details about the project and answer any questions you have. Would you like me to send you the eBrochure? satish gaikwad Demo Company`
    },
    {
      id: 2,
      title: "Follow Up - Book Viewing",
      description: `Hi ${givenName}, I wanted to follow up and check if you had any questions about ACME Residences, or if I could help to arrange a viewing for you in the coming week. Please let me know if I can assist in any way, thank you! Demo Company`
    },
    {
      id: 3,
      title: "Meeting Reminder - Today",
      description: `Good morning ${givenName}! 🌞 Looking forward to meeting you at the ACME Residences showflat for your viewing later today! The address is 123 ACME Boulevard, and free parking is available. Please let me know when you arrive, I’ll be there to welcome you at the entrance. See you soon!`
    },
    {
      id: 4,
      title: "Example 5: Latest Promotions",
      description: `Hi ${givenName} 👋 Hope you’re having a great week! I’m excited to share that the latest promotions for ACME Residences were just released today, and they include a few really nice units that I think you’d be interested in. Shall I send the new discounts and price list?`
    }
  ];

  const goToDetailsScreen = (item) => {
    navigation.navigate('StackContentDetails', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToDetailsScreen(item)} style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>{item.description}</Text>
      </View>
      <Icon name="angle-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tabTitle}>This is the Content tab</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default ContentComponent;
