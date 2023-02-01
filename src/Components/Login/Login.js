
import React,{useState,useEffect} from 'react';
import '../General/General.css';
import { useForm } from "react-hook-form";
const Login = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("email",data.email);
        formData.append("password",data.password);
    

        const res = await fetch(
            "https://se.selopian.us/api/user/login",
            {
              method: "POST",
              body: formData,
              headers: {
        
                // Authorization:`bearer ${adminToken}`,
              },
            }
          );
        console.log(res)
          if (res.status === 200) {
            const newData = await res.json();
            console.log(newData)
            alert(newData.message);
           // reset();
           localStorage.setItem('user', JSON.stringify(newData.user))
           const token=newData.customer_access_token;
           document.cookie = `accessToken=${token}`;
           
          }else{
                 console.log("error")
          }

        

    }


    


    return (
        <div class="container">
        <div class="brand-logo"></div>
        <div class="brand-title">Customer Login</div>
          <form onSubmit={handleSubmit(onSubmit)} className="inputs">
          <label>User Email</label>
          <input type='text' {...register("email")} />

          <label>User Password</label>
          <input type='text'{...register("password")} />
            <button type='submit' className='submitbtn'>Login</button>
          </form>
     </div>
    );
};

export default Login;