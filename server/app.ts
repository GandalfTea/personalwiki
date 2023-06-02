
import log from "./logging";
const path = require('path');
const pug = require('pug')

const express = require("express");
const app = express()
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..','/views'))

app.use(express.json())
app.use(express.static("./public"))


const PORT = 8080; // Same as SPNATI, could cause conflict if you a degen

app.get("/", (req, res) => {
	log("GET", req.socket.remoteAddress, 0, 200, "Successful")
	res.redirect('/tree');
})

app.get("/tree", (req, res) => {
	log("GET", req.socket.remoteAddress, 0, 200, "Get Tree")
	res.render('tree');
})

app.get("/editing/:file", (req, res) => {
	res.render('editing', {file: req.params.file});
})

// Routes

import { router as api_routes } from "./routes/api.routes";
app.use("/api", api_routes);

app.listen(PORT, () => {
	process.stdout.write(`\n\nListening on port: ${PORT}.`);
})
