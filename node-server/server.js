// mockServer.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

let mockContacts = [];
let mockLeads = [];
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
        const existingLeadsIndex = mockContacts.findIndex(
          (contact) => contact.recordID === newContact.recordID
        );
  
        if (existingLeadsIndex === -1) {
          mockContacts.push(newContact);
        } else {
          mockContacts[existingLeadsIndex] = newContact;
        }
      });
  
      res.json({ message: 'Contacts successfully updated',status:"success" });
    } catch (error) {
      console.error('Error handling /api/contacts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.get('/api/leads', (req, res) => {
  console.log(mockLeads,"mockLeads")
  res.json({ leads: mockLeads ,status:"success"});
});
app.post('/api/leads', (req, res) => {
  console.log(req,"req leads")
  try{
  let newLeads = req.body.leads || [];

  // If newLeads is a single object, convert it to an array
  if (!Array.isArray(newLeads)) {
    newLeads = [newLeads];
  }

  newLeads.forEach((newLead) => {
    // Check if the Lead already exists in the mockLeads array
    const existingLeadIndex = mockLeads.findIndex(
      (lead) => lead.recordID === newLead.recordID
    );

    if (existingLeadIndex === -1) {
      // If not, add the new Lead to the array
      mockLeads.push(newLead);
    } else {
      // If it exists, update the existing Lead
      mockLeads[existingLeadIndex] = newLead;
    }
  });

  res.json({ message: 'Leads successfully updated',status:"success" });;
} catch (error) {
  console.error('Error handling /api/leads:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});



// Edit a Lead
app.put('/api/leads/:recordID', (req, res) => {
  try {
    const recordID = req.params.recordID;
    const updatedLead = req.body.lead;

    const existingLeadIndex = mockLeads.findIndex(
      (lead) => lead.recordID === recordID
    );

    if (existingLeadIndex !== -1) {
      mockLeads[existingLeadIndex] = updatedLead;
      res.json({ message: 'Lead successfully updated', status: 'success' });
    } else {
      res.status(404).json({ error: 'Lead not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling /api/leads/:recordID (PUT):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a Lead
app.delete('/api/leads/:recordID', (req, res) => {
  console.log(req,"delete req")
  try {
    const recordID = req.params.recordID;

    const existingLeadIndex = mockLeads.findIndex(
      (lead) => lead.recordID === recordID
    );

    if (existingLeadIndex !== -1) {
      mockLeads.splice(existingLeadIndex, 1);
      res.json({ message: 'Lead successfully deleted', status: 'success' });
    } else {
      res.status(404).json({ error: 'Lead not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling /api/leads/:recordID (DELETE):', error);
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

  // If newclients is a single object, convert it to an array
  if (!Array.isArray(newClients)) {
    newClients = [newClients];
  }

  newClients.forEach((newClient) => {
    // Check if the client already exists in the mockclients array
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

  res.json({ message: 'clients successfully updated',status:"success" });;
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
      res.json({ message: 'client successfully updated', status: 'success' });
    } else {
      res.status(404).json({ error: 'client not found', status: 'error' });
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
      res.json({ message: 'client successfully deleted', status: 'success' });
    } else {
      res.status(404).json({ error: 'client not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error handling /api/clients/:recordID (DELETE):', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Mock server is running at http://localhost:${PORT}`);
});

// Endpoint to search leads
app.get('/api/search/leads', (req, res) => {
  try {
    const searchText = req.query.search || '';
    const filteredLeads = mockLeads.filter((lead) => {
      // Filter logic based on your requirements
      // For example, you can filter by lead name, phone number, etc.
      return (
        lead.givenName.toLowerCase().includes(searchText.toLowerCase()) ||
        lead.familyName.toLowerCase().includes(searchText.toLowerCase()) ||
        lead.phoneNumber.includes(searchText)
      );
    });

    res.json({ leads: filteredLeads, status: "success" });
  } catch (error) {
    console.error('Error handling /api/search/leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to search clients
app.get('/api/search/clients', (req, res) => {
  try {
    const searchText = req.query.search || '';
    const filteredClients = mockClients.filter((client) => {
      // Filter logic based on your requirements
      // For example, you can filter by client name, phone number, etc.
      return (
        client.givenName.toLowerCase().includes(searchText.toLowerCase()) ||
        client.familyName.toLowerCase().includes(searchText.toLowerCase()) ||
        client.phoneNumber.includes(searchText)
      );
    });

    res.json({ clients: filteredClients, status: "success" });
  } catch (error) {
    console.error('Error handling /api/search/clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
