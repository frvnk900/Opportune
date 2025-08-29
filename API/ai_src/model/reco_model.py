from langchain_openai import OpenAIEmbeddings
import os 
from langchain_openai.chat_models import ChatOpenAI 
from dotenv import load_dotenv
load_dotenv()



 
EMDB  = OpenAIEmbeddings(
        api_key=os.getenv('CHAT_API_KEY'),
        model = os.getenv("EMBEDDINGS_MODEL"),
        base_url = os.getenv("BASE_URL")
    ) 



MODEL = ChatOpenAI(
            api_key= os.getenv('CHAT_API_KEY') ,
            base_url= os.getenv('BASE_URL'),
            model = os.getenv('OLD_MODEL') 
        )