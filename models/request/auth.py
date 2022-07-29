from pydantic import BaseModel


class RequestAuth(BaseModel):
    login: str
    password: str
