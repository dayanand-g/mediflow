// Listen for incoming push messages
self.addEventListener('push', function(event) {
  // Check if the push has a payload payload
  const payload = event.data ? event.data.text() : 'You have a new notification!';
  
  let title = "Healthcare App Alert";
  let body = payload;
  
  try {
    const data = JSON.parse(payload);
    title = data.title;
    body = data.body;
  } catch (e) {
    // It was just a plain string
  }

  const options = {
    body: body,
    icon: '/vite.svg', // Icon for the notification
    badge: '/vite.svg', // Badge for the notification
  };

  // Tell the browser to wait until the notification is shown
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification banner

  // Focus an existing tab or open a new one to the patient page
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a tab is already open, focus it and navigate to /patient
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // If no tab is open, open a new one to the patient page
      if (clients.openWindow) {
        return clients.openWindow('/patient');

      }
    })
  );
});