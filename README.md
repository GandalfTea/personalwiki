
&nbsp;

#### About
A personal WIKI for storing notebooks and information. It is inspired by Jupyter Notebook, but works without a kernel, each cell formatting only Markdown and LaTeX. It makes use of React.js with TypeScript for front end cell management, Django and an SQLite database for storing the data in the backend and a REST API, `djangorestframework` to serve data and patch updates.

It is still in alpha development. The code is open source and general support for easy plugins will be added in the future.

&nbsp;

#### Use

```bash
$ git clone https://github.com/GandalfTea/personalwiki 
[ choose which branch you want, the main one is probably stable ]
```

```bash
$ cd personalwiki && bash start.sh 	       [ localhost:8080 ]
```
This requires `django` and `djangorestframework`, which are automatically
pip installed by the script in case you don't already have them.

&nbsp;

#### cURL

Get all the files associated with a notebook:
```bash
$ curl -X POST -H "Content-Type: application/json" -d "{\"name\" : \ [ Notebook Name ] \"}" \
       127.0.0.1:8000/api/notebook/files
```
Get all the cells associated with a file:
```bash
$ curl -X POST -H "Content-Type: application/json" -d "{\"name\" : \" [ File Name ] \"}" \ 
       127.0.0.1:8000/api/file/cells
```



#### Upcoming 0.1.1 Update:
 - [ ] Multiple Files Support
 - [x] UI/UX Improvement
 - [ ] Unit Testing
 - [ ] Cell Indexing and TOC


&nbsp;

#### To Research:

* Public/Private key Login
* Support the creation and testing of plugins
