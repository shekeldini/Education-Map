import os
from dotenv import load_dotenv
from starlette.config import Config

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

config = Config(".env")
DATABASE_URL = config("DATABASE_URL", cast=str, default="")
REDIS_URL = config("REDIS_URL", cast=str, default="")
REDIS_PORT = config("REDIS_PORT", cast=str, default="")
SECRET_KEY = config("SECRET_KEY", cast=str, default="")
ACCESS_TOKEN_EXPIRE_MINUTES = 60
ALGORITHM = "HS256"