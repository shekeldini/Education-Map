from typing import Optional
from pydantic import BaseModel


class Roles(BaseModel):
    id_role: Optional[int] = None,
    role: str
