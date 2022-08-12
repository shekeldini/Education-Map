from typing import List, Optional

from pydantic import BaseModel, validator

from models.others.oo import OOName


class GrowingPointItem(BaseModel):
    id_oo: str
    coordinates: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class ResponseGrowingPoint(BaseModel):
    items: List[GrowingPointItem]


class GrowingPointSchools(BaseModel):
    items: List[Optional[OOName]]


class GrowingPointCheck(BaseModel):
    growing_point: bool
