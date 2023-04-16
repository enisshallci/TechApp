import { Link } from "react-router-dom";
import video from "../../content/video1.mp4"
import './Home.css'
import { Offers } from "./offers/Offers";
import { StoreInfo } from "./storeInfo/StoreInfo";
import { SubsnSocials } from "./subsnSocials/SubsnSocials";
import { TopSellers } from "./topSellers/TopSellers";
function Home() {
    return (
      <div className="Home">
        <div className="Header">
        <video style={{filter:"brightness(50%)",width:"100%",position:"fixed"}} src={video} autoPlay loop muted/>
        <div className="Header1">
            <h1 data-aos="zoom-in">Shop the Latest Tech</h1>
            <h2 data-aos="fade-up">Discover Cutting-Edge Electronics and Gadgets at Our Tech Store</h2>
            <Link data-aos="fade-up" to="/shop" className="box">SHOP NOW</Link>
            <a href="#2" className="btn">
    <div className="scroll"> </div>
</a>
        </div>
        </div>
        <StoreInfo></StoreInfo>
        <Offers></Offers>
        <TopSellers></TopSellers>
        <SubsnSocials></SubsnSocials>
      </div>
    );
  }
  
  export default Home;