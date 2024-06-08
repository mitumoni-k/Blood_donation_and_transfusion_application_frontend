
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

    const notificationTitle = 'Blood-Hero';
    const notificationOptions = {
      body: payload.notification.body,
      icon: './appLogo.jpg',
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // CLosing the notification when clicked
  const urlToOpen = event?.notification?.data?.url || process.env.LOCALHOST_URL;
  // Open the URL in the default browser.
  event.waitUntil(
    clients.matchAll({
      type: 'window',
    })
    .then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window/tab with the target URL
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});