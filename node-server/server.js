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


app.listen(PORT, () => {
  console.log(`Mock server is running at http://localhost:${PORT}`);
});
