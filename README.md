
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

# Stability Update 0.2.1:

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

&nbsp;

#### To Research:

* Public/Private key Login
* Support the creation and testing of plugins
