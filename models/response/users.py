from typing import Optional
from pydantic import BaseModel


class ResponseUsers(BaseModel):
    id_user: Optional[int] = None
    login: str
    name: str
    password: str
    id_role: int
    time: int

    def is_admin(self):
        return self.id_role == 1


