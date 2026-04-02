const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json()); 

//  Initializing Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY 
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
        : undefined,
    }),
  });
}

const db = admin.firestore();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:dayanandmg00@gmail.com', // Required by browsers to contact me if the issues arise
  publicVapidKey,
  privateVapidKey
);

// API Route: Saving the Subscription to Firestore
app.post('/api/subscribe', async (req, res) => {
  try {
    const subscription = req.body; 
    
    // Saving the object to a 'subscriptions' collection
    await db.collection('subscriptions').add(subscription);
    
    res.status(201).json({ message: 'Subscription saved to Firestore securely.' });
  } catch (error) {
    console.error('Database save error:', error);
    res.status(500).json({ error: 'Failed to save subscription.' });
  }
});


// 4. API Route: Send Notification to All Subscribers
app.post('/api/send-notification', async (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  try {
    // Fetching all saved subscriptions from Firestore
    const snapshot = await db.collection('subscriptions').get();
    
    if (snapshot.empty) {
      return res.status(404).json({ error: 'No user subscriptions found in database.' });
    }

    // Sending a push notification to every subscription in the database
    const pushPromises = [];
    snapshot.forEach((doc) => {
      const subscription = doc.data();
      pushPromises.push(
        webpush.sendNotification(subscription, payload).catch((err) => {
          console.error('Push failed for a specific user, they may have revoked permissions:', err);
        })
      );
    });

    await Promise.all(pushPromises);
    
    res.status(200).json({ message: 'Push notifications dispatched successfully!' });
  } catch (error) {
    console.error('Error dispatching notifications:', error);
    res.status(500).json({ error: 'Failed to dispatch notifications.' });
  }
});

// const PORT = 5000;
// app.get('/', (req, res) => {
//   res.send('Healthcare Backend is Online! 🚀');
// });
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;