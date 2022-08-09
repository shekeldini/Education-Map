from typing import Any, Optional
from pydantic import BaseModel, validator

from models.others.digital import DigitalDistrict
from models.others.vpr import VprStatistic
from models.response.ege import Statistic
from models.response.growing_point import GrowingPointCount


class BaseCommittee(BaseModel):
    district_name: str
    name: str
    address: str
    executive: str
    email: str
    phone_number: str
    coordinates: Any
    url: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class ResponseCommittee(BaseModel):
    base: BaseCommittee
    ege: Statistic
    vpr: VprStatistic
    digital: Optional[DigitalDistrict]
    growing_point: Optional[GrowingPointCount]
