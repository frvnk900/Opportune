import sys
from pathlib import Path
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda, RunnableMap


p = Path(__file__).resolve().parents[1]
sys.path.append(str(p))


from model.reco_model import MODEL
from data.client_data import load_client_data
from schema.client_schema import CLientRecommendationResponse
from template.client_template import client_template



client_to_organisation_prompt = PromptTemplate(
    template=client_template,
    input_variables=["request", "age", "status", "location", "language", "database"]
)
 
retriever =  load_client_data()
 
llm = MODEL.with_structured_output(CLientRecommendationResponse)

def fetch_relevant_clients(input: dict) -> dict:
  
    query = f"{input['description']} {input['status']} {input['location']} {input['language']}"
    
  
    docs = retriever.get_relevant_documents(query)
    database = "\n".join([doc.page_content for doc in docs])

 
    return {
        "description": input["description"],
        "age": input["age"],
        "status": input["status"],
        "location": input["location"],
        "language": input["language"],
        "database": database
    }

 
client_to_organisation_route = RunnableLambda(fetch_relevant_clients) | client_to_organisation_prompt  | llm
