

&nbsp;

#### Running Tests

Requires `requests`
```bash
$ pip install requests
```

argv:

```
-v, --verbose        Verbose
PORT [int]           Localhost PORT of App. Default: 8000
```

&nbsp;

API endpoints:
```
// Bulk API endpoints
./api/notebooks        // GET: Returns all the Notebooks
./api/files            // GET: Returns all the Files
./api/cells            // GET: Returns all the Cells

// Specific endpoints
./api/cell/<uuid:pk>   // GET: Returns the cell with the specific UUID
                       // PUT: Create a cell with the UUID and contents of [ request.data ]
                       // PATCH: Update the Cell with new [ request.data ]
                       // DELETE: Delete specific Cell

./api/file/<slug>      // GET: Returns the File with url:slug 
                       // PUT, PATCH, DELETE

./api/file/<slug>/cells // POST: Get all the Cells of specific File.
											 
./api/notebook/files   // POST: Get all the Files of specific Notebook
                       // Request data must be JSON of form {"name" : [ Notebook Name ] }

```

#### cURL Examples

Create a new File:
```bash
$ curl -X PUT -H "Content-Type: application/json" -d "{\"parent-title\":\"Demo Notebook\" \
              , \"name\":\"Demo File\"}" 127.0.0.1:8000/api/file/demo-notebook

```

Get all the cells associated with a file:
```bash
$ curl -X POST -H "Content-Type: application/json" 127.0.0.1:8000/api/file/demo-notebook/cells
```

Get all the files associated with a notebook:
```bash
$ curl -X POST -H "Content-Type: application/json" -d "{\"name\" : \"Demo Notebook\"}" \
       127.0.0.1:8000/api/notebook/files
```

