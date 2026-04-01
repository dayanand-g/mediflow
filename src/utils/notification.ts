const PUBLIC_VAPID_KEY = 'BFIkEdGuRbguZupv35dSdiXkqB8Ae6MZXGRnQPo6hmOwsTOCfIE7LsW0IAqxuNPCmlQu4zngMBefBkGkToakuKw'; 

export const subscribeToNotifications = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const registration = await navigator.serviceWorker.ready;

    // Ask the browser for the subscription object using your Public Key
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PUBLIC_VAPID_KEY 
    });

    // Send it to the Backend to be saved
    await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    console.log("Successfully subscribed and saved to backend!");

  } catch (error) {
    console.error("Error subscribing: ", error);
  }
};