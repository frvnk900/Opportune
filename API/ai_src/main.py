from pathlib import Path
import sys
from unittest import result
p = Path(__file__).resolve().parent
sys.path.append(str(p))
from route.client_route import client_to_organisation_route
from route.organisation_route import orgaisation_to_personal_route
 

def match_organisation_to_clients(service:str,request:str) -> list:
    try:
        result = orgaisation_to_personal_route.invoke({
            "request": request,
            "services": service
        })
        return result
    except Exception as e:
      return [{"error":f"something went wrong:{e}"}]
     
   
def match_client_to_organisation(description:str,status:str,age:str,location:str,language:str) -> list:
    try:
        result = client_to_organisation_route.invoke(
            {
            "description": description,
            "age":  age,
            "status": status,
            "location":  location,
            "language":  language
            }
        )
        return result
    except Exception as e:
            return [{"error":f"something went wrong:{e}"}]
    
# x = match_client_to_organisation(
#     description=" i am a web developer",
#     age="46",
#     status="Job seeker",
#     location="NYC",
#     language="English"

# )
# print(x)