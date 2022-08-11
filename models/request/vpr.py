from pydantic import BaseModel


class RequestVpr(BaseModel):
    id_oo: int
    id_subject: int
    parallel: int
    low: float
    medium: float
    high: float
    count_low: int
    count_medium: int
    count_high: int

