from langchain_openai.chat_models import ChatOpenAI 
import os 
from dotenv import load_dotenv
load_dotenv()
class Model:
    def __init__(self):
        self.modell = self.model()
    def model(self) -> ChatOpenAI:
        return ChatOpenAI(
            api_key= os.getenv('CHAT_API_KEY') ,
            base_url= os.getenv('BASE_URL'),
            model = os.getenv('CHAT_MODEL') ,
            max_completion_tokens=1000 ,
            temperature=0
        )
        