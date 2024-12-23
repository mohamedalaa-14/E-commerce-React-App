
import {  LOGOUT } from "../../Api/Api"
import { useState } from "react";
import LoadingSubmit from "../../components/Loading/Loading";
import { Axios } from "../../Api/Axios";

export default function Logout(){
     // cookies
    //  const cookie = Cookie();
 // Loading
 const [loading, setLoading] = useState(false);

async function handleLogout() {
    setLoading(true)
    try{
      const res=  await Axios.get(`/${LOGOUT}`);
      setLoading(false)
      window.location.pathname ="/login"
      console.log(res);
    }catch(err){
        console.log(err)
    }
}
    return (
        <>
          {loading && <LoadingSubmit/>}
          <button onClick={handleLogout}>Logout </button>
        </>
    )
    
}