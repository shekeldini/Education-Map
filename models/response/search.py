from typing import Optional, List
from pydantic import BaseModel


class SearchResult(BaseModel):
    id_oo: int
    oo_login: str
    year: int
    oo_name: str
    oo_address: Optional[str] = None
    director: Optional[str] = None
    email_oo: Optional[str] = None
    phone_number: Optional[str] = None
    coordinates: str
    url: Optional[str] = None
    district_name: str


class ResponseSearch(BaseModel):
    items: List[Optional[SearchResult]]
