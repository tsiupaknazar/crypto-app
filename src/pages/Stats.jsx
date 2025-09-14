import React from 'react'

import Trending from "../components/market/Trending";
import TopGainersLosers from '../components/market/TopGainersLosers';

const Stats = () => {
    return (
        <div className='max-w-[1140px] mx-auto'>
            <Trending />
            <TopGainersLosers />
        </div>
    );
}

export default Stats