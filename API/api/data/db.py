 
import json  
from pathlib import Path 
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
json_url = os.path.join(base_dir,str(base_dir)+"/serverJson")
organisation_data = "/organisation_data.json" 
client_data = '/client_data.json'

def read_data_org():
    with open(json_url+organisation_data, 'r') as f:
        try:
            return json.load(f)
        except Exception as err:
            return []  
       
def read_data_cli():
    with open(json_url+client_data, 'r') as f:
        try:
            return json.load(f)
        except Exception as err:
            return []


def write_into_organisation(data):
    with open(file=json_url+organisation_data, mode='w') as f:
        json.dump(data, f, indent=4) 
        print("organisaton added successfully")

 
def write_into_client(data):
    with open(file=json_url+client_data, mode='w') as f:
        json.dump(data, f, indent=4) 
        print("client added successfully")
     
 