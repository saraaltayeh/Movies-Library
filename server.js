const express = require("express");

const app = express();
const port = 4001

app.get("/", handleFirstRoute);
app.get("/favorite", handleFavoritePage);

function handleFirstRoute(req, res) {
const movie = Movies("Spider-Man: No Way Home","/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg","Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.");
    return res.json({title:movie.title, poster_path:movie.poster_path, overview:movie.overview});
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