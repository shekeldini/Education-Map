from typing import Optional
from pydantic import BaseModel


class OOLocationType(BaseModel):
    id_oo_location_type: Optional[int] = None
    location_type: str
