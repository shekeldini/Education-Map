from pydantic import BaseModel


class RequestGrowingPoint(BaseModel):
    id_oo: int
    growing_point: bool