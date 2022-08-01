from typing import List
from fastapi import APIRouter, Depends, Response, Path
from models.request.ege import RequestEge
from models.response.ege import ResponseEge
from repositories.ege import EgeRepository
from .depends import get_ege_repository

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: List[RequestEge],
        ege_repository: EgeRepository = Depends(get_ege_repository)
):
    for item in model:
        await ege_repository.create(item)


@router.get("/get_by_id/{id_oo}", response_model=ResponseEge)
async def get_all(
        id_oo: int = Path(...),
        ege_repository: EgeRepository = Depends(get_ege_repository)
):
    return await ege_repository.get_by_id(id_oo)
