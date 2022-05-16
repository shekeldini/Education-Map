from sqlalchemy import Table, INTEGER, Column, ForeignKey, VARCHAR
from .base import metadata

name_of_the_settlement = Table(
    "name_of_the_settlement",
    metadata,
    Column("id_name_of_the_settlement", INTEGER, primary_key=True, autoincrement=True),
    Column("id_district", INTEGER, ForeignKey('district.id_district'), unique=True, nullable=False),
    Column("id_oo_location_type", INTEGER, ForeignKey('oo_location_type.id_oo_location_type'), unique=True, nullable=False),
    Column("name", VARCHAR(length=30), nullable=False)
)

