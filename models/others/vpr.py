from typing import Optional

from pydantic import BaseModel


class VprSubjectResult(BaseModel):
    low: float
    medium: float
    high: float


class VprParallelResult(BaseModel):
    math: Optional[VprSubjectResult]
    rus: Optional[VprSubjectResult]


class VprStatistic(BaseModel):
    parallel_4: VprParallelResult
    parallel_5: VprParallelResult
    parallel_6: VprParallelResult
    parallel_7: VprParallelResult
    parallel_8: VprParallelResult
