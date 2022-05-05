import React from 'react'
import {BsInstagram} from 'react-icons/bs'
import {FaLinkedin,FaFacebookF,FaDiscord} from 'react-icons/fa'
const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
            <BsInstagram color="black"/>    
        </div>  
        <div>
            <FaDiscord color="black" />    
        </div> 
        <div>
            <FaFacebookF color="black"/>    
        </div> 
        <div>
            <FaLinkedin color="black" />    
        </div>  
        
    </div>
  )
}

export default SocialMedia