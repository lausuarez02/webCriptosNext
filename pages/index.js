import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CoinGecko from "coingecko-api"
import { useState } from 'react';





const CoinGeckoClient = new CoinGecko()

export default function Body(props) {
    const [searchTerm, setsearchTerm] = useState("");
  const {data} = props.result;
 
  const formatPercent = number => `${new Number(number).toFixed(2)}%`
  
  const formatDollar = (number, maxSignificantDigits) => 
  new Intl.NumberFormat(
    "en-US",
    {
      style:"currency",
      currency:"usd",
      maxSignificantDigits
    }
  ).format(number)
  return (
  

   <div  style={{backgroundColor:"#264653", width:"100%"}}>

<nav class="navbar navbar-dark " style={{backgroundColor:"#1d3557",width:"100%" }} >
<div style={{marginLeft:"32%"}}>
<Image src={require("../public/Círculo_Carcajadas__1_-removebg-preview.png")} alt="Logo"  width={200}
      height={200}/>
</div>

      <div  style={{width:"80%", marginLeft:"20px", marginRight:"20px"}}>
       <form class="form-inline my-2 my-lg-0">
       <input className="form-control me-2" type="search" placeholder="Search..." onChange={event => {setsearchTerm(event.target.value)}} />
       </form></div>
       
</nav>

     
     <div style={{}}>
     
     </div>

     <div style={{width:"50%", justifyContent:"center", alignItems:"center", alignContent:"center", display:"flex",  float:"center", zIndex:"2"}}>
   
     </div>
   
     <table className="table">
       <thead>

       <tr>
       <th style={{color:"white"}}>Coin</th>
       <th style={{color:"white"}}>24H</th>
       <th style={{color:"white"}}>Price</th>
       <th style={{color:"white"}}>Market Cap</th>
     </tr>
     </thead>
     <tbody>
     {data.filter((val) => {
       if(searchTerm === ""){
         return val
       }else if(val.symbol.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
       }
      }).map(coin => (
       <tr key={coin.id}>
         <td style={{color:"white"}}> <img src={coin.image} style={{width:25, height: 25, marginRight:10}}/>{coin.symbol.toUpperCase()}</td>
         <td > <span className={coin.price_change_percentage_24h > 0 ? ("text-success") : ("text-danger")}>{formatPercent(coin.price_change_percentage_24h)}</span></td>
         <td style={{color:"white"}}>{formatDollar(coin.current_price, 20)}</td>
         <td style={{color:"white"}}>{formatDollar(coin.market_cap,12)}</td>
       </tr>
     ))}
     </tbody>
    
       
     </table>
<div class="navbar navbar-dark " style={{backgroundColor:"#1d3557",width:"100%", height:"100px" , flexDirection:"row"}}>
 <div style={{marginLeft:"10%"}}>
 <p ><a href="https://www.coingecko.com/en/api" target="_blank" style={{textDecoration:"none", color:"white", textAlign:"center"}}>Api</a></p> 
 </div>
 
  <div style={{width:"80%", marginLeft:"10%"}}>
  <p style={{textDecoration:"none", color:"white"}}>Made By <a href="#" style={{textDecoration:"none", color:"white", textAlign:"center"}}>Lautaro Suarez</a></p>
  </div>
 

</div>

   </div>
    
  
    
  )
}

export async function getServerSideProps(context){
  const params = {
    order: CoinGecko.ORDER_MARKET_CAP_DESC
  }
  const result = await CoinGeckoClient.coins.markets({params})
  return{
    props: {
      result
    }
  };
}
