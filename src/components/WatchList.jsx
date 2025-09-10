import { useState, useEffect } from "react";
import { List, Grid, X } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function WatchList() {
  const [coins, setCoins] = useState([]);
  const [view, setView] = useLocalStorage("watchlist-view", "table");
  const { user } = UserAuth();

  useEffect(() => {
    if (!user?.email) return;
    const unsub = onSnapshot(doc(db, "users", `${user?.email}`), (docSnap) => {
      setCoins(docSnap.data()?.watchList || []);
    });
    return () => unsub();
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user?.email}`);

  const deleteCoin = async (id) => {
    try {
      const result = coins.filter((item) => item.id !== id);
      await updateDoc(coinPath, { watchList: result });
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(coins);

  return (
    <div className="p-6 bg-primary rounded-div min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Watchlist</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-xl ${view === "table" ? "bg-slate-700" : "bg-slate-800"
              }`}
          >
            <List className="text-primary" size={20} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-xl ${view === "grid" ? "bg-slate-700" : "bg-slate-800"
              }`}
          >
            <Grid size={20} />
          </button>
        </div>
      </div>

      {/* Empty state */}
      {coins.length === 0 && (
        <p className="text-slate-400 text-center">
          Your watchlist is empty. Add some coins to track them here.
        </p>
      )}

      {/* Table View */}
      {view === "table" && coins.length > 0 && (
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-slate-400 text-sm">
              <th className="text-left">Coin Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">24h Change</th>
              <th className="text-right"></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="bg-secondary hover:bg-primary transition rounded-xl"
              >
                <td className="p-3 flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span className="font-semibold text-primary">{coin.name}</span>
                  <span className="text-secondary text-sm">
                    ({coin.symbol.toUpperCase()})
                  </span>
                </td>
                <td className="p-3 text-right font-medium text-primary">
                  ${coin.current_price}
                </td>
                <td
                  className={`p-3 text-right font-medium ${coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteCoin(coin.id)}
                    className="text-secondary hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Grid View */}
      {view === "grid" && coins.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="rounded-2xl bg-secondary p-4 hover:bg-primary transition relative"
            >
              {/* Remove button */}
              <button
                onClick={() => deleteCoin(coin.id)}
                className="absolute top-2 right-2 text-secondary hover:text-red-400"
              >
                <X size={18} />
              </button>

              {/* Coin info */}
              <div className="flex items-center gap-3 mb-2">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <h2 className="font-bold text-primary">{coin.name}</h2>
                  <p className="text-secondary text-sm">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Price + Change */}
              <div className="flex justify-between items-center">
                <p className="text-lg text-primary font-semibold">
                  ${coin.current_price?.toFixed(2)}
                </p>
                <p
                  className={`font-medium ${coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>

              {/* Sparkline placeholder */}
              <div className="mt-3 h-10 bg-primary rounded-md flex items-center justify-center text-xs text-secondary">
                <Sparklines data={coin.sparkline_7d} width={100} height={20} margin={5}>
                  <SparklinesLine
                    color="teal"
                    style={{ fill: "none", strokeWidth: 1 }}
                  />
                  <SparklinesSpots size={2} style={{ fill: "teal" }} />
                </Sparklines>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
