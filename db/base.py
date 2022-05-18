from core.redis import Redis
from databases import Database
from sqlalchemy import create_engine, MetaData
from core.config import DATABASE_URL, REDIS_URL, REDIS_PORT, REDIS_PASSWORD

database = Database(DATABASE_URL)
redis = Redis(REDIS_URL, REDIS_PORT, REDIS_PASSWORD)
metadata = MetaData()
# engine = create_engine(
#     DATABASE_URL
# )


