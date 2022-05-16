from typing import Optional
from pydantic import BaseModel


class OrganisationStatus(BaseModel):
    id_organisation_status: Optional[int] = None,
    status: str
