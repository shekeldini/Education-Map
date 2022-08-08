from typing import Any
from pydantic import BaseModel, AnyUrl, validator


class ResponseOO(BaseModel):
    id_oo: int
    id_district: int
    filial: bool
    oo_name: str
    oo_address: str
    director: str
    email_oo: str
    phone_number: str
    coordinates: Any
    url: str
    district_name: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value


class ResponseOOLoginOOName(BaseModel):
    oo_login: str
    oo_name: str


class ResponseOOLoginUrl(BaseModel):
    oo_login: str
    url: str

