// mockServer.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

let mockContacts = [];
let mockClients = [];
// Endpoint to get contacts
app.get('/api/contacts', (req, res) => {
  res.json({ contacts: mockContacts,status:"success"});
});

// Endpoint to post contacts
// Update the /api/contacts POST endpoint in mockServer.js

app.post('/api/contacts', (req, res) => {
    try {
      const newContacts = req.body.contacts || [];
  console.log(newContacts,"newContacts post")
      newContacts.forEach((newContact) => {
        const existingClientsIndex = mockContacts.findIndex(
          (contact) => contact.recordID === newContact.recordID
        );
  
        if (existingClientsIndex === -1) {
          mockContacts.push(newContact);
        } else {
          mockContacts[existingClientsIndex] = newContact;
        }
      });
  
      res.json({ message: 'Contacts successfully updated',status:"success" });
    } catch (error) {
      console.error('Error handling /api/contacts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.get('/api/clients', (req, res) => {
  console.log(mockClients,"mockclients")
  res.json({ clients: mockClients ,status:"success"});
});
app.post('/api/clients', (req, res) => {
  console.log(req,"req clients")
  try{
  let newClients = req.body.clients || [];

  // If newClients is a single object, convert it to an array
  if (!Array.isArray(newClients)) {
    newClients = [newClients];
  }

  newClients.forEach((newClient) => {
    // Check if the client already exists in the mockClients array
    const existingClientIndex = mockClients.findIndex(
      (client) => client.recordID === newClient.recordID
    );

    if (existingClientIndex === -1) {
      // If not, add the new client to the array
      mockClients.push(newClient);
    } else {
      // If it exists, update the existing client
      mockClients[existingClientIndex] = newClient;
    }
  });

  res.json({ message: 'Clients successfully updated',status:"success" });;
} catch (error) {
  console.error('Error handling /api/clients:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});



// Edit a client
app.put('/api/clients/:recordID', (req, res) => {
  try {
    const recordID = req.params.recordID;
    const updatedClient = req.body.client;

    const existingClientIndex = mockClients.findIndex(
      (client) => client.recordID === recordID
    );

    if (existingClientIndex !== -1) {
      mockClients[existingClientIndex] = updatedClient;
      res.json({ message: 'Client successfully updated', status: 'success' });
    } else {
      res.status(404).json({ error: 'Client not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling /api/clients/:recordID (PUT):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a client
app.delete('/api/clients/:recordID', (req, res) => {
  console.log(req,"delete req")
  try {
    const recordID = req.params.recordID;

    const existingClientIndex = mockClients.findIndex(
      (client) => client.recordID === recordID
    );

    if (existingClientIndex !== -1) {
      mockClients.splice(existingClientIndex, 1);
      res.json({ message: 'Client successfully deleted', status: 'success' });
    } else {
      res.status(404).json({ error: 'Client not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling /api/clients/:recordID (DELETE):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Mock server is running at http://localhost:${PORT}`);
});
