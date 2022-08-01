from pydantic import BaseModel


class RequestUser(BaseModel):
    login: str
    name: str
    password: str
    id_role: int

