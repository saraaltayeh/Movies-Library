require('dotenv').config();
const url = "postgress://saraaltayeh:sara791997$$@localhost:5432/movies";

const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const bodyParser = require("body-parser");


const movieData = require("./movie data/data.json");

const {Client} = require("pg")
// const client = new Client(url)

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
 });

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.get("/", handleFirstRoute);
app.get("/favorite", handleFavoritePage);
app.get("/trending", handleTrending);
app.get("/search", handleSearch);
app.get("/discover", handleDiscover);
app.get("/changes", handleChanges);
app.post("/addMovie",handleAdd);
app.get("/getMovies", handleGet);
app.put("/UPDATE/id", handleUpdate);
app.delete("/DELETE/id", handleDelete);
app.get("/getMovie/:id", handleID);


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
        })
}

function handleDiscover(req, res) {
    return res.json("Welcome to Discover Page");
}

function handleChanges(req, res) {
    return res.send("Welcome to Changes Page");
}

function handleAdd(req, res) {
    console.log(req.body);

    const {title, id, overview} = req.body;

    let sql ='INSERT INTO movie(title, id, overview) VALUES($1,$2,$3) RETURNING *;';
    let values = [title, id, overview];
    client.query(sql, values).then((result)=> {
        console.log(result);
        return res.json(result.rows[1]);
    }).catch();

}

function handleGet(req, res) {
    let sql = "SELECT * from movie";

    client.query(sql).then((result)=> {
        console.log(result);
        return res.json(result);
    }).catch(
        res.status(500).send("error")
    );
}

function handleUpdate(req, res){
    const {movieName} = req.query;
    const {title, id, overview} = req.body;

    let sql ='UPDATE movie SET title=$1, id=$1, overview=$1 WHERE title=1$ ;';
    let values = [title, id, overview,movieName];
    client.query(sql, values).then((result)=> {
        console.log(result);
        return res.status(301).json(result);
    }).catch();
}

function handleDelete(req, res){
    const {movieName} = req.query;

    let sql ='DELETE FROM movie WHERE title=1$;';
    let values = [movieName];
    client.query(sql, values).then((result)=> {
        console.log(result);
        return res.status(301).json(result.rows[0]);
    }).catch();
}

function handleID(req, res){
    let sql = "SELECT * from movie WHERE id=1$";
    let values =[req.params.id];
    client.query(sql,values).then((result)=> {
        console.log(result);
        return res.json(result);
    }).catch(
        res.status(500).send("error")
    );
}


app.use(function (err, req, res) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500).send("error");
});

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 Not Found');
});

client.connect().then(() => {

    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
    })
})

function Movies(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;

    return this;
}