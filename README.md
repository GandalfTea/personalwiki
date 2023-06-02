
&nbsp;

#### About
A personal wiki for relational information ordered in Jupyter Notebook like cells without kernels. It supports Markdown and LaTeX formatting.    
Two backends are available, `express` stores data in JSON files and `django` stores data in a SQLite database. Express is lighter and faster. Django comes with a lot of overhead. 

It is still in development. The code is open source and general support for easy plugins will be added in the future.

&nbsp;

#### Use

Install dependencies, compile the TS and start webserver:
```bash
$ sh compile.sh    [ localhost:8080 ] 
```
Or just start:
```bash
$ sh start.sh      [ localhost:8080 ] 
```
For debugging and logs, update `./server/.env` file:
```bash
PORT=8080
DEBUG=0
```

#### Testing
Testing requires `unittest`.
```
$ pip install unittest
```
Update API details in `./tests/setup.py` and run the tests:
```
$ python3 ./tests/test_api.py
$ python3 ./tests/test_todisk.py
```

&nbsp;

#### Stability Update 0.2.1:

* [ ] Notebook and File Creation
* [ ] Improve Cell stability and do testing
* [ ] Initial setup and DB creation
* [ ] DB backup
* [ ] Optimise backend API processing time and HTML template creation
* [ ] Improve editing page weight to < 50kb before cell load
* [ ] Improve file.bundle.js weight to < 1MB ( now : 2.1MB )
* [ ] Optimise the number of backend requests ( now: 18 ) and make use of Cell hash.
* [ ] Improved Cell cacheing
* [ ] Improve Markdown Syntax
* [ ] Cell Keyboard Shortcuts
* [ ] Dir tree page UI update
* [ ] Make Cell left buttons follow the page scroll for easy access
* [ ] Cell left click custom menu: add cell above and below, delete
* [ ] Improved Dark mode color scheme
* [ ] Add top menu for theme selection, changing file title, etc.

