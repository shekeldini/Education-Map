from fastapi import Query
from pydantic import validator
from pydantic.dataclasses import dataclass


@dataclass
class RequestSearch():
    oo_name: str = Query(default="")

    @validator("oo_name")
    def validate_oo_name(cls, oo_name: str):
        return oo_name.replace('"', "").replace("'", "").replace(";", "")

