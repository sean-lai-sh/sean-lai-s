import React , { useState,useEffect} from 'react'

import { AppWrap, motionWrap } from '../../wrapper'
import { urlFor,client } from '../../client'
import { animate, motion } from 'framer-motion'
import ReactTooltip, {reactToolTip} from 'react-tooltip'
import './Skills.scss'
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  useEffect(()=>{
    const query = `*[_type == "experiences"]` 
    const query2 = `*[_type == "skills"]`;
    
    client.fetch(query)
    .then(
      (data)=>{
      setExperiences(data);
      })
    client.fetch(query2)
    .then(
      (data)=>{
      setSkills(data);
      })
  },[]);
  return (
    <>
      <h2 className='head-text'>Skills and Internships</h2>  
      <div className='app__skills-container'>
      <motion.div className='app__skills-list'>
        {skills?.map(
          (skill) => {
            return(
              <motion.div
                whileInView={{opacity:[0,1]}}
                transition={{duration:0.5}}
                className="app__skills-item app__flex"
                key={skill.name}
                data-tip
                data-for={skill.name}
              >
                <div className='app__flex' style={{backgroundColor:skill.bgColor}}>
                  <img src={urlFor(skill.icon)} alt={skill.name}/>
                </div>
                <p className='p-text'>{skill.name}</p>
                <ReactTooltip
                id={skill.name}
                arrowColor='#1b1b1b'
                    className='skills-tooltip' >
                  I feel Comfortable
                </ReactTooltip>
              </motion.div>
            )
          }

        )}
        
      </motion.div>
      <motion.div className='app__skills-exp'>
        {experiences.map((workYear) => {
          return(
            <motion.div
            className='app__skills-exp-item'
            key={workYear.year}
            >
              <div className='app__skills-exp-year'>
                <p className='bold-text'>{workYear.year}</p>
              </div>

              <motion.div className='app__skills-exp-works'>
                {workYear.works.map((work) => {
                 return(
                <>
                  <motion.div
                  whileInView={{opacity:[0,1]}}
                  transition={{duration:0.5}}
                  className="app__skills-exp-work app__flex"
                  data-tip
                  data-for={work.name}
                  key={work.name}
                  >
                    <h4 className='bold-text'>{work.name}</h4>
                    <p className='p-text'>{work.company}</p>

                  </motion.div>
                  <ReactTooltip
                    id={work.name}
                    arrowColor='#1b1b1b'
                    className='skills-tooltip'              
                  >
                    {work.desc}
                  </ReactTooltip>
                </>
                )})}
              </motion.div>
            </motion.div>
          )
         })}
       
        </motion.div> 
        </div>  
    </>
  )
}

export default AppWrap(motionWrap(Skills,'app__skills'),'skills');