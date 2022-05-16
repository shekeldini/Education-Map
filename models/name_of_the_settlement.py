from typing import Optional
from pydantic import BaseModel


class NameOfTheSettlement(BaseModel):
    id_name_of_the_settlement: Optional[int] = None
    id_district: int
    id_oo_location_type: int
    name: str


class NameOfTheSettlementIn(BaseModel):
    id_district: int
    id_oo_location_type: int
    name: str
