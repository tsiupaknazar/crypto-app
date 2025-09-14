import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";

import Navbar from "./components/Navbar";

import { AuthContextProvider } from "./context/AuthContext";

import store from "./store";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Account from "./pages/Account";
import CoinPage from "./pages/CoinPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPassword from "./pages/ResetPassword";
import NewsPage from "./pages/NewsPage";
import Stats from "./pages/Stats";

import { useAPI } from "./hooks/useAPI";

function App() {
  const { data, loading, error } = useAPI("coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true");

  // if (loading) return <p>Loading...</p>;
  // if (error) alert(`Error: ${error.message}`);

  const connection = navigator.onLine;

  return (
    <Provider store={store}>
      <AuthContextProvider>
        {loading === false && connection === true ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home coins={data} />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/crypto-news" element={<NewsPage />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/coin/:coinId" element={<CoinPage />}>
                <Route path=":coinId" />
              </Route>
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* <Footer /> */}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center translate-y-[250%]">
            <CirclesWithBar color="#2b6cb0" />
          </div>
        )}
      </AuthContextProvider>
      <ToastContainer />
    </Provider>
  );
}

export default App;
