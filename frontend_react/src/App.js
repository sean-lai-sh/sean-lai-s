import React from 'react'
import {About, Footer, Header, Skills, Testimonials, Work} from './container'
import {Navbar} from './components'
import './App.scss'
const App = () => {
  return (
    <div className='app'>
        <Navbar/>
        <Header />
        <About />
        <Work />
        <Skills />
        <Testimonials />
        <Footer /> 
    </div>
  )
}
// SPA - Single Page Application Organization folder
export default App