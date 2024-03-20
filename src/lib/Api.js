import axios from 'axios';
import uuid from 'react-native-uuid';

class API {
  constructor() {
    this.baseURL = 'http://192.168.1.109:3001/api';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async getContacts(){
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/contacts');
    return response.data;
    } catch (error) {
      console.error('Error while getting contacts:', error);
    }
  }

  async postContacts(newContacts) {
    try {
      const response = await axios.post(`${this.baseURL}/contacts`, {
        contacts: newContacts,
      }, {
        headers: this.headers,
      });

    return response.data;

    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  }

  async getLeads() {
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/leads');
    return response.data;
    } catch (error) {
      console.error('Error while getting leads:', error);
    }
  }

  async postLeads(leadData) {
    try {
      const response = await axios.post(`${this.baseURL}/leads`, {
        leads: [leadData],
      }, {
        headers: this.headers,
      });

    return response.data;

    } catch (error) {
      console.error('Error while posting contacts:', error);
    }
  }

  async  editLeads(recordID,data){
    console.log(recordID,data,"edit leadssss")
    try {
        const response = await axios.put(`${this.baseURL}/leads/${recordID}`, { lead: data }, {
            headers: this.headers,
          })
        return response.data;
  
      } catch (error) {
        console.error('Error while editing Leads:', error);
      } 
  }

  async deleteLeads(recordID){
    try {
      const response = await axios.delete(`${this.baseURL}/leads/${recordID}`)
      return response.data;

    } catch (error) {
      console.error('Error while deleting Leads:', error);
    } 
  }

  async getClients(){
    try {
      const response = await axios.get('http://192.168.1.109:3001/api/clients');
    return response.data;
    } catch (error) {
      console.error('Error while getting clients:', error);
    }
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
  
  async  editClients(recordID,data){
    try {
        const response = await axios.put(`http://192.168.1.109:3001/api/clients/${recordID}`, { client: data }, {
            headers: this.headers,
          })
        return response.data;
  
      } catch (error) {
        console.error('Error while editing clients:', error);
      } 
  }

  async deleteClients(recordID){
    try {
      const response = await axios.delete(`${this.baseURL}/clients/${recordID}`)
      return response.data;

    } catch (error) {
      console.error('Error while deleting Clients:', error);
    } 
  }

  async  searchLeads(searchText){
    try {
        const response = await axios.get(`http://192.168.1.109:3001/api/search/leads?search=${searchText}`)
        return response.data;
  
      } catch (error) {
        console.error('Error while search leads', error);
      } 
  }

  async  searchClients(searchText){
    try {
        const response = await axios.get(`http://192.168.1.109:3001/api/search/clients?search=${searchText}`)
        return response.data;
  
      } catch (error) {
        console.error('Error while search clients', error);
      } 
  }
}
const Api = new API();
export default Api;
