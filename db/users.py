import datetime
from sqlalchemy import Table, INTEGER, String, Column, ForeignKey
from .base import metadata

users = Table(
    "users",
    metadata,
    Column("id_user", INTEGER, primary_key=True, unique=True, autoincrement=True),
    Column("login", String, nullable=False, unique=True),
    Column("name", String, nullable=False),
    Column("password", String, nullable=False),
    Column("id_role", INTEGER, ForeignKey('roles.id_role'), nullable=False),
    Column("time", INTEGER, nullable=False, default=datetime.datetime.utcnow)
)

