from typing import Optional

from pydantic import BaseModel, validator


class VprSubjectResult(BaseModel):
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


class VprParallelResult(BaseModel):
    math: Optional[VprSubjectResult]
    rus: Optional[VprSubjectResult]


class VprStatistic(BaseModel):
    parallel_4: VprParallelResult
    parallel_5: VprParallelResult
    parallel_6: VprParallelResult
    parallel_7: VprParallelResult
    parallel_8: VprParallelResult
