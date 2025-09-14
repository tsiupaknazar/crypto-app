import React from 'react'

import Trending from "../components/Trending";
import TopGainersLosers from '../components/TopGainersLosers';

const Stats = () => {
    return (
        <div className='max-w-[1140px] mx-auto'>
            <Trending />
            <TopGainersLosers />
        </div>
    );
}

export default Stats