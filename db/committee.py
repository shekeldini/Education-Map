from sqlalchemy import Table, INTEGER, Column, ForeignKey, VARCHAR, String, Boolean
from .base import metadata

committee = Table(
    "committee",
    metadata,
    Column("id_district", INTEGER, ForeignKey("district.id_district"), primary_key=True, nullable=False),
    Column("name", VARCHAR(length=20), nullable=False),
    Column("address", String, nullable=False),
    Column("executive", String, nullable=False),
    Column("email", String, nullable=False),
    Column("phone_number", String, nullable=False),
    Column("url",  String, nullable=False),
    Column("coordinates", String, nullable=False)
)
