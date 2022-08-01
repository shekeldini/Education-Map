from typing import List
from pydantic import BaseModel


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


class ResponseDigital(BaseModel):
    items: List[DigitalItem]
