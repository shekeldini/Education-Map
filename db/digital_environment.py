from sqlalchemy import Table, String, Column
from .base import metadata

digital_environment = Table(
    "digital_environment",
    metadata,
    Column("oo_login", String, primary_key=True),
    Column("year", String, primary_key=True),
    Column("oo_name", String),
    Column("oo_address", String),
    Column("director", String),
    Column("email_oo", String),
    Column("phone_number", String),
    Column("coordinates", String),
    Column("url", String)

)

