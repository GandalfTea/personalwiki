
import {diskret, write_file, write_file_safe} from "../fs";
import log from "../logging";
const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });



// INDIVIDUAL FILE 

router.get("/file", (req, res) => {
	log("GET", req.socket.remoteAddress, 0, 420, "FILE")
})

router.get("/file/:slug/details", (req, res) => {
})

// Returns all the cells in the file
router.get("/file/:slug", (req, res) => {
	log("GET", req.socket.remoteAddress, 0, 420, "FILE")
});

// Post new full array of cells (this happens often because of cell movement) 
router.post("/file/:slug", (req, res) => {
	const _start = process.hrtime.bigint();
	if(process.env.DEBUG >= 2) console.log(req.body);
	let ret = write_file_safe(req.body.data, req.params.slug, req.body.nb);	
	switch(ret) {
		case diskret.SUCCESS: 
			log("POST", req.socket.remoteAddress, Number(process.hrtime.bigint() - _start), 201, "SUCCESS. File "+req.params.slug+ " created.");
			res.status(201);
			res.send("SUCCESS");	
			break;
		case diskret.INVALID_ARGUMENTS:
			log("POST", req.socket.remoteAddress, Number(process.hrtime.bigint() - _start), 400, "INVALID_ARGUMENTS");
			res.status(400);
			res.send("INVALID_ARGUMENTS");	
			break;
		case diskret.PARENT_NOTEBOOK_NOT_FOUND:
			log("POST", req.socket.remoteAddress, Number(process.hrtime.bigint() - _start), 400, "PARENT_NOTEBOOK_NOT_FOUND");
			res.status(400);
			res.send("PARENT_NOTEBOOK_NOT_FOUND"); 
			break;
		case diskret.OVERWRITE_FROM_SAFE_FUNCTION:
			log("POST", req.socket.remoteAddress, Number(process.hrtime.bigint() - _start), 403, "OVERWRITE_FROM_SAFE_FUNCTION");
			res.status(403);
			res.send("OVERWRITE_FROM_SAFE_FUNCTION");	
			break;
		case diskret.FS_ERROR:
			log("POST", req.socket.remoteAddress, Number(process.hrtime.bigint() - _start), 500, "FS_ERROR");
			res.status(500);
			res.send("FS_ERROR");	
			break;
	}
});

// Append cells to the end of file
router.patch("/file/:slug", (req, res) => {
})

router.delete("/file/:slug", (req, res) => {
})



// Individual Notebook

router.get("nb/:slug/details", (req, res) => {
})

// Get all files in notebook
router.get("nb/:slug", (req, res) => {
})

router.patch("nb/:slug", (req, res) => {
})

router.delete("nb/:slug", (req, res) => {
})


// Batch requests 


export { router } ;


