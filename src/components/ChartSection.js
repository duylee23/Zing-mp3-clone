import React, {memo, useState, useEffect,useRef} from 'react'
import bg from '../assets/bg.jpg'
import { Line} from 'react-chartjs-2'
import { Chart,  registerables} from 'chart.js'
import { useSelector } from 'react-redux'
import {SongItem} from './'
import _ from 'lodash'

export const ChartSection = () => {
    const [data, setData] = useState(null)
    const {chart, rank} = useSelector(state => state.app)
    const chartRef = useRef()
    const [selected, setSelected] = useState(null)
    const selectedRankItem = Array.isArray(rank)
    ? rank.find(i => i.encodeId === selected)
    : null;
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    })
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if(chart?.items){
            for(let i = 0; i < 3; i++ ){
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050', 
                    tension : 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 5,
                    pointHitRadius: 5,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050', 
                    animation: false,
                    pointHoverBorderWidth: 5
                })
            }
            setData({labels, datasets})
        }
        console.log(datasets)
    }, [chart])
    
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        aspectRatio: 4,
        scales: {
            y: {
                ticks: { display: false },
                grid: {color: 'rgba(255,255,255,0.1', drawTicks: false} ,
                min: chart?.minScore,
                max: chart?.maxScore,
                border:{dash: [3,4]}
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external:({tooltip}) => {
                    if(!chartRef || !chartRef.current) return 
                    if(tooltip.opacity === 0 ){
                        if(tooltipState.opacity !== 0 ) setTooltipState(prev => ({...prev,opacity: 0}))
                        return
                    }
                    const counters = []
                    for(let i = 0;i < 3; i++){
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                            encodeid: Object.keys(chart?.items)[i] 

                        })
                    }
                    const result = counters.find(i => i.data.some(n => n=== +tooltip.body[0]?.lines[0]?.replace(',', '')))
                    setSelected(result.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if(!_.isEqual(tooltip,newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    };
    Chart.register(...registerables);
    return (
        <div className='px-[60px] mt-12 relative'>
            <img src='https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltc6b8d1b17359093d/6543eb10195164001b5ba96e/RG_REMIX-RUMBLE_GAMEPLAY-OVERVIEW-ARTICLE_BANNER-IMAGE_1920X1080.jpg'
                 className='w-full object-cover rounded-md max-h-[430px]'></img>
            <div className='absolute top-0 left-[60px] right-[60px] bottom-0 bg-[rgba(48,138,134,0.9)] '></div>
        
            <div className='absolute top-0 left-[60px] right-[60px] bottom-0 p-5 flex flex-col gap-8' >
                <h3 className='text-2xl font-bold text-white'>
                    #zingchart
                </h3>
                <div className='flex gap-4 h-full'> 
                    <div className='flex flex-col flex-3 '>
                    {Array.isArray(rank) && rank.length > 0 && rank.filter((i,index) => index < 3)?.map((item,index) => (
                            <div className='flex items-center'>
                                    <SongItem
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    key={item.encodeId} 
                                    order = {index + 1}
                                    percent={Math.round(item.score * 100/ chart?.totalScore)}
                                    />
                            </div>
                        ))}

                    </div>
                    <div className='flex-7 h-[90%] relative'> 
                        {data && <Line data={data} ref={chartRef} options={options}  />}
                        <div className='tooltip' style={{top: tooltipState.top, left: tooltipState.left, opacity:tooltipState.opacity, position: 'absolute'}}>
                            <SongItem
        thumbnail={selectedRankItem?.thumbnail}
        title={selectedRankItem?.title}
        artists={selectedRankItem?.artistsNames}
        key={selectedRankItem?.encodeId}
    />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
export default memo(ChartSection)
