from pydantic import BaseModel

from models.response.digital import DigitalItem
from models.response.oo import ResponseOO


class ResponseInfo(BaseModel):
    digital: DigitalItem
    base_info: ResponseOO
