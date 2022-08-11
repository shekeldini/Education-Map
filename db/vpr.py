from sqlalchemy import Table, INTEGER, FLOAT, Column
from .base import metadata

vpr = Table(
    "vpr",
    metadata,
    Column("id_oo", INTEGER, primary_key=True, unique=True),
    Column("id_subject", INTEGER, nullable=False, unique=True, primary_key=True),
    Column("parallel", INTEGER, nullable=False, unique=True, primary_key=True),
    Column("low", FLOAT, nullable=False),
    Column("medium", FLOAT, nullable=False),
    Column("high", FLOAT, nullable=False),
    Column("count_low", INTEGER, nullable=False),
    Column("count_medium", INTEGER, nullable=False),
    Column("count_high", INTEGER, nullable=False),
)