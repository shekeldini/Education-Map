from typing import List

from pydantic import BaseModel, validator

from models.others.vpr import VprParallelResult


class VprItem(BaseModel):
    id_oo: str
    coordinates: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class ResponseAllVpr(BaseModel):
    items: List[VprItem]


class ResponseVpr(BaseModel):
    oo_name: str
    district_name: str
    parallel_4: VprParallelResult
    parallel_5: VprParallelResult
    parallel_6: VprParallelResult
    parallel_7: VprParallelResult
    parallel_8: VprParallelResult
