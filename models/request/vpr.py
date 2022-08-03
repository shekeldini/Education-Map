from pydantic import BaseModel


class RequestVpr(BaseModel):
    id_oo: int
    id_subject: int
    parallel: int
    low: float
    medium: float
    high: float

