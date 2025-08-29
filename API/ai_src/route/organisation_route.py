from langchain.prompts import PromptTemplate
from pathlib import Path
import sys
p = Path(__file__).resolve().parents[1]
sys.path.append(str(p))
from model.reco_model import MODEL
from data.organisation_data import load_organisation_database
from schema.organisation_schema import OrganisationRecommendationResponse
from template.organisation_template import recommendation_template
from langchain_core.runnables import RunnableLambda, RunnableMap

 
org_to_personal_prompt = PromptTemplate(
    template=recommendation_template,
    input_variables=["request", "services", "database"]
)

 
llm = MODEL.with_structured_output(OrganisationRecommendationResponse)

retriever = load_organisation_database()


def fetch_relevant_clients(input: dict) -> dict:
    query = f"{input['request']} {input['services']}"
    docs = retriever.get_relevant_documents(query)
    database = "\n".join([doc.page_content for doc in docs])
    return {
        "request": input["request"],
        "services": input["services"],
        "database": database
    }

orgaisation_to_personal_route = RunnableLambda(fetch_relevant_clients) | org_to_personal_prompt | llm
