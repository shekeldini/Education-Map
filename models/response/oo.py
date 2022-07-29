from typing import Optional
from pydantic import BaseModel


class ResponseOO(BaseModel):
    oo_name: str
    oo_address: str
    director: str
    email_oo: str
    phone_number: str
    coordinates: str
    url: str


class ResponseOOLoginOOName(BaseModel):
    oo_login: str
    oo_name: str


class ResponseOOLoginUrl(BaseModel):
    oo_login: str
    url: str

