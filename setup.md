# SwaraSangam — Setup Guide

## Files in this project
```
lyrics-website/
├── index.html          ← Public website (visitors browse & read lyrics)
├── admin.html          ← Admin panel (you add/edit/delete songs)
├── firebase-config.js  ← Reference file (config is embedded in each HTML)
└── SETUP.md            ← This guide
```

---

## Step 1 — Create a Firebase project

1. Go to https://console.firebase.google.com
2. Click **"Add project"** → name it (e.g. `swarasangam`)
3. Disable Google Analytics if you don't need it → **Create project**

---

## Step 2 — Enable Firestore Database

1. In the left sidebar → **Build → Firestore Database**
2. Click **Create database** → choose **Production mode** → pick a region → **Enable**
3. Go to the **Rules** tab and replace the content with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /songs/{songId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Click **Publish**

---

## Step 3 — Enable Authentication

1. Left sidebar → **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in method** → click **Email/Password** → toggle **Enable** → Save
4. Go to the **Users** tab → **Add user**
   - Enter your admin email and a strong password
   - This is your login for the admin panel

---

## Step 4 — Get your Firebase config

1. Left sidebar → ⚙️ **Project settings** (gear icon)
2. Scroll down to **Your apps** → click **</>** (Web)
3. Register the app (any nickname) — you DON'T need Firebase Hosting
4. Copy the `firebaseConfig` object shown:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123...:web:abc..."
};
```

---

## Step 5 — Paste the config into both HTML files

Open `index.html` and `admin.html` in any text editor.

Find this block (near the bottom of each file):

```js
// ── PASTE YOUR FIREBASE CONFIG HERE ──
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  ...
};
```

Replace the placeholder values with your real values from Step 4.
Do this in **both** files.

---

## Step 6 — Open the site

You can run the site two ways:

### Option A — Just open the files
Double-click `index.html` in your file manager.
The public site opens in your browser immediately.
Open `admin.html` separately for the admin panel.

> ⚠️  Some browsers block Firebase requests from `file://` URLs.
> If you see errors, use Option B.

### Option B — Use VS Code Live Server (recommended)
1. Install VS Code → install the **Live Server** extension
2. Open the `lyrics-website` folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. Your site runs at `http://127.0.0.1:5500/index.html`
5. Admin panel: `http://127.0.0.1:5500/admin.html`

### Option C — Deploy to Firebase Hosting (go live on internet)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting      # choose your project, public dir = "."
firebase deploy
```
Your site will be live at `https://your-project.web.app`

---

## How to use the Admin Panel

1. Open `admin.html`
2. Sign in with the email/password you created in Step 3
3. Fill in the **Add Song** form:
   - Song title, Movie/Album name
   - Music director name
   - Singers (type a name → press Enter to add multiple)
   - Lyricist name
   - Select language (Tamil, Telugu, Kannada, Malayalam, Hindi, Other)
   - Paste the full lyrics
4. Click **Publish song**
5. Switch to **Manage Songs** tab to see all songs, edit, or delete them

The public `index.html` will show the new song immediately.

---

## Features summary

### Public site (index.html)
- Search by song title, movie, singer, lyricist, music director
- Filter by language (Tamil, Telugu, Kannada, Malayalam, Hindi)
- Click any card to read full lyrics with all credits
- Fully responsive (mobile + desktop)

### Admin panel (admin.html)
- Secure login — only you can access it
- Add new songs with all metadata
- Edit any existing song
- Delete songs (with confirmation dialog)
- Search and manage all songs in one place

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Permission denied" on Firestore | Check Firestore Rules (Step 2) |
| Can't sign in to admin | Make sure you created a user in Auth → Users (Step 3) |
| Songs don't appear on public site | Check that `projectId` is correct in both files |
| CORS error opening from file:// | Use VS Code Live Server (Option B above) |
