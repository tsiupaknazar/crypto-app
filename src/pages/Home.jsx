import React from 'react'
import CoinSearch from '../components/CoinSearch'
import Trending from '../components/Trending'
import TopGainersLosers from '../components/TopGainersLosers'

const Home = ({coins}) => {
  return (
    <div>
      <CoinSearch coins={coins} />
      <Trending />
      <TopGainersLosers />
    </div>
  )
}

export default Home