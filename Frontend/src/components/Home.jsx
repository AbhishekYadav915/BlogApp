import React from 'react'
import Hero from '../../src/Home/Hero.jsx'
import Trending from '../../src/Home/Trending.jsx'
import Devotional from '../../src/Home/Devotional.jsx'
import Creator from '../../src/Home/Creator.jsx'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Trending/>
      <Devotional/>
      <Creator/>
    </div>
  )
}

export default Home