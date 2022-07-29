from typing import Optional

from pydantic import BaseModel


class ResponseDistrict(BaseModel):
    id_district: int
    id_region: Optional[int] = None
    district_name: str
