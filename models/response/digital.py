from typing import List
from pydantic import BaseModel, validator


class AllDigitalItem(BaseModel):
    id_oo: str
    coordinates: str
    cos2020: bool
    cos2021: bool
    cos2022: bool

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class DigitalItem(BaseModel):
    oo_name: str
    district_name: str
    cos2020: bool
    cos2021: bool
    cos2022: bool
    osnash: bool
    arm_ped: int
    arm_adm: int
    i_panel: int
    notebook: int
    mfu: int
    server: int
    smart_tv: int
    ip_camera: int
    ik: int


class ResponseAllDigital(BaseModel):
    items: List[AllDigitalItem]
