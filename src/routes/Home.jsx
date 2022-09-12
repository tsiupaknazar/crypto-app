import React from 'react'
import CoinSearch from '../components/CoinSearch'
import TrendingCoins from '../components/TrendingCoins'

const Home = ({coins, loadMore}) => {
  
  return (
    <div>
      <CoinSearch coins={coins} loadMore={loadMore}/>
      <TrendingCoins />
    </div>
  )
}

export default Home