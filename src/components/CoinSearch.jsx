import React, { useState } from 'react'
import CoinItem from './CoinItem';

const CoinSearch = ({ coins, loadMore }) => {
  const [searchText, setSearchText] = useState('');


  return (
    <div className='rounded-div my-4'>
      <div className='flex flex-column md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
        <form>
          <input
            className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder='Search a coin...'
          />
        </form>
      </div>

      <table className='w-full border-collapse text-center'>
        <thead>
          <tr className='border-b'>
            <th></th>
            <th className='px-4'>#</th>
            <th className='text-left'>Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className='hidden md:table-cell'>24h Volume</th>
            <th className='hidden sm:table-cell'>Mkt</th>
          </tr>
        </thead>
        <tbody>
          {coins.filter((value) => {
            if (searchText === '') {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return value;
            }
          }).map((coin, idx) => (
            <CoinItem coin={coin} key={idx} />
          ))}
        </tbody>
      </table>
      <div className='p-4 m-auto text-center'>
        <button className="text-primary font-bold text-lg hover:text-accent" onClick={loadMore}>Load more</button>
      </div>
    </div>
  )
}

export default CoinSearch