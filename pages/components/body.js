import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
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
    <>

   <div>
   <input class="form-control me-2" type="search" placeholder="Search" />
     <table className="table">
       <thead>

       <tr>
       <th>Symbol</th>
       <th>24H</th>
       <th>Price</th>
       <th>Market Cap</th>
     </tr>
     </thead>
     <tbody>
     {data.map(coin => (
       <tr key={coin.id}>
         <td> <img src={coin.image} style={{width:25, height: 25, marginRight:10}}/>{coin.symbol.toUpperCase()}</td>
         <td> <span className={coin.price_change_percentage_24h > 0 ? ("text-success") : ("text-danger")}>{formatPercent(coin.price_change_percentage_24h)}</span></td>
         <td>{formatDollar(coin.current_price, 20)}</td>
         <td>{formatDollar(coin.market_cap,12)}</td>
       </tr>
     ))}
     </tbody>
    
       
     </table>


   </div>
    
  </>
    
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
