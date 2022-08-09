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