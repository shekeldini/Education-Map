from core.redis import Redis
from databases import Database
from sqlalchemy import create_engine, MetaData
from core.config import DATABASE_URL, REDIS_URL, REDIS_PORT

database = Database(DATABASE_URL)
redis = Redis(REDIS_URL, REDIS_PORT)
metadata = MetaData()
# engine = create_engine(
#     DATABASE_URL
# )


