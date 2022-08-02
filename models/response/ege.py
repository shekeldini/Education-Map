from typing import Optional

from pydantic import BaseModel


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
