from typing import Optional
from pydantic import BaseModel, validator


class OO(BaseModel):
    id_oo: Optional[int] = None
    oo_login: str
    year: str
    id_name_of_the_settlement: Optional[int] = None
    id_organizational_and_legal_form: Optional[int] = None
    id_population_of_the_settlement: Optional[str] = None
    oo_name: Optional[str] = None
    oo_full_name: Optional[str] = None
    oo_address: Optional[str] = None
    full_name_of_the_director: Optional[str] = None
    email_oo: Optional[str] = None
    phone_number: Optional[str] = None
    inn: Optional[str] = None
    key_oge: Optional[str] = None
    key_ege: Optional[str] = None
    id_organisation_status: Optional[int] = None
    place_index: Optional[str] = None
    coordinates: Optional[str] = None


class OOLoginOOName(BaseModel):
    oo_login: str
    oo_name: str


class OOIn(BaseModel):
    oo_login: str
    year: str
    id_name_of_the_settlement: Optional[int] = None
    id_organizational_and_legal_form: Optional[int] = None
    id_population_of_the_settlement: Optional[str] = None
    oo_name: Optional[str] = None
    oo_full_name: Optional[str] = None
    oo_address: Optional[str] = None
    full_name_of_the_director: Optional[str] = None
    email_oo: Optional[str] = None
    phone_number: Optional[str] = None
    inn: Optional[str] = None
    key_oge: Optional[str] = None
    key_ege: Optional[str] = None
    id_organisation_status: Optional[int] = None
    place_index: Optional[str] = None
    coordinates: Optional[str] = None

    @validator("coordinates")
    def correct_coordinates(cls, coordinates: str, **kwargs):
        if coordinates and len(coordinates.split(";")) != 2:
            raise ValueError("Incorrect coordinates type.\nCorrect example: 'x;y'")
        return coordinates
