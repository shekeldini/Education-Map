from typing import Optional, List

from fastapi import Query
from pydantic import BaseModel, validator
from pydantic.dataclasses import dataclass


@dataclass
class Search():
    oo_name: str = Query(default="")

    @validator("oo_name")
    def validate_oo_name(cls, oo_name: str):
        return oo_name.replace('"', "").replace("'", "").replace(";", "")


class SearchResult(BaseModel):
    id_oo: int
    oo_login: str
    year: str
    oo_name: str
    oo_address: Optional[str] = None
    director: Optional[str] = None
    email_oo: Optional[str] = None
    phone_number: Optional[str] = None
    coordinates: str
    url: Optional[str] = None
    district_name: str


class SearchResponse(BaseModel):
    items: List[Optional[SearchResult]]
