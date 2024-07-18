require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let city = "";
const key = process.env.KEY; // put your open weather map key here 

// ALL INFORMATION AVALIABLE
app.get("/api/all/info/:city", async (req, res) => {
  city = req.params.city;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();

    if (response.ok) {
      res.status(200).json({
        success: true,
        response: data,
      });
    } else {
      res.status(response.status).json({
        success: false,
        response: data.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: "unexpected error",
      error: err,
    });
  }
});

// GENERAL INFORMATION
app.get("/api/weather/:city", async (req, res) => {
    city = req.params.city;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();

    if (response.ok) {
      res.status(200).json({
        success: true,
        response: {
          weather: data.weather[0].description,
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        },
      });
    } else {
      res.status(response.status).json({
        success: false,
        error: data.message,
      });
    }
  } catch (error) {
    res.status(500).json({
        success: false,
        response: "unexpected error",
      });
  }
});

// CORDINATES
app.get('/api/cordinate/:city', async(req, res)=> {
    city = req.params.city;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
        let response = await fetch(url)
        let data = await response.json()

        if(response.ok){
            res.status(200).json({
                success : true,
                response : {
                    latitude : data.coord.lat,
                    longitude : data.coord.lon,
                    message: data.message
                }
            })
        }else{
            res.status(response.status).json({
                success : false,
                error : data.message
            })
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            error : "unexpected server error"
        })
    }
})

// wind
app.get('/api/wind/:city', async(req, res)=> {
    city = req.params.city;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
        let response = await fetch(url)
        let data = await response.json()

        if(response.ok){
            res.status(200).json({
                success : true,
                response : data.wind
            })
        }else{
            res.status(response.status).json({
                success : false,
                error : data.message
            })
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            error : "unexpected server error"
        })
    }
})




app.listen(3000, () => console.log("server is running"));
