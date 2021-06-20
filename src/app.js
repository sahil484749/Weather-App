const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

// Define Path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

//Routes handler
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sahil Verma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Sahil Verma",
    contactNumber: 9821368067,
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About The App",
    name: "Sahil Verma",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    console.log("Address was not provided!!");
    return res.send({
      error: "You must provide an address!!",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, placeName } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        Latitude: latitude,
        Longitude: longitude,
        Location: placeName,
        Address: address,
        forecast: forecastData,
      });
    });
  });

  // res.send({
  //     Address: req.query.address,
  //     location: 'Noida',
  //     Temparature: 43,
  //     lat: 28,
  //     long:43
  // })
});

// app.get('/products',(req,res)=>{

//     if(!req.query.search){
//        return res.send({
//             error: "You must provide a search term."
//         })
//     }

//     console.log(req.query.location);
//     res.send({
//         products:[]
//     })
// })

app.get("/help/*", (req, res) => {
  const value = `Help Article not found(404) ${req.url}`;
  res.status(404).render("404", {
    title: "404",
    name: "Sahil Verma",
    errorMessage: value,
  });

  //res.status(404).send(`Help article not found: ${req.url}`)
});

app.get("*", (req, res) => {
  console.log(req.url);
  const value = `The page does not exist ${req.url}`;
  res.status(404).render("404", {
    title: "404",
    name: "Sahil Verma",
    errorMessage: value,
  });
});

//Application Listen port
//const port = 3000;
app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
