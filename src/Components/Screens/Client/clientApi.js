import axios from 'axios';
import uuid from 'react-native-uuid';

class API {
  constructor() {
    this.baseURL = 'http://192.168.1.109:3001/api';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async postClients(clientName, mobileNumber, whatsappNumber, email, notes) {
    try {
      let clientData = {
        recordID: uuid.v1(),
        givenName: clientName.split(' ')[0],
        familyName: clientName.split(' ')[1],
        phoneNumber: mobileNumber,
        whatsappNumber: whatsappNumber ?? mobileNumber,
        emailId: email,
        notes: notes
      };
      const response = await axios.post(`${this.baseURL}/clients`, {
        clients: [clientData],
      }, {
        headers: this.headers,
      });

    return response.data;

    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  }
}
const Api = new API();
export default Api;
