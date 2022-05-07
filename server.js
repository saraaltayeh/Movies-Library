const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const movieData = require("./movie data/data.json");

const app = express();
const port = 4001
app.use(cors());

app.get("/", handleFirstRoute);
app.get("/favorite", handleFavoritePage);
app.get("/trending", handleTrending);
app.get("/search", handleSearch);
app.get("/discover", handleDiscover);
app.get("/changes", handleChanges);

function handleFirstRoute(req, res) {
    let result = [];
    movieData.da
    let newMovie = new Movies(movieData.title, movieData.poster_path, movieData.overview);
    result.push(newMovie);
    return res.json(result);
}

function handleFavoritePage(req, res) {
    return res.send("Welcome to Favorite Page");
}

function handleTrending(req, res) {
    const url = "https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US";
    axios.get(url)
        .then(info => {
            console.log(info.data.results);
            let results = info.data.results.map(result => {
                return new Movies(result.id, result.title, result.release_date, result.poster_path, result.overview);
            })
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}

function handleSearch(req, res) {
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=${movieName}&api_key=cce39446a39226ab073a48bb78ed07cd`

    axios.get(url)
        .then(info => {
            res.json(info.data.results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}

function handleDiscover(req, res) {
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=${movieName}&api_key=cce39446a39226ab073a48bb78ed07cd`

    axios.get(url)
        .then(info => {
            res.json(info.data.results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}

function handleChanges(req, res) {
    let movieName = req.query.movieName;
    const url = `https://api.themoviedb.org/3/movie/changes?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=${movieName}&api_key=cce39446a39226ab073a48bb78ed07cd`

    axios.get(url)
        .then(info => {
            res.json(info.data.results);
        })
        .catch(error => {
            console.log(error);
            res.send("inside error");
        })
}

app.use(function (err, req, res) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('Sorry, something went wrong');
});

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 Not Found');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

function Movies(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;

    return this;
}