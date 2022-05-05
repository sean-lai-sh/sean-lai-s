import React , { useState,useEffect} from 'react'
import  './Work.scss'
import {AiFillEye, AiFillGithub} from 'react-icons/ai'
import { AppWrap } from '../../wrapper'
import { urlFor,client } from '../../client'
import { motion } from 'framer-motion'

const Work = () => {
  const [animateCard, setAnimateCard] = useState({y:0 , opacity:1})
  const [activeFilter,setActiveFilter] = useState('All');
  const [works,setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  useEffect(()=>{
    const query = `*[_types == "works"]`;
    client.fetch(query).then((data)=>{
      setWorks(data);
      setFilterWork(data);
    }
      
    
  ,[])
  })
  const handleWorkFilter = (item) => {

  }
  return (
    <>
      <h2 className='head-text'>Projects</h2>
      <div className='app__work-filter'>
        {['all','web','mobile','desktop'].map((item,index)=>(
          <div key={item + index} onClick={()=> handleWorkFilter(item)}
          
          className ={`app__work-filter-item p-text app__flex ${activeFilter === item ? 'item-active':''}`} >
            
          </div>

        ))}

      </div>
      <motion.div
      animate = {animateCard}
      transition={{duration:0.5,delayChildren:0.5}}
      className="app__work-portfolio"
      >
        {filterWork.map((work,index)=>(
        <div className='app__work-item app__flex' key={work + index}>
          <div className='app__work-img app__flex'>
            <img src={urlFor(work.imgUrl)} alt={work.name}/>
          </div>
          <motion.div
          whileHover={{opacity:[0,1]}}
          transition={{duration:0.25 ,ease:'easeInOut' , staggerChildren:0.5}}
          className='app__work-hover app__flex'>
          <a href={work.projectLink} target="_blank" rel="noreferrer">
            <motion.div
            whileHover={{scale:[1,0.9]}}
              whileInView={{scale:[0,1]}}
              transition={{duration:0.25}}
              className='app__flex'>
            <AiFillEye/>
          </motion.div>
          </a>
            <a href={work.projectLink} target="_blank" rel="noreferrer">
              <motion.div
                  whileHover={{scale:[1,0.9]}}
                  whileInView={{scale:[0,1]}}
                  transition={{duration:0.25}}
                  className='app__flex'>
                <AiFillGithub/>
              </motion.div>
            </a>
          </motion.div>
          <div className='app__work-content app__flex'>
            <h4 className='bold-text'>{work.title}</h4>
            <p className='p-text' style={{marginTop:10}}>{work.description}</p>
            <div className='app__work-tag app__flex'>
              <p className='p-text'>{work.tags[0]}</p>

            </div>
          </div>
        </div>))}

      </motion.div>
    </>
  )
}

export default AppWrap(Work,'work');