from pydantic import BaseModel, validator


class Rus(BaseModel):
    low: float
    medium: float
    high: float


    @validator("low")
    def round_low_value(cls, value: float):
        return round(value, 2)

    @validator("medium")
    def round_medium_value(cls, value: float):
        return round(value, 2)

    @validator("high")
    def round_high_value(cls, value: float):
        return round(value, 2)


class MathProf(BaseModel):
    low: float
    medium: float
    high: float

    @validator("low")
    def round_low_value(cls, value: float):
        return round(value, 2)

    @validator("medium")
    def round_medium_value(cls, value: float):
        return round(value, 2)

    @validator("high")
    def round_high_value(cls, value: float):
        return round(value, 2)


class MathBase(BaseModel):
    low: float
    medium: float

    @validator("low")
    def round_low_value(cls, value: float):
        return round(value, 2)

    @validator("medium")
    def round_medium_value(cls, value: float):
        return round(value, 2)

