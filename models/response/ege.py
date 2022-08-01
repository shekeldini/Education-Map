from typing import Optional

from pydantic import BaseModel


class Rus(BaseModel):
    oo_name: str
    district_name: str
    low: float
    medium: float
    high: float


class MathProf(BaseModel):
    oo_name: str
    district_name: str
    low: float
    medium: float
    high: float


class MathBase(BaseModel):
    oo_name: str
    district_name: str
    low: float
    medium: float


class StatisticRus(BaseModel):
    low: float
    medium: float
    high: float


class StatisticMathProf(BaseModel):
    low: float
    medium: float
    high: float


class StatisticMathBase(BaseModel):
    low: float
    medium: float


class Statistic(BaseModel):
    rus: Optional[StatisticRus] = None
    math_base: Optional[StatisticMathBase] = None
    math_prof: Optional[StatisticMathProf] = None


class ResponseEge(BaseModel):
    oo_name: str
    district_name: str
    subject: Statistic
