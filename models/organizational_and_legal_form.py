from typing import Optional
from pydantic import BaseModel


class OrganizationalAndLegalForm(BaseModel):
    id_organizational_and_legal_form: Optional[int] = None,
    type_of_organizational_and_legal_form: str
