from pydantic import BaseModel, validator




class RequestCommittee(BaseModel):
    id_district: int
    name: str
    address: str
    executive: str
    email: str
    phone_number: str
    coordinates: str
    url: str

    @validator("coordinates")
    def correct_coordinates(cls, coordinates: str, **kwargs):
        if coordinates and len(coordinates.split(";")) != 2:
            raise ValueError("Incorrect coordinates type.\nCorrect example: 'x;y'")
        return coordinates
