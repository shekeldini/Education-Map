from typing import Optional, List

from pydantic import BaseModel, validator

from models.others.ege import Rus, MathBase, MathProf


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


class Statistic(BaseModel):
    rus: Optional[Rus] = None
    math_base: Optional[MathBase] = None
    math_prof: Optional[MathProf] = None


class ResponseEge(BaseModel):
    oo_name: str
    district_name: str
    subject: Optional[Statistic]
