from typing import Optional
from pydantic import BaseModel, validator


class RequestOO(BaseModel):
    oo_login: str
    filial: Optional[bool] = False
    filial_number: Optional[int] = None
    id_district: int
    oo_name: str
    oo_address: str
    director: str
    email_oo: str
    phone_number: str
    key_ege: Optional[int] = None
    coordinates: str
    url: str
    show: Optional[bool] = True

    @validator("coordinates")
    def correct_coordinates(cls, coordinates: str, **kwargs):
        if coordinates and len(coordinates.split(";")) != 2:
            raise ValueError("Incorrect coordinates type.\nCorrect example: 'x;y'")
        return coordinates
