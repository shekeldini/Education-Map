from sqlalchemy import Table, INTEGER, Column, VARCHAR
from .base import metadata

organizational_and_legal_form = Table(
    "organizational_and_legal_form",
    metadata,
    Column("id_organizational_and_legal_form", INTEGER, primary_key=True, unique=True, autoincrement=True),
    Column("type_of_organizational_and_legal_form", VARCHAR(length=30), nullable=False)
)

