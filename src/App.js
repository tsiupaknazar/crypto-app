import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Home from './routes/Home';
import Signin from './routes/SignIn';
import Signup from './routes/SignUp';
import Account from './routes/Account';
import axios from 'axios';
import CoinPage from './routes/CoinPage';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';
import NotFoundPage from './routes/NotFoundPage';
import ResetPassword from './routes/ResetPassword';
import { CirclesWithBar } from 'react-loader-spinner';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const connection = navigator.onLine;

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true';

  useEffect(() => {
    console.log(loading);
    axios.get(url).then((response) => {
      try {
        setCoins(response.data);
      } catch (error) {
        console.log(error);
      }
    });
    setLoading(false);
  }, [url]);
  console.log(loading);
  return (
    <ThemeProvider>
      <AuthContextProvider>
        {loading === false && connection === true ? (
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home coins={coins} />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/account' element={<Account />} />
              <Route path='/coin/:coinId' element={<CoinPage />}>
                <Route path=':coinId' />
              </Route>
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </>
        )
          :
          <div className='w-full h-full flex items-center justify-center translate-y-[250%]'>
            <CirclesWithBar color="#2b6cb0" />
          </div>
        }
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;