from pydantic import BaseModel


class ResponseToken(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class ResponseAccessToken(BaseModel):
    access_token: str
