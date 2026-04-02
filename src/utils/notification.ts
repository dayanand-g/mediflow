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
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    }); 

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    console.log("Actually successfully subscribed!");

  } catch (error) {
    console.error("Error subscribing: ", error);
  }
};