from sqlalchemy import Table, INTEGER, String, Column
from .base import metadata

organisation_status = Table(
    "organisation_status",
    metadata,
    Column("id_organisation_status", INTEGER, primary_key=True, unique=True, autoincrement=True),
    Column("status", String, nullable=False)
)
