# from urllib import response
# import requests

# # url = 'http://127.0.0.1:5000/organisation_signup'   
# url = 'http://127.0.0.1:5000/client_signup'
 
# form_data = {
#          "client_email":"jean@gmail.com", "client_name": "jean cloud", "client_username":"jeany34","client_description":"I am professional AL engneer with experience of 13 years and a  master degree in Python advanced", "client_age":"45" , "client_profile":"Employed",
#         "client_location":"SA,Durban", "client_password":"46344dsdfbnj3", "client_nationality":"South African"
# }


# files = {
#     'client_profile_image': open('API/logo-large-58kb.png', 'rb'),
# }

 
# response = requests.post(url, data=form_data, files=files)
# # response = requests.get(url)

# print("Status code:", response.status_code)
# print("Response:", response.json())

x = ["frank"]

v = ",".join(x)
print(v)
 
 
