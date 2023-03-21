
const express = require("express");
const app = express()


const PORT = 8080; // Same as SPNATI, could cause conflict if you a degen
const DEBUG = 0;

app.get("/", (req, res) => {
	res.redirect('/tree');
})

app.get("/tree", (req, res) => {
	// Present tree
})

app.get("/editing/:file", (req, res) => {

})

// Routes
import { router as api_routes } from "./routes/api";
app.use("/api", api_routes);


app.listen(PORT, () => {
	process.stdout.write(`\n\nListening on port: ${PORT}.`);
})
