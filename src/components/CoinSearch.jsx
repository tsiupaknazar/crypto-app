import React, { useState } from 'react';
import CoinItem from './CoinItem';

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState('');
  const [itemsToShow, setItemsToShow] = useState(10); 
  const [itemsPerLoad, setItemsPerLoad] = useState(10); 

  const handleLoadMore = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerLoad);
  };

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
        </thead>
        <tbody>
          {coins
            .filter((value) => {
              if (searchText === '') {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              }
            })
            .slice(0, itemsToShow) 
            .map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
      {itemsToShow < coins.length && (
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
