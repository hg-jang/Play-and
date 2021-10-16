import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from './fbase-admin.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: "https://play-and-6db77.firebaseio.com",
  });
}

export { firebaseAdmin };