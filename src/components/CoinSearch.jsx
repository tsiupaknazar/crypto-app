import React, { useState } from 'react';
import CoinItem from './CoinItem';

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState('');
  const [itemsToShow, setItemsToShow] = useState(10);
  const [itemsPerLoad, setItemsPerLoad] = useState(10);

  const handleLoadMore = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerLoad);
  };

  const filteredCoins = coins.filter((value) => {
    if (searchText === '') {
      return value;
    } else if (
      value.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return value;
    }
  });

  return (
    <div className='rounded-div my-4'>
      <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl'
            type='text'
            placeholder='Search a coin'
          />
        </form>
      </div>

      <table className='w-full border-collapse text-center'>
        <thead>
          <tr className='border-b'>
            <th></th>
            <th className='px-4'>#</th>
            <th className='text-left'>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h</th>
            <th className='hidden md:table-cell'>24h Volume</th>
            <th className='hidden sm:table-cell'>Mkt</th>
            <th>7 Days</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-8 text-center text-lg text-[var(--color-text-secondary)]">
                No results found
              </td>
            </tr>
          ) : (
            filteredCoins
              .slice(0, itemsToShow)
              .map((coin) => (
                <CoinItem key={coin.id} coin={coin} />
              ))
          )}
        </tbody>
      </table>
      {itemsToShow < filteredCoins.length && filteredCoins.length >= 10 && (
        <div className='text-center p-4'>
          <button
            className='bg-primary text-primary py-2 px-4 rounded-2xl shadow-xl'
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CoinSearch;
