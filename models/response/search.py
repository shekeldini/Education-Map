from typing import Optional, List
from pydantic import BaseModel, validator


class SearchResult(BaseModel):
    id_oo: int
    oo_name: str
    coordinates: str
    oo_address: str
    district_name: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class ResponseSearch(BaseModel):
    items: List[Optional[SearchResult]]
