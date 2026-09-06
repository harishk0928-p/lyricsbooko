// ============================================================
//  FIREBASE CONFIGURATION — edit these values with your own
//  from https://console.firebase.google.com → Project Settings
// ============================================================
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ============================================================
//  HOW TO GET THESE VALUES:
//  1. Go to https://console.firebase.google.com
//  2. Create a new project (e.g. "my-lyrics-site")
//  3. Click "Add app" → Web (</>)
//  4. Copy the firebaseConfig object and paste above
//  5. In Firestore → Rules, paste:
//
//     rules_version = '2';
//     service cloud.firestore {
//       match /databases/{database}/documents {
//         match /songs/{songId} {
//           allow read: if true;
//           allow write: if request.auth != null;
//         }
//       }
//     }
//
//  6. In Authentication → Sign-in method → Enable Email/Password
//  7. In Authentication → Users → Add user (your admin email + password)
// ============================================================
