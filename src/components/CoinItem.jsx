import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

function useSavedCoin(coin, user) {
  const [savedCoin, setSavedCoin] = useState(false);
  const coinPath = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    const fetchWatchList = async () => {
      if (user?.email) {
        const docSnap = await getDoc(coinPath);
        const data = docSnap.data();
        setSavedCoin(data?.watchList?.some((item) => item.id === coin.id) || false);
      }
    };
    fetchWatchList();
  }, [user?.email, coin.id]);

  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          sparkline_7d: coin?.sparkline_in_7d.price,
        }),
      });
    } else {
      toast.info("Please sign in to save coins");
    }
  };

  const deleteCoin = async () => {
    if (user?.email) {
      setSavedCoin(false);
      await updateDoc(coinPath, {
        watchList: arrayRemove({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          sparkline_7d: coin?.sparkline_in_7d.price,
        }),
      });
      toast.info("Coin removed from watchlist");
    } else {
      toast.info("Please sign in to remove coins");
    }
  };

  return { savedCoin, saveCoin, deleteCoin };
}

const CoinItem = ({ coin }) => {
  const { user } = UserAuth();
  const { savedCoin, saveCoin, deleteCoin } = useSavedCoin(coin, user);

  const handleStarClick = () => {
    savedCoin ? deleteCoin() : saveCoin();
  };

  return (
    <>
      <tr className="h-[80px] border-b overflow-hidden">
        <td onClick={handleStarClick} className="cursor-pointer">
          {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
        </td>
        <td>{coin.market_cap_rank}</td>
        <td>
          <Link to={`/coin/${coin.id}`}>
            <span className="flex items-center">
              <img
                className="w-6 mr-2 rounded-full"
                src={coin.image}
                alt={coin.id}
              />
              <p className="hidden sm:table-cell">{coin.name}</p>
            </span>
          </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>${coin.current_price.toLocaleString()}</td>
        <td>
          {coin.price_change_percentage_24h > 0 ? (
            <p className="text-green-600">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className="text-red-600">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
        </td>
        <td className="w-[180px] hidden md:table-cell">
          ${coin.total_volume.toLocaleString()}
        </td>
        <td className="w-[180px] hidden sm:table-cell">
          ${coin.market_cap.toLocaleString()}
        </td>
        <td>
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color="teal" />
          </Sparklines>
        </td>
      </tr>
      <ToastContainer />
    </>
  );
};

export default CoinItem;