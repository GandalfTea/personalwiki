
const path = require('path');

const express = require("express");
const app = express()
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..','/views'))

app.use(express.static("./public"))


const PORT = 8080; // Same as SPNATI, could cause conflict if you a degen
const DEBUG = 0;

app.get("/", (req, res) => {
	res.redirect('/tree');
})

app.get("/tree", (req, res) => {
	res.render('tree')
})

app.get("/editing/:file", (req, res) => {

})

// Routes
import { router as api_routes } from "./routes/api.routes.js";
app.use("/api", api_routes);


app.listen(PORT, () => {
	process.stdout.write(`\n\nListening on port: ${PORT}.`);
})
