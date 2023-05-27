import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom"; 
import toast from 'react-hot-toast'
import "../../style/AuthStyles.css";

const Register = ()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer,
              });
            if(res && res.data.success){
                toast.success(res.data.message, 'Success');
                navigate('/login');
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error('Something went wrong');
        }
    };
    // console.log(process.env.REACT_APP_API)
    
    return(
        <Layout title="Register - GalaxyTech">
            <div className="form-container">
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="text" 
        value={name} 
        onChange={(e)=>setName(e.target.value)}
        className="form-control" 
        required
        placeholder="Enter Your Name" 
         />
     </div>
     <div className="mb-3">
        
        <input type="email" value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        className="form-control"  
        required
        placeholder="Enter Your Email" />
     </div>
      <div className="mb-3">
        <input type="password"
         value={password} 
         className="form-control" 
         id="exampleInputPassword1" 
        onChange={(e)=>setPassword(e.target.value)} 
         required
         placeholder="Enter Your Password" />
      </div>
      <div className="mb-3">
        <input type="text" 
        value={phone} 
        className="form-control"  
        onChange={(e)=>setPhone(e.target.value)}
        required
        placeholder="Enter Your Phone Number"
          />
     </div>
     <div className="mb-3">
        <input type="text" 
        value={address} 
        className="form-control" 
        onChange={(e)=>setAddress(e.target.value)}
        required 
        placeholder="Enter Your Address" 
          />
     </div>
     <div className="mb-3">
        <input type="text" 
        value={answer} 
        className="form-control" 
        onChange={(e)=>setAnswer(e.target.value)}
        required 
        placeholder="Notes" 
          />
     </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <NotificationContainer />
    </form>
            </div>
        </Layout>
    )
}
export default Register;