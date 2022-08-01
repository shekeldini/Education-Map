from typing import Optional
from pydantic import BaseModel


class ResponseRoles(BaseModel):
    id_role: Optional[int] = None,
    role: str
