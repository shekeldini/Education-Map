from sqlalchemy import Table, INTEGER, String, Column
from .base import metadata

district = Table(
    "district",
    metadata,
    Column("id_district", INTEGER, primary_key=True, unique=True),
    Column("id_region", INTEGER, nullable=True),
    Column("district_name", String, nullable=False)
)

