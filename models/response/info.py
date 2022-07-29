from pydantic import BaseModel
from typing import Optional
from models.response.digital import DigitalItem
from models.response.oo import ResponseOO


class ResponseInfo(BaseModel):
    digital: Optional[DigitalItem]
    base_info: ResponseOO
