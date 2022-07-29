from sqlalchemy import Table, String, Column, Boolean, INTEGER
from .base import metadata

digital = Table(
    "digital",
    metadata,
    Column("id_oo", INTEGER, primary_key=True),
    Column("cos2020", Boolean, nullable=False),
    Column("cos2021", Boolean, nullable=False),
    Column("cos2022", Boolean, nullable=False),
    Column("osnash", Boolean, nullable=False),
    Column("klass", INTEGER, nullable=False),
    Column("klass_smart", INTEGER, nullable=False),
    Column("klass_ik", INTEGER, nullable=False),
    Column("arm_ped", INTEGER, nullable=False),
    Column("arm_adm", INTEGER, nullable=False),
    Column("i_panel", INTEGER, nullable=False),
    Column("notebook", INTEGER, nullable=False),
    Column("mfu", INTEGER, nullable=False),
    Column("ped_notebook", INTEGER, nullable=False),
    Column("adm_notebook", INTEGER, nullable=False),
    Column("server", INTEGER, nullable=False),
    Column("smart_tv", INTEGER, nullable=False),
    Column("ip_camera", INTEGER, nullable=False),
    Column("ik", INTEGER, nullable=False)
)

