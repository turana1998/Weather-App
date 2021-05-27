import logo from "./logo.jpg";
import "./App.css";
import React, { useState} from "react";
import axios from "axios";


const api = {
  key: "1ea3de7ece38089bab9694ca7aea0af0",
  link: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [mainReguest, setMainReguest] = useState("");
  const [weatherDaily, seWeather] = useState({});
  const weatherApp = (e) => {
    if (e.key === "Enter") {
      axios.get(`${api.link}weather?q=${mainReguest}&units=metric&APPID=${api.key}`)
        // .then((res) => res.json())
        .then((result) => {
          seWeather(result.data);
          setMainReguest("");
          console.log(result.data);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

 
  return (
    <div className="App">
      <div className="appBody">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" style={{backgroundColor:"inherit"}}/>
          <p>Weather App</p>
        </header>
        <br></br>
        <div class="login-box">
  <div class="textbox">
    <i class="fas fa-user"></i>
        <input
            type="text"
            placeholder="   Input City Name"
            onChange={(event) => setMainReguest(event.target.value)}
            value={mainReguest}
            onKeyUp={weatherApp}
          ></input>
          </div>
          </div>
        <div className='Badi'>
          
          {typeof weatherDaily.main != "undefined" ? (
            <div className={(typeof weatherDaily.main != "undefined") ? ((weatherDaily.main.temp > 16) ? 'MainB warm' : 'MainB') : 'MainB'}>
              <p style={{fontSize:"25px",color:"#001f3f"}}>
                {weatherDaily.name} {weatherDaily.sys.country}
                <img src={`https://www.countryflags.io/`+weatherDaily.sys.country+`/shiny/64.png`} alt='dinazavr'></img>
              </p>
              <div className='Temp'>
              <p>{Math.round(weatherDaily.main.temp)}°c </p>
              </div>
              <p>{dateBuilder(new Date())} </p>
              <p>{weatherDaily.weather[0].description} </p>
              <img
                src={
                  "http://openweathermap.org/img/wn//" +
                  weatherDaily.weather[0].icon +
                  "@2x.png"
                }
                alt="icon"
              ></img>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
