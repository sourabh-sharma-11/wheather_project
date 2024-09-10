import React, {  useState } from 'react'
import cloud from"../images/cloud.png"
import  rainy from"../images/rainy.png"
import clear from"../images/clear.png"
import mist from"../images/mist.png"
import err from"../images/err.png"

const Myapp = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState()
  const [error, setError] = useState()
  const API_KEY = "67b0f5d709f92cd2abf731316a2fca08"
  const handleInput = (event) => {
    setSearch(event.target.value)
  }
  const myFun = async () => {
    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
    const jsonData = await get.json()
    console.log(jsonData);
    setData(jsonData);
    if (search === "") {
    // alert("enter name")
      setError("Please Enter Name ")
    }
    else if(jsonData.cod == '404'){
      setError("Please Enter Valid Name !")
    }else{
      setError("")
    }
    setSearch("")

  }
  return (
    <>
      <div className='container'>
        <div className='inputs'>
          <input placeholder='Enter city, country' value={search}onChange={handleInput} />
          <button onClick={myFun}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        {/* {(data) ? <h1>{data.name}</h1> : 'City Name'} */}
        {/* {data&&<h1>{data.name}</h1>} */}
        {
          error ?
          <div className='errorPage'>
            <p>{error}</p>
            <img src={err}/>
            </div> : ""
        }
        {
          data && data.weather ?
            <div className='weathers'>
              <h2 className='cityName'>{data.name}</h2>
               <img src={data.weather[0].main == "Clouds" ? cloud : ""}/>
               <img src={data.weather[0].main == "Rain" ? rainy : ""}/>
               <img src={data.weather[0].main == "Clear" ? clear : ""}/>
               <img src={data.weather[0].main == "Mist" ? mist : ""}/>
               <img src={data.weather[0].main == "Haze" ? cloud : ""}/>
              <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
              <p className='climate'>{data.weather[0].description}</p>
            </div> : ""
        }
      </div>
    </>
  )
}

export default Myapp