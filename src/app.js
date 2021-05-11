const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 7000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mayank V.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mayank V.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help here",
    name: "Mayank V",
    helpText: "Help is provided here",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please mention an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData.weather,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term",
    });
  }
  console.log(req.query),
    res.send({
      products: [],
    });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Article for help not found ",
    title: "404 help",
    name: "Mayank V",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    title: "404",
    name: "Mayank V",
  });
});

app.listen(port, () => {
  console.log("server started on port" + port);
});
