import './About.css'
import  video from '../../content/about.mp4'
import { Link } from 'react-router-dom';
import { AboutFirst } from './aboutFirst/AboutFirst';
import { Testimonials } from './testimonials/Testimonials';
import { Nav } from '../nav/Nav';
import { Footer } from '../footer/Footer';


function About() {
    return (
      <div className='Home'>
        <Nav></Nav>
        <div className="Header">
        <video style={{filter:"brightness(50%)",width:"100%",position:"fixed"}} src={video} autoPlay loop muted/>
        <div className="Header1">
            <h2 data-aos="fade-up">Discover the Future of Technology with</h2>
            <h1 data-aos="zoom-in">GalaxyTech</h1>
            <Link data-aos="fade-up" to="/shop" className="box11">SHOP NOW</Link>
            <a href="#2" className="btn23">
    <div className="scroll"> </div>
</a>
        </div>
        </div>
        
        <AboutFirst></AboutFirst>
        <Footer></Footer>
        </div>
    );
  }
  
  export default About;