from typing import Optional, List
from pydantic import BaseModel


class SearchResult(BaseModel):
    id_oo: int
    oo_name: str
    coordinates: str
    district_name: str


class ResponseSearch(BaseModel):
    items: List[Optional[SearchResult]]
