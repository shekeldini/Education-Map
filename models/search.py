from typing import Optional, List

from fastapi import Query
from pydantic import BaseModel, validator
from pydantic.dataclasses import dataclass


@dataclass
class Search():
    oo_name: str = Query()

    @validator("oo_name")
    def validate_oo_name(cls, oo_name: str):
        return oo_name.replace('"', "").replace("'", "").replace(";", "")


class SearchResult(BaseModel):
    oo_name: str
    district_name: str
    coordinates: str


class SearchResponse(BaseModel):
    items: List[Optional[SearchResult]]
