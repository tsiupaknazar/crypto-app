import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext"
import Home from "./routes/Home";
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Account from './routes/Account'
import CoinPage from "./routes/CoinPage"
import Footer from "./components/Footer";

import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { CirclesWithBar } from "react-loader-spinner";

function App() {
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins([...coins, ...response.data]);
    });

    preload();
  }, [url])

  const preload = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }

  const loadMore = () => {
    setPage(page => page + 1);
  }

  return (
    <ThemeProvider>
      <AuthContextProvider>
        {loading ?
          <div className="flex items-center justify-center m-[20%]">
            <CirclesWithBar
              height="100"
              width="100"
              color="#2b6cb0"
              visible={true}
              outerCircleColor=""
              innerCircleColor=""
              barColor=""
              ariaLabel='circles-with-bar-loading'
            />
          </div> : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home coins={coins} loadMore={loadMore}/>} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/account" element={<Account />} />
                <Route path="/coin/:coinId" element={<CoinPage />}>
                  <Route path=":coinId" />
                </Route>
              </Routes>
              <Footer />
            </>
          )}
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
