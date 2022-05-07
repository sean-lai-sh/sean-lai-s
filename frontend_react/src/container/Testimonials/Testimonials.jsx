import React, {useState,useEffect} from 'react'
import { AppWrap, motionWrap } from '../../wrapper'
import { urlFor,client } from '../../client'
import { animate, motion } from 'framer-motion'

import ReactTooltip, {reactToolTip} from 'react-tooltip'
import{HiChevronLeft,HiChevronRight} from 'react-icons/hi'
import './Testimonials.scss'
const Testimonials = () => {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const HandleClick = ( index) => {
    setCurrentIndex(index);
  }




  useEffect(()=>{
    const query = `*[_type == "testimonials"]` 
    const query2 = `*[_type == "brands"]`;
    
    client.fetch(query)
    .then(
      (data)=>{
      setTestimonials(data);
      })
    client.fetch(query2)
    .then(
      (data)=>{
      setBrands(data);
      })
  },[]);
  const recommend = testimonials[currentIndex]
  return (
    <>
      {testimonials.length > 0 && (
        <>
          <div className='app__testimonials-item app__flex'>
            <img src={urlFor(recommend.imgurl)} alt={recommend.name}/>
            <div className='app__testimonials-content'>
              <p className='p-text'>{recommend.feedback}</p>
              <div>
                <h4 className='bold-text'>{recommend.name}</h4>
                <h5 className='p-text'>{recommend.company}</h5>
              </div>
            </div>
          </div>
          <div className='app__testimonials-btns app__flex'>
            <div className='app__flex' onClick={()=> HandleClick(currentIndex=== 0 ? testimonials.length -1 :currentIndex-1)}>
              <HiChevronLeft/>
            </div>
            <div className='app__flex' onClick={()=> HandleClick(currentIndex=== testimonials.length -1 ? 0 :currentIndex+1)}>
              <HiChevronRight/>
            </div>
          </div>
        </>

      )}
      <div className='app__testimonials-brands app__flex'>
        { brands.map((brand) => {
        
        return(<motion.div
          whileInView={{opacity:[0,1]}}
          transition={{duration:0.5, type :'tween'}}
          key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name}/>
        </motion.div>)})}
      </div>
    </>
  )
}

export default AppWrap(motionWrap(Testimonials,'app__testimonials'),'testimonials','app__primarybg')