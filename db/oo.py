from sqlalchemy import Table, INTEGER, Column, ForeignKey, VARCHAR, String
from .base import metadata

oo = Table(
    "oo",
    metadata,
    Column("id_oo", INTEGER, primary_key=True, autoincrement=True),
    Column("oo_login", VARCHAR(length=20), ForeignKey('oo_logins.oo_login'), unique=True, nullable=False),
    Column("year", VARCHAR(length=4), unique=True, nullable=False),
    Column("id_name_of_the_settlement", INTEGER, ForeignKey('name_of_the_settlement.id_name_of_the_settlement'), nullable=True),
    Column("id_organizational_and_legal_form", INTEGER, ForeignKey('organizational_and_legal_form.id_organizational_and_legal_form'), nullable=True),
    Column("id_population_of_the_settlement", INTEGER, ForeignKey('population_of_the_settlement.id_population_of_the_settlement'), nullable=True),
    Column("oo_name", VARCHAR(length=300), nullable=True),
    Column("oo_full_name", VARCHAR(length=300), nullable=True),
    Column("oo_address", VARCHAR(length=300), nullable=True),
    Column("full_name_of_the_director", VARCHAR(length=60), nullable=True),
    Column("email_oo", VARCHAR(length=40), nullable=True),
    Column("phone_number", String, nullable=True),
    Column("inn", VARCHAR(length=12), nullable=True),
    Column("key_oge", VARCHAR(length=12), nullable=True),
    Column("key_ege", VARCHAR(length=12), nullable=True),
    Column("id_organisation_status", INTEGER, ForeignKey('organisation_status.id_organisation_status'), nullable=True),
    Column("place_index", VARCHAR(length=7), nullable=True),
    Column("coordinates", String, nullable=True),
)

