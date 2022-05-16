from sqlalchemy import Table, INTEGER, Column, VARCHAR
from .base import metadata

population_of_the_settlement = Table(
    "population_of_the_settlement",
    metadata,
    Column("id_population_of_the_settlement", INTEGER, primary_key=True, unique=True, autoincrement=True),
    Column("interval", VARCHAR(length=30), nullable=False)
)

