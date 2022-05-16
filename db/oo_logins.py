from sqlalchemy import Table, VARCHAR, Column
from .base import metadata

oo_logins = Table(
    "oo_logins",
    metadata,
    Column("oo_login", VARCHAR(length=20), primary_key=True, unique=True)
)

