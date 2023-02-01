import React,{useState,useEffect} from 'react';
import './General.css';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const General = () => {
    const adminToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2Uuc2Vsb3BpYW4udXNcL2FwaVwvYWRtaW5cL2xvZ2luIiwiaWF0IjoxNjc1MjI3NDk1LCJleHAiOjE2NzUyMzEwOTUsIm5iZiI6MTY3NTIyNzQ5NSwianRpIjoiWnVuazdLT1hyVkhwZkx0ayIsInN1YiI6MSwicHJ2IjoiZGY4ODNkYjk3YmQwNWVmOGZmODUwODJkNjg2YzQ1ZTgzMmU1OTNhOSJ9.UX8P7SRBNfCYS3ig-JvGdIt_Cte1DFtg2tXKoXCF_t0';
    const { register, handleSubmit } = useForm();
    const [details, setDetails] = useState([]);
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("site_name",data.site_name);
        formData.append("site_email",data.site_email);
        formData.append("site_phone",data.site_phone);
        formData.append("site_address",data.site_address);

        formData.append("site_facebook",data.site_facebook);
        formData.append("site_twitter",data.site_twitter);
        formData.append("site_linkedin",data.site_linkedin);
        formData.append("site_instagram",data.site_instagram);
         
        formData.append("site_youtube",data.site_youtube);
        formData.append("site_pinterest",data.site_pinterest);
        formData.append("site_about",data.site_about);
        formData.append("logo",data.logo[0]);
        formData.append("favicon",data.favicon[0]);

        const res = await fetch(
            "https://se.selopian.us/api/admin/general-setting-update",
            {
              method: "POST",
              body: formData,
              headers: {
        
                Authorization:`bearer ${adminToken}`,
              },
            }
          );
        console.log(res)
          if (res.status === 200) {
            const newData = await res.json();
            console.log(newData)
            alert(newData.message);
           // reset();
           
          }else{
                 console.log("error")
          }



    }


    // get work

    const getDetails = async () => {
        const res = await fetch("https://se.selopian.us/api/admin/general-setting-detail", {
            method: "GET",
            headers: {
                'Authorization': `bearer ${adminToken}`
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            console.log(data.data);
            setDetails(data.data)
            console.log(details.logo)
        }
    }
    useEffect(() => {
        getDetails();
    }, [adminToken]);
    return (
<div>
<div class="container">
        <div class="brand-logo"></div>
        <div class="brand-title">Selopia</div>
          <form onSubmit={handleSubmit(onSubmit)} className="inputs">
          <label>Site Name</label>
          <input type='text' {...register("site_name")} />

          <label>Site Email</label>
          <input type='text'{...register("site_email")} />

          <label>Site phone</label>
          <input type='text' {...register("site_phone")} />

          <label>Site Address</label>
          <input type='text'{...register("site_address")} />

          <label>Site Facebook</label>
          <input type='text'{...register("site_facebook")} />

          <label>Site Twitter</label>
          <input type='text' {...register("site_twitter")} />

          <label>Site Linkedin</label>
          <input type='text'{...register("site_linkedin")} />

          <label>Site Instagram</label>
          <input type='text'{...register("site_instagram")} />

          <label>Site Youtube</label>
          <input type='text' {...register("site_youtube")} />

          <label>Site Pinterest</label>
          <input type='text'{...register("site_pinterest")} />

          <label>Site About</label>
          <input type='text'{...register("site_about")} />

          <label>Site Logo</label>
          <input type='file'{...register("logo")} accept="image/*" />

          <label>Site Favicon</label>
          <input type='file'{...register("favicon")} accept="image/*" />
            <button type='submit' className='submitbtn'>Submit</button>
          </form>
     </div>



     <div className='container'>
  <div class="overflow-x-auto w-full">
<table class="table w-full">

<thead>
<tr>
                   <th>Site Name</th>
                   <th>Site Email</th>
                   <th>Site Phone</th>
                   <th>Site Address</th>
                   <th>Site Facebook</th>
                   <th>Site Twitter</th>
                   <th>Site Linkedin</th>
                   <th>Site Instagram</th>
                    <th>Site Youtube</th>
                    <th>Site Pinterest</th>
                     <th>Site about</th>
                     <th>Site logo</th>
                     <th>Site favicon</th>

                       <th>Action</th>
</tr>
</thead>
<tbody>

<tr>

<td>
    {details.site_name}
</td>
<td>
 {details.site_email}

</td>

<td>{details.site_phone}</td>
<td>{details.site_address}</td>
<td>{details.site_facebook}</td>
<td>{details.site_twitter}</td>
<td>{details.site_linkedin}</td>
<td>{details.site_instagram}</td>
<td>{details.site_youtube}</td>
<td>{details.site_pinterest}</td>
<td>{details.site_about}</td>
<td className='mask mask-squircle w-8 h-8'><img  src={`https://se.selopian.us${details.site_logo}`} className="imgtd "/></td>
<td className='mask mask-squircle w-8 h-8'><img  src={`https://se.selopian.us${details.site_favicon}`} className="imgtd "/></td>

<th>
  <button class="btn btn-ghost btn-xs">Update</button>
</th>
</tr>

 




</tbody>

</table>
</div>
  </div>

     
</div>

    
 

    );
};

export default General;