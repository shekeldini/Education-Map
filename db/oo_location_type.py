from sqlalchemy import Table, INTEGER, VARCHAR, Column
from .base import metadata

oo_location_type = Table(
    "oo_location_type",
    metadata,
    Column("id_oo_location_type", INTEGER, primary_key=True, autoincrement=True, unique=True),
    Column("location_type", VARCHAR(length=85), nullable=False)
)

