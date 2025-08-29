import os
from pathlib import Path 
import sys 
 
def org_url() ->str:
     base_path = Path(__file__).resolve().parent
     json_path = base_path / "data" / "serverJson" /  "organisation_data.json"
     return  str(json_path)
 
def cli_url() -> str:
    base_path = Path(__file__).resolve().parent  # points to the 'api/' folder
    json_path = base_path / "data" / "serverJson" / "client_data.json"
    return str(json_path)