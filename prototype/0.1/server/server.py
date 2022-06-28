import sys
import platform

""" Things to research and possibly implement:
    * WSGI and the server-framework relationship
    * JSON Web Signiture Data Transmission """



PORT = 8888
MODE = "PRODUCTION"
DEBUG = False

if __name__ == "__main__":
    print(f'\n\nWorking on { platform.system() } { platform.release()} {platform.version()}')
    print("Development Mode, Debug Enabled") if DEBUG == True else print("Production Mode")
    print(f'Starting local webserver on port: {PORT} : http://localhost:8888"')
