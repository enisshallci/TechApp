import { Link } from 'react-router-dom'
import './TopSellers.css'
import { useState } from 'react'

export const TopSellers = ()=>{
    const [display1, setDisplay1] = useState('none');
    const [display2, setDisplay2] = useState('none');
    const [display3, setDisplay3] = useState('none');

    const DisplayFlexHandler1 =()=>{
        setDisplay1("flex");
    }
    const DisplayNoneHandler1 =()=>{
        setDisplay1("none");
    }
    const DisplayFlexHandler2 =()=>{
        setDisplay2("flex");
    }
    const DisplayNoneHandler2 =()=>{
        setDisplay2("none");
    }
      const DisplayFlexHandler3 =()=>{
        setDisplay3("flex");
    }
    const DisplayNoneHandler3 =()=>{
        setDisplay3("none");
    }  

    return(
        <div className='TopSellers'>
            <h1>Our Top Sellers</h1>
            <div className='TopSellersAligned'>
            
             <div className='details' data-aos="flip-left" onMouseEnter={DisplayFlexHandler1}>
    <p className="text-title">APPLE IPHONE 14 PRO</p>
    <p className="text-body">Here are the details of the card1</p>
    <img src='https://m.xcite.com/media/catalog/product//i/p/iphone_14_pro_max_-_gold_1_1_1.jpg'></img>
    <Link to="/shop" onMouseLeave={DisplayNoneHandler1} style={{width: "100%",color:"white",textDecoration:"none", height: "100%",position:"absolute",justifyContent: "center",alignItems: "center",flexDirection: "column", background: "#285c7c",opacity:"0.8",cursor: "pointer", display: display1}} >SHOP NOW</Link>
  </div>
  <div className='details' data-aos="flip-left" onMouseEnter={DisplayFlexHandler2}>
    <p className="text-title">SONY BLUETOOTH HEADSET</p>
    <p className="text-body">Sony MDR-ZX770BT Bluetooth Stereo Headset MDRZX770BT/L B&H</p>
    <img src='https://www.bhphotovideo.com/images/images2500x2500/sony_mdrzx770bt_l_around_ear_bluetooth_headphones_17_hour_battery_1126540.jpg'></img>
    <Link to="/shop" onMouseLeave={DisplayNoneHandler2} style={{width: "100%",color:"white",textDecoration:"none", height: "100%",position:"absolute",justifyContent: "center",alignItems: "center",flexDirection: "column", background: "#285c7c",opacity:"0.8",cursor: "pointer", display: display2}} >SHOP NOW</Link>
  </div>
  <div className='details' data-aos="flip-left" onMouseEnter={DisplayFlexHandler3}>
    <p className="text-title">HP LAPTOP</p>
    <p className="text-body">HP 15.6" OMEN 15-DC1040NR Laptop 6EU00UA#ABA</p>
    <img src='https://www.bhphotovideo.com/images/images2500x2500/hp_6eu00ua_aba_omen_laptop_15_dc1040nr_core_1473123.jpg'></img>
    <Link to="/shop" onMouseLeave={DisplayNoneHandler3} style={{width: "100%",color:"white",textDecoration:"none", height: "100%",position:"absolute",justifyContent: "center",alignItems: "center",flexDirection: "column", background: "#285c7c",opacity:"0.8",cursor: "pointer", display: display3}} >SHOP NOW</Link>
  </div>
 

            </div>
        </div>
    )
}