from importlib.metadata import entry_points
from langchain_community.vectorstores import FAISS
import json 
from langchain_core.documents import Document
from pathlib import Path 
import sys 
p = Path(__file__).resolve().parents[2]
sys.path.append(str(p))
from model.reco_model import EMDB
import json


def load_organisation_database():
    base_path = Path(__file__).resolve().parents[2]
    json_path = base_path / "api" / "data" / "serverJson" /"client_data.json"
    with open(file=json_path, mode="r", encoding="utf-8") as file:
        clients_data = json.load(file)

    documents = []
    for client in clients_data:
        content = f"""
        Description: {client.get("client_description", "")}
        Age: {client.get("client_age", "")}
        Profile: {client.get("client_profile", "")}
        Location: {client.get("client_location", "")}
        Nationality: {client.get("client_nationality", "")}
        ID: {client.get("client_id", "")}
        """
  
        metadata = {"client_id": client.get("client_id", "")}
        documents.append(Document(page_content=content.strip(), metadata=metadata))

    embeddings = EMDB
    vectorstore = FAISS.from_documents(documents, embeddings)

    return vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10}) 


 