import './StoreInfo.css'
import {TbTruckDelivery} from 'react-icons/tb'
import {IoIosPeople} from 'react-icons/io'
import {GiTakeMyMoney} from 'react-icons/gi'

export const StoreInfo = ()=>{
    return(
        <div className="StoreInfo" id='2'>
            <div  data-aos="fade-up">
                <TbTruckDelivery  className='icon'></TbTruckDelivery>
                <h2>CONVENIENCE</h2>
                <h3>Order Online - Pickup In Store</h3>
            </div>
            <div  data-aos="fade-up">
                <IoIosPeople className='icon'></IoIosPeople>
                <h2>CUSTOMER SUPPORT</h2>
                <h3>Our Experts Are Here to Help</h3>
            </div>
            <div data-aos="fade-up">
                <GiTakeMyMoney className='icon'></GiTakeMyMoney>
                <h2>LOW PRICE PROMISE</h2>
                <h3>We'll Get You The Lowest Price Possible</h3>
            </div>

        </div>
    )
}