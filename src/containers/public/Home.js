import React from 'react'
import { Header, Slider, Section, NewRelease, ChartSection } from '../../components'
import * as apis from '../../apis'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Home = () => {

  const {chill,life_loving,remix,moody,popular_artist, top_100, album_hot, week_chart} = useSelector(state => state.app)
  return (
    <div className='flex flex-col  mb-[400px]'>   
      <Slider/>
      <NewRelease/>
      <Section data={chill}/>
      <Section data={life_loving}/>
      <Section data={remix}/>
      <Section data={moody}/>
      <ChartSection/>
      <Section data={popular_artist}/>
      <Section data={top_100}/>
      <Section data={album_hot}/>
      <div className='mt-12 px-[60px] flex gap-5 '>
        {Array.isArray(week_chart) && week_chart?.map(item => (
          <Link to={item?.link?.split('.')[0]} key={item.link}>
              <img src={item.cover} className='rounded-md'></img>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Home