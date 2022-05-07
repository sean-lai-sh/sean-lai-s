import React from 'react'
import './Header.scss'
import {images} from '../../constants'
import { motion } from 'framer-motion'
import {AppWrap, motionWrap} from '../../wrapper'
const scaleVariants = {
  whileInView:{
    scale:[0,1],
    opacity:[0,1],
    transition:{
      duration:1,
      ease:'easeInOut'
    }
  }
}

const Header = () => {
  return (
    <div className='app__header app__flex'>
      <motion.div 
      className='app__header-info'
      whileInView={{x:[-100,0],opacity:[0,1]}}
      transition={{duration:.5}}
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span></span>
            <div className="app__header-details">
            <p className='p-text'>Hello, I am</p>
            <h1 className='head-text'>Sean Lai</h1></div>
          </div>
          <div className='tag-cmp app__flex'>
            <p className='p-text'>Singapore American School</p>
            <p className='p-text'>Class of 2023</p>
          </div>


        </div>

      </motion.div>
      <motion.div
      className='app__header-img'
      whileInView={{opacity:[0,1]}}
      transition={{duration:.5,delayChildren:0.5}}>
        <img src={images.profile} alt="profile.bg"/>
        <motion.img
        whileInView={{scale:[0,1]}}
        transition={{duration:.5,ease:'easeInOut'}}
        src={images.circle}
        alt="profile circle"
        className='overlay_circle'
        >
          
        </motion.img>
      </motion.div>

      <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className='app__header-circles'
      >
        {[images.python,images.csharp,images.react].map(
            (circle,index)=>
            (
            <div className='circle-cmp app__flex' key={`circle-${index}`}>
              <img src={circle} alt="circle"/>

            </div>)
          )}
      </motion.div>
    </div>
  )
}

export default AppWrap(motionWrap(Header,'app__header'),'home',"");