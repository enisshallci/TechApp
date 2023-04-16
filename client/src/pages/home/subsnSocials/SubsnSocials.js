import './SubsnSocials.css'
import {BsInstagram,BsFacebook,BsTiktok,BsTelegram} from "react-icons/bs"

export const SubsnSocials = ()=>{
    return(
        <div className='SubsnSocials'>
            <div className='SubsnSocialsLeft' data-aos="fade-right">
                <h1>SIGN UP FOR PRECISION NEWS</h1>
                <h2>Keep in touch and stay up to date on the latest news, sales, and specials.</h2>
                <div className="subscribee">
    <input placeholder="Your e-mail" className="subscribe-inputt" name="email" type="email"/>
    <br/>
    <div className="submit-btnn">SUBMIT</div>
  </div>
            </div>
            <div className='SubsnSocialsRight' data-aos="fade-left">
                <h1>STAY CONNECTED</h1>
                <h2>Hear about upcoming events, new additions, and stay connected with our team</h2>
                <div class="cardss">
  <span>Socials</span>
  <a class="social-link" href="#">
  <BsInstagram className='svg'></BsInstagram> 
  </a>
  <a class="social-link" href="#">
  <BsFacebook className='svg'></BsFacebook>
  </a>
  <a class="social-link" href="#">
  <BsTiktok className='svg'></BsTiktok>
  </a>
  <a class="social-link" href="#">
  <BsTelegram className='svg'></BsTelegram>
   </a>
</div>
            </div>

        </div>
    )
}