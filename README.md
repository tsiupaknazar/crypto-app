# Crypto App

A modern React application for tracking cryptocurrency prices, news, and personal watchlists.  
Built with Firebase authentication, Firestore, CoinGecko API, and responsive UI using Tailwind CSS.

---

## Features

- 🔍 **Search & Filter:** Find coins by name or symbol.
- 📈 **Market Stats:** View top gainers, losers, and trending coins.
- 📰 **Crypto News:** Latest news from NewsData.io.
- ⭐ **Watchlist:** Save and manage your favorite coins.
- 👤 **Authentication:** Email/password, Google, GitHub, and Facebook sign-in.
- 🌗 **Theme Toggle:** Switch between dark and light modes.
- 🛡️ **Secure:** User data stored in Firestore.
- ⚡ **Responsive:** Works on desktop and mobile.

---

## Folder Structure

```
src/
  assets/           # Images and static assets
  components/       # Reusable UI components
  context/          # React context (Auth)
  helpers/          # Helper functions
  hooks/            # Custom React hooks
  pages/            # Route-level components
  store/            # Redux slices and store
  firebase.js       # Firebase config
  index.css         # Tailwind and global styles
  index.jsx         # App entry point
  App.jsx           # Main app component
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tsiupaknazar/crypto-app.git
cd crypto-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root with your API keys:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_NEWS_API_KEY=
```

### 4. Start the development server

```bash
npm run dev
```

---

## Usage

- **Sign Up / Sign In:** Create an account or log in with Google, GitHub, or Facebook.
- **Search Coins:** Use the search bar to filter coins.
- **Add to Watchlist:** Click the star icon to save coins.
- **View News:** Go to the News page for latest crypto updates.
- **Change Theme:** Use the theme toggle in the navbar.

---

## Technologies

- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [NewsData.io](https://newsdata.io/)

---

## Acknowledgements

- [CoinGecko](https://www.coingecko.com/en/api) for free crypto data
- [NewsData.io](https://newsdata.io/) for news API
- [Firebase](https://firebase.google.com/) for authentication and database

---