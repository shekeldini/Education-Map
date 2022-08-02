from pydantic import BaseModel, validator


class ResponseGrowingPoint(BaseModel):
    id_oo: str
    coordinates: str

    @validator("coordinates")
    def validate(cls, value):
        if isinstance(value, str):
            return tuple(map(float, value.split(";")))
        return value
