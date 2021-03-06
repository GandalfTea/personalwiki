
&nbsp;

#### About
A personal WIKI for storing notebooks and information. It is inspired by Jupyter Notebook, but works without a kernel, each cell formatting only Markdown and LaTeX. On top of this, it supports various file relationships and helpful tools that make remembering and quickly accessing the information easy. 

As this is still in development, there are many more features to come. The code is open source and general support for easy plugins will be added in the future.

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
This prototype version focuses only on the Cell functionality. Front end is done in React.js featuring cell selection and modification with Markdown / LaTeX rendering and editing. Data is served through a REST API. The backend is a Django WSGI webserver with a sqlite relational database. The model is:

```python
class Notebook(models.Model):
    title = models.CharField(max_length=120)

class File(models.Model):
    name = models.CharField(max_length=200)
    last_edit = models.DateTimeField(auto_now_add=True)
    notebook = models.ForeignKey(Notebook, on_delete=models.SET_NULL, null=True, blank=True)

class Cell(models.Model):
    data = models.TextField()
    idx = models.PositiveIntegerField()
    main_file = models.ForeignKey(File, on_delete=models.SET_NULL, null=True, blank=True)
```

&nbsp;

#### 0.2
Things to be added in version 0.2:
* Visual representation of linked data.
* Better control over Files and Cells, as well as text formatting.
* Custom WSGI compliant MVT server, to make it more lightweight.
* Use custom .nb files instead of a relational sqlite database.

&nbsp;

#### To Research:

* Public/Private key Login
* Support the creation and testing of plugins
