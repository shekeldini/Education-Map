from typing import Optional
from pydantic import BaseModel


class District(BaseModel):
    id_district: Optional[int] = None,
    district_name: str
