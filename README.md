
A personal WIKI for storing information. It is designed like Jupyter Notebook without a kernel, each cell formats markdown. It also supports interlinking between files.


#### Branches

The main branch contains all of the prototype, design and user testing data. In order to try out the application, a different version branch will be created once a prototype version is out. Right now, the 0.1 branch can be tested locally.


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


#### ToDo:

* JSON Web Signiture
* Support the creation and testing of plugins
* Write a from-scratch python server and remove the Django dependency.
