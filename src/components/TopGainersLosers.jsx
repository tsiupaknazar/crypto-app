import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAPI } from "../hooks/useAPI";

const TopGainersLosers = () => {
  const { data, loading, error } = useAPI("coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true");

  // if (loading) return <p className="text-center">Loading...</p>;

  // Sort by 24h % change
  const sorted = data.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  const topGainers = sorted.slice(0, 10);
  const topLosers = sorted.slice(-10).reverse();

  // console.log("Top Gainers:", topGainers);
  // console.log("Top Losers:", topLosers);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Gainers */}
      <div className="rounded-div p-4">
        <h2 className="text-2xl font-bold mb-4">📈 Top 10 Gainers (24h)</h2>
        <ul>
          {topGainers.map((coin) => (
            <Link to={`/coin/${coin.id}`} key={coin.name}>
              <li key={coin.id} className="flex justify-between py-2 border-b overflow-hidden">
                <span className="flex items-center">
                  <img
                    className="mr-4 w-8 rounded-full"
                    src={coin.image}
                    alt="/"
                  />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </span>
                <span className="font-semibold text-green-600">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Top Losers */}
      <div className="rounded-div p-4">
        <h2 className="text-2xl font-bold mb-4">📉 Top 10 Losers (24h)</h2>
        <ul>
          {topLosers.map((coin) => (
            <Link to={`/coin/${coin.id}`} key={coin.name}>
              <li key={coin.id} className="flex justify-between py-2 border-b overflow-hidden">
                <span className="flex items-center">
                  <img
                    className="mr-4 w-8 rounded-full"
                    src={coin.image}
                    alt="/"
                  />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </span>
                <span className="font-semibold text-red-600">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopGainersLosers;
