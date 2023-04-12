
const express = require("express");
const router = express.Router();
require("dotenv").config();


// Individual Cell

router.get("file/:slug/cell/:uid", (req, res) => {
	if(process.env.BACKEND === 1) {
 		// JSON
		/*
      Cache:
      [ ] Search for file 
			[ ] Search for cell
		  [ ] Return Cell

			if cache miss: 
			[ ] Open Notebook folder
			[ ] Search and open for file :slug
      [ ] Search for cell :uid 
			[ ] Register cache
      [ ] Return cell                     */
	} else if (process.env.BACKEND === 2) {
		// SQL

	} else {
		// ERROR
	}
});

router.post("file/:slug/cell/:uid", (req, res) => {
});

router.patch("file/:slug/cell/:uid", (req, res) => {
})

router.delete("file/:slug/cell/:uid", (req, res) => {
})


// Individual File


router.get("file/:slug/details", (req, res) => {
})

// Returns all the cells in the file
router.get("file/:slug", (req, res) => {
});

// Post new full array of cells (this happens often because of cell movement) 
router.post("file/:slug", (req, res) => {
});

// Append cells to the end of file
router.patch("file/:slug", (req, res) => {
})

router.delete("file/:slug", (req, res) => {
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


