from typing import List, Optional
from pydantic import BaseModel


class DigitalImport(BaseModel):
    items: List[str]
    year: str


class DigitalItem(BaseModel):
    oo_login: str
    year: str
    oo_name: Optional[str] = None
    oo_address: Optional[str] = None
    director: Optional[str] = None
    email_oo: Optional[str] = None
    phone_number: Optional[str] = None
    coordinates: Optional[str] = None
    url: Optional[str] = None
    district_name: str


class DigitalGet(BaseModel):
    items: List[Optional[DigitalItem]]
