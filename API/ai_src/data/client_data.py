from importlib.metadata import entry_points
from langchain_community.vectorstores import FAISS
import json 
from langchain_core.documents import Document
from pathlib import Path 
import sys 
p = Path(__file__).resolve().parents[1]
sys.path.append(str(p))
from model.reco_model import EMDB
import json

 
def load_client_data():
    base_path = Path(__file__).resolve().parents[2]
    json_path = base_path / "api" / "data" / "serverJson" / "organisation_data.json"
    with open(file=json_path, mode="r") as file:
        organisations_data = json.load(file)

    documents = []
    for organisation in organisations_data:
        organisation_id = organisation.get("organisation_id", "")
        organisation_location = organisation.get("organisation_location", "")
        organisation_type = organisation.get("orgnaisation_type", "")
        organisation_name = organisation.get("organisation_name", "")
        
        for client_request in organisation.get("organisation_client_requests", []):
            request_id = client_request.get("request_id", "")
            request = client_request.get("request", "")

            content = f"""
            ___________________________________
             Organisation ID: {organisation_id}
             Organisation name: {organisation_name}
             Organisation Location: {organisation_location}
             Organisation Type: {organisation_type}
                ----
                Request ID: {request_id}
                Request: {request}
                ---- 
            __________________________________
            
            
            """
            
         
            metadata = {"organisation_id": organisation_id, "request_id": request_id}
            documents.append(Document(page_content=content.strip(), metadata=metadata))

    embeddings = EMDB  
    vectorstore = FAISS.from_documents(documents, embeddings)

    return vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})


 
 
