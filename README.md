
&nbsp;

#### About
A personal WIKI for storing notebooks and information. It is inspired by Jupyter Notebook, but works without a kernel, each cell formatting only Markdown and LaTeX. 

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

&nbsp;


### Versions

#### 0.1
This prototype version focuses only on the Cell functionality. Front-end is done in React.js and TypeScript, featuring cell selection, modification and rendering with Markdown and LaTeX ( `react-markdown` and `react-mathjax` ). Data is served through a REST API, `djangorestframework`. Modifications are sorted using a custom CellUpdate data type and queued for posting. The backend is a Django WSGI webserver with a SQLite database.

TODO:
* Opon update from DB, the text is stored in state and renderer but does not show in UI
* Test API, Queue communication and reliance and Cell Formatting 
* Keyboard Shortcuts
* Refactor code where needed

&nbsp;

#### 0.2
Things to be added in version 0.2:
* Editable Title and insert source field for each cell
* Different File and Notebook Support
* Custom WSGI compliant MVT server, to make it more lightweight.
* Offer custom .nb files instead of a relational SQLite database.
* Visual representation of linked data.

&nbsp;

#### To Research:

* Public/Private key Login
* Support the creation and testing of plugins
