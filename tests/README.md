

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


#### cURL
You can manually test the api:


&nbsp;

API endpoints:
```
./api/notebooks        // GET: Returns all the Notebooks
./api/files            // GET: Returns all the Files
./api/cells            // GET: Returns all the Cells

./api/cell/<uuid:pk>   // GET: Returns the cell with the specific UUID
                       // PUT: Create a cell with the UUID and contents of [ request.data ]
                       // PATCH: Update the Cell with new [ request.data ]
                       // DELETE: Delete specific Cell

./api/file/<slug>      // TBD

./api/file/cells       // POST: Get all the Cells of specific File.
                       // Request data must be JSON of form {"name" : [ File Name ] }
											 
./api/notebook/files   // POST: Get all the Files of specific Notebook
                       // Request data must be JSON of form {"name" : [ Notebook Name ] }

```

#### Examples

Get all the files associated with a notebook:
```bash
$ curl -X POST -H "Content-Type: application/json" -d "{\"name\" : \"Demo Notebook\"}" \
       127.0.0.1:8000/api/notebook/files
```
Get all the cells associated with a file:
```bash
$ curl -X POST -H "Content-Type: application/json" -d "{\"name\" : \"Demo File\"}" \ 
       127.0.0.1:8000/api/file/cells
```
