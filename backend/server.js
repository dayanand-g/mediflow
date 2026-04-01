const express = require('express');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const publicVapidKey = 'BFIkEdGuRbguZupv35dSdiXkqB8Ae6MZXGRnQPo6hmOwsTOCfIE7LsW0IAqxuNPCmlQu4zngMBefBkGkToakuKw';
const privateVapidKey = '2CA-YY4jhxV3Xz5fgNS8UpwfLRP-UYCxU7tWdjQTC9o';

webpush.setVapidDetails(
  'mailto:dayanandmg00@gmail.com', // Required by browsers to contact me if the issues arise
  publicVapidKey,
  privateVapidKey
);

// Dummy Database 
let dummyDatabase = []; 

// save the subscription object from the frontend to the database
app.post('/subscribe', (req, res) => {
  const subscription = req.body; 

  // Save to database
  dummyDatabase.push(subscription);
  
  res.status(201).json({ message: 'Subscription saved successfully.' });
});

// Trigger a push notification to all subscribers (for demo purposes)
app.post('/send-notification', async (req, res) => {
  const { title, body } = req.body;
  
  const payload = JSON.stringify({ title, body });

  try {
    // In prod, we'll fetch the specific user's subscription from our DB
    const subscription = dummyDatabase[0]; 

    if (!subscription) {
        return res.status(404).json({ error: 'No subscriptions found.' });
    }

    // Send the push to user device
    await webpush.sendNotification(subscription, payload);
    
    res.status(200).json({ message: 'Notification sent!' });
  } catch (error) {
    console.error('Error sending notification, usually means user revoked permission:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

const PORT = 5000;
app.get('/', (req, res) => {
  res.send('Healthcare Backend is Online! 🚀');
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));