from typing import Optional, List

from pydantic import BaseModel, validator


class EgeItem(BaseModel):
    id_oo: str
    coordinates: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class ResponseAllEge(BaseModel):
    items: List[EgeItem]


class Rus(BaseModel):
    low: float
    medium: float
    high: float


class MathProf(BaseModel):
    low: float
    medium: float
    high: float


class MathBase(BaseModel):
    low: float
    medium: float


class Statistic(BaseModel):
    rus: Optional[Rus] = None
    math_base: Optional[MathBase] = None
    math_prof: Optional[MathProf] = None


class ResponseEge(BaseModel):
    oo_name: str
    district_name: str
    subject: Statistic
