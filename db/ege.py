from sqlalchemy import Table, INTEGER, FLOAT, Column
from .base import metadata

ege = Table(
    "ege",
    metadata,
    Column("id_oo", INTEGER, primary_key=True, unique=True),
    Column("id_subject", INTEGER, nullable=False, unique=True, primary_key=True),
    Column("low", FLOAT, nullable=False),
    Column("medium", FLOAT, nullable=False),
    Column("high", FLOAT, nullable=True)
)