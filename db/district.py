from sqlalchemy import Table, INTEGER, String, Column
from .base import metadata

district = Table(
    "district",
    metadata,
    Column("id_district", INTEGER, primary_key=True, unique=True, autoincrement=True),
    Column("district_name", String, nullable=False)
)

