
&nbsp;

#### About
A personal WIKI for storing notebooks and information. It is inspired Jupyter Notebook, but works without a kernel, each cell formatting only markdown. On top of this, it supports various file relationships and helpful tools that make remembering and quickly accessing the information easy. 

As this is still in development, there are many more features to come. The code is open source and general support for easy plugins will be added in the future.

&nbsp;

#### Use

Dependencies:
```python
pip install django
```
```bash
$ git clone https://github.com/GandalfTea/personalwiki 
[ choose which branch you want, the main one is stable ]
$ cd personalwiki && bash start.sh
```

&nbsp;


### Versions

#### 0.1
This prototype version focuses only on the Cell functionality. Front end is done in React.js in JSX and focuses on correct UI/UX and Markdown / LaTeX Markdon rendering and editing. The back end is a Django MVT with the basic development webserver. The Model is:

```python
class Cell(models.Model):
	data = models.CharField(max_length=5000)
	idx  = models.PositiveIntegerField()

class File(models.Model):
	name = models.CharField(max_length=200)
	last_edit = models.DateField()
	cells = models.ForeignKey(Cell, on_delete=models.CASCADE)

class Notebook(models.Model):
	titles = models.CharField(max_length=120)
	files = models.ForeignKey(File, on_delete=models.CASCADE)
```

&nbsp;

#### 0.2
Things to be added in version 0.2:
* Visual representation of linked data.
* Better control over Files and Cells, as well as text formatting.
* Custom WSGI compliant MVT server, to make it more lightweight.
* Use custom .nb files instead of a relational sqlite database.

&nbsp;

#### ToDo:

* JSON Web Signiture
* Support the creation and testing of plugins
* Write a from-scratch python server and remove the Django dependency.
