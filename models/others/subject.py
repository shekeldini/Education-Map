from enum import Enum
from pydantic import BaseModel


class Subject(Enum):
    RUS = "Русский язык"
    MATH_PROF = "Профильная математика"
    MATH_BASE = "Базовая математика"
    MATH = "Математика"


class OONameDistrictName(BaseModel):
    oo_name: str
    district_name: str
