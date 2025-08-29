import os
from pathlib import Path 
BASE_DIR = Path(__file__).resolve().parents[1]


class Config:
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'data/uploads')
    ALLOWED_EXTENSIONS = {'.png', '.jpeg', '.jpg', '.docx', '.pdf'}
    
    JWT_SECRET_KEY = 'f3Yt92kLmQ8pXz7VhRdB1'
    JWT_ALGORITHM = 'HS256'
    JWT_EXP_DELTA_SECONDS = 604800 

