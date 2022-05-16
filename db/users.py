import datetime

from sqlalchemy import Table, INTEGER, String, Column, ForeignKey
from sqlalchemy.dialects.postgresql import BYTEA
from .base import metadata

users = Table(
    "users",
    metadata,
    Column("id_user", INTEGER, primary_key=True, unique=True, autoincrement=True),
    Column("login", String, nullable=False, unique=True),
    Column("name", String, nullable=False),
    Column("email", String, nullable=True),
    Column("phone", String, nullable=True),
    Column("password", String, nullable=False),
    Column("avatar", BYTEA, nullable=True),
    Column("id_role", INTEGER, ForeignKey('roles.id_role'), nullable=False),
    Column("time", INTEGER, nullable=False, default=datetime.datetime.utcnow)
)

