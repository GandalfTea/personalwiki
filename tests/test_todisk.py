
import json
import unittest
from setup import *

class TestFlush(unittest.TestCase):
	
	def test_file_creation(self):
		data = {
			"0" : {
				"uuid" : "da39a3ee5e6b4b0d3255bfef95601890afd80709"
				"data" : "demo data for a demo world"
			},
			"1" : {
				"uuid" : "85136c79cbf9fe36bb9d05d0639c70c265c18d37"
				"data" : "demo data for a demo world"
			},
			"2": {
				"uuid" : "e49524050d4b8e04f4d0e886b82921d74e58f051"
				"data" : "demo data for a demo world"
			}
		}

