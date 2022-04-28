const express = require("express");
const movieData = require("./movie data/data.json");

const app = express();
const port = 4001

app.get("/", handleFirstRoute);
app.get("/favorite", handleFavoritePage);
// app.use("*", handleNotFound);

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

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

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

function Movies(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

    return this;
}