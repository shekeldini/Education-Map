from typing import Optional

from pydantic import BaseModel


class RequestEge(BaseModel):
    id_oo: int
    id_subject: int
    low: float
    medium: float
    high: Optional[float] = None
    count_low: int
    count_medium: int
    count_high: Optional[int] = None
    count_student: int


