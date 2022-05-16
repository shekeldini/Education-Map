from typing import Optional
from pydantic import BaseModel


class PopulationOfTheSettlement(BaseModel):
    id_population_of_the_settlement: Optional[int] = None
    interval: str
