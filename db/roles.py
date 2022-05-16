from sqlalchemy import Table, INTEGER, String, Column
from .base import metadata

roles = Table(
    "roles",
    metadata,
    Column("id_role", INTEGER, primary_key=True, autoincrement=True, unique=True),
    Column("role", String, nullable=False, unique=True)
)

