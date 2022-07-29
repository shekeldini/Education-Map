from typing import List
from fastapi import APIRouter, Depends, Response, Path
from models.request.digital import RequestDigital
from models.response.digital import ResponseDigital
from repositories.digital import DigitalRepository
from .depends import get_digital_repository

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: List[RequestDigital],
        digital_repository: DigitalRepository = Depends(get_digital_repository),
):
    for item in model:
        await digital_repository.create(item)


@router.get("/get_by_id/{id_oo}", response_model=ResponseDigital)
async def get_all(
        id_oo: int = Path(...),
        digital_repository: DigitalRepository = Depends(get_digital_repository)
):
    return await digital_repository.get_by_id(id_oo)
