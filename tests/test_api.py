
import requests as rq
import sys
import json

# Global polution
PORT=8000
VERBOSE=False


# Because there is no way to know the personalized notebooks
# each person has, this function only tests the status code.

def test_notebooks():

    # GET
    r = rq.get(f"http://127.0.0.1:{PORT}/api/notebooks")
    if r.status_code != 200:
        raise Exception("Failed: Notebook fetch: 127.0.0.1/api/notebooks Status code: %s", r.status_code)
    else:
        print("  PASS: Notebook fetch")
        if VERBOSE: print( f"  RESPONSE {r.status_code} DATA: {r.content}")
        return r.content

    # CREATE
    # PATCH

def test_files():
    # GET
    # CREATE
    # PATCH
    pass

def test_files_of_notebook(notebook):
    r = rq.post(f"http://127.0.0.1:{PORT}/api/notebook/files", 
                headers={"Content-Type": "application/json"}, 
                data=json.dumps({"name":notebook})) 
    if r.status_code != 200:
        raise Exception("Failed: Notebook Cells fetch: 127.0.0.1/api/notebook/files Status code: %s", r.status_code)
    else:
        print("  PASS: Notebook Files fetch")
        if VERBOSE: print( f"  RESPONSE {r.status_code} DATA: {r.content}")
        return r.content


def test_cells_of_file(filename):
    r = rq.post(f"http://127.0.0.1:{PORT}/api/file/{filename}/cells", 
                headers={"Content-Type": "application/json"}) 
    if r.status_code != 200:
        raise Exception(f"Failed: File Cells fetch: 127.0.0.1/api/file/{filename}/cells Status code: ", r.status_code)
    else:
        print("  PASS: Notebook Cells fetch")
        if VERBOSE: print( f"  RESPONSE {r.status_code} DATA: {r.content}")
        return r.content



if __name__ == "__main__":

    for arg in sys.argv[1:]:
        if "PORT" in arg:
            PORT = arg.split('=')[1]
        if "--verbose" in arg or "-v" in arg:
            VERBOSE=True


    print("\n")
    print(f"Testing on PORT:{PORT} VERBOSE:{VERBOSE}")
    notebooks = test_notebooks()
    for nb in json.loads(notebooks.decode('utf-8', 'strict')):
        files = test_files_of_notebook(nb['title'])
        if len(json.loads(files.decode('utf-8', 'strict'))) == 0: print(f"  SKIP: No cells for Files")
        for fl in json.loads(files.decode('utf-8', 'strict')):
            test_cells_of_file(fl['url'])
