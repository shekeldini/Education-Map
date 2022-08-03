from pydantic import BaseModel
from typing import Optional
from models.response.digital import DigitalItem
from models.response.oo import ResponseOO
from models.response.vpr import ResponseVpr
from models.response.ege import ResponseEge


class ResponseInfo(BaseModel):
    digital: Optional[DigitalItem]
    base_info: ResponseOO
    growing_point: bool
    vpr: ResponseVpr
    ege: ResponseEge
