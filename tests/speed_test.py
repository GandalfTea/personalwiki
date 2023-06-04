
import json
import unittest
import requests as rq
from setup import *

class TestFlush(unittest.TestCase):
	def test_400mb(self):
		N = 2 << 21
		data = {
			"data": {},
			"nb": "demonb"
		}
		for i in range(N):
			data['data'][str(i)] = {
				"uuid" : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
				"data" : "demo data for a demo world"
			}	
		r = rq.post(f"http://localhost:8080/api/file/400mb", headers={"Content-Type": "application/json"}, data=json.dumps(data))
		self.assertEqual(r.status_code, 201)
		r = rq.delete(f"http://localhost:8080/api/file/400mb", headers={"Content-Type": "application/json"}, data=json.dumps({"nb":"demonb"}))
		self.assertEqual(r.status_code, 200)

	def test_200mb(self):
		N = 2 << 20
		data = {
			"data": {},
			"nb": "demonb"
		}
		for i in range(N):
			data['data'][str(i)] = {
				"uuid" : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
				"data" : "demo data for a demo world"
			}	
		r = rq.post(f"http://localhost:8080/api/file/200mb", headers={"Content-Type": "application/json"}, data=json.dumps(data))
		self.assertEqual(r.status_code, 201)
		r = rq.delete(f"http://localhost:8080/api/file/200mb", headers={"Content-Type": "application/json"}, data=json.dumps({"nb":"demonb"}))
		self.assertEqual(r.status_code, 200)

	def test_100mb(self):
		N = 2 << 19
		data = {
			"data": {},
			"nb": "demonb"
		}
		for i in range(N):
			data['data'][str(i)] = {
				"uuid" : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
				"data" : "demo data for a demo world"
			}	
		r = rq.post(f"http://localhost:8080/api/file/100mb", headers={"Content-Type": "application/json"}, data=json.dumps(data))
		self.assertEqual(r.status_code, 201)
		r = rq.delete(f"http://localhost:8080/api/file/100mb", headers={"Content-Type": "application/json"}, data=json.dumps({"nb":"demonb"}))
		self.assertEqual(r.status_code, 200)

	def test_50mb(self):
		N = 2 << 18
		data = {
			"data": {},
			"nb": "demonb"
		}
		for i in range(N):
			data['data'][str(i)] = {
				"uuid" : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
				"data" : "demo data for a demo world"
			}	
		r = rq.post(f"http://localhost:8080/api/file/50mb", headers={"Content-Type": "application/json"}, data=json.dumps(data))
		self.assertEqual(r.status_code, 201)
		r = rq.delete(f"http://localhost:8080/api/file/50mb", headers={"Content-Type": "application/json"}, data=json.dumps({"nb":"demonb"}))
		self.assertEqual(r.status_code, 200)

	def test_25mb(self):
		N = 2 << 17
		data = {
			"data": {},
			"nb": "demonb"
		}
		for i in range(N):
			data['data'][str(i)] = {
				"uuid" : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
				"data" : "demo data for a demo world"
			}	
		r = rq.post(f"http://localhost:8080/api/file/25mb", headers={"Content-Type": "application/json"}, data=json.dumps(data))
		self.assertEqual(r.status_code, 201)
		r = rq.delete(f"http://localhost:8080/api/file/25mb", headers={"Content-Type": "application/json"}, data=json.dumps({"nb":"demonb"}))
		self.assertEqual(r.status_code, 200)

if __name__ == "__main__":
    unittest.main()
