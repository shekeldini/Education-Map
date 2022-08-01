from sqlalchemy import Table, INTEGER, Column, ForeignKey, VARCHAR, String, Boolean
from .base import metadata

oo = Table(
    "oo",
    metadata,
    Column("id_oo", INTEGER, primary_key=True, autoincrement=True),
    Column("id_district", INTEGER, ForeignKey("district.id_district"), nullable=False),
    Column("oo_login", VARCHAR(length=20), nullable=False),
    Column("filial", Boolean, default=False,  nullable=False),
    Column("filial_number", INTEGER, nullable=True),
    Column("oo_name", String, nullable=False),
    Column("oo_address", String, nullable=False),
    Column("director", String, nullable=False),
    Column("email_oo", String, nullable=False),
    Column("phone_number", String, nullable=False),
    Column("key_ege", INTEGER, nullable=True),
    Column("url",  String, nullable=False),
    Column("coordinates", String, nullable=False),
    Column("show", Boolean, default=True,  nullable=False),
)

