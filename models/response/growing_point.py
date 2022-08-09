from typing import List

from pydantic import BaseModel, validator


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


class GrowingPointCount(BaseModel):
    count_true: int
    count_false: int


class GrowingPointCheck(BaseModel):
    growing_point: bool
