from sqlalchemy import Table, INTEGER, FLOAT, Column
from .base import metadata

ege = Table(
    "ege",
    metadata,
    Column("id_oo", INTEGER, primary_key=True, unique=True),
    Column("id_subject", INTEGER, nullable=False, unique=True, primary_key=True),
    Column("low", FLOAT, nullable=False),
    Column("medium", FLOAT, nullable=False),
    Column("high", FLOAT, nullable=True),
    Column("count_low", INTEGER, nullable=True),
    Column("count_medium", INTEGER, nullable=True),
    Column("count_high", INTEGER, nullable=True),
    Column("count_student", INTEGER, nullable=True),
)