import React,{useState} from 'react' 
import { images } from '../../constants'
import { AppWrap,motionWrap } from '../../wrapper'
import './Footer.scss'
import { motion, animate, useAnimation } from 'framer-motion'
import { client } from '../../client'
import { HiX } from 'react-icons/hi'
const Footer = () => {
  const [formData, setFormData] = useState({name:'',email:'',message:''})
  const [isFormsubmitted, setIsFormsubmitted] = useState(false)
  const [loading, setLoading] = useState(false);
  const errors = useAnimation();
  const forms = useAnimation();
  const{name,email,message} = formData
  const handleChangeInput = ( e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

  }
  const handleSubmit = () => {
    setLoading(true)
    if(validateMessage(formData)){
    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }
    client.create(contact).then(() => {
      setLoading(false)
      
      setTimeout( () => {
       forms.start(
          {
            scale: [1,0,0,1],

            transition: {
              duration: 2,
              ease: 'easeInOut',
              staggerChildren: 0.25
            }
          }
        ) 
      }, 2000)
      
      setIsFormsubmitted(true)
    });
  }else{
    setLoading(false)
    errors.stop()
    errors.start(
      {
        opacity:[0,1],
        scale:[0,1.1],
        y:[-100,0],
        transition:{
          duration:0.5,
          ease:'easeInOut',
        }
      }
    )
  }
  }
  const handleError = () => {
    errors.stop()
    errors.start(
      {
        opacity:[1,0],
        scale:[1.1,0],
        y:[0,-100],
        transition:{
          duration:0.5,
          ease:'easeInOut',
        }
      }
    )
  }
  return (
    <>
      <h2 className='head-text'>Lets Meet</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email'/>
          <a href='mailto:seanlai221@gmail.com' className='p-text'>Test Email</a>
        </div>
      </div>
    {
      !isFormsubmitted ? <motion.div className='app__flex app__footer-form'
      animate={forms}>
        <div className='app__flex'>
          <input value={name} className='p-text' type='text' placeholder='Your Name ( John Doe )' name='name' onChange={handleChangeInput}/>
        </div>
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Email ( johndoe@example.com )' name='email' value={email} onChange={handleChangeInput}/>
        </div>
        <div>
          <textarea className='p-text' placeholder='Your Message' value={message} name='message' onChange={handleChangeInput}          />
        </div>
        <button type='button' className='p-text' onClick={handleSubmit}>
          {loading? 'Sending...' : 'Send message'}
        </button>
      </motion.div> : <div>
        <h3 className='bold-text'>Sucess! Thanks for getting in touch.</h3>
      </div>
    }
    <motion.div className='app__error-message app__flex'
      whileInView={{opacity:0}}
      transition={{duration:0.3, ease:'easeInOut'}}
      whileHover={{scale : [1,1.1]}}
      animate = {errors}
    >
      <h3 className='bold-text'>Fields are invalid</h3>
      <div onClick={handleError}>
        <HiX/>
      </div>
      </motion.div>
      

    </>
  )
}
function validateMessage({name,email,message}) {
  //use regex to check email is valid and that message and name isnt empty
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!name || !email || !message || !emailRegex.test(email)){
    return false
  }
  return true

}
export default AppWrap(motionWrap(Footer,'app__footer'),'contact','app__primarybg')