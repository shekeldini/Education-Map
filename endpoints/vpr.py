from typing import List
from fastapi import APIRouter, Depends, Response, Path
from models.request.vpr import RequestVpr
from models.response.vpr import ResponseVpr
from repositories.vpr import VprRepository
from .depends import get_vpr_repository

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: List[RequestVpr],
        vpr_repository: VprRepository = Depends(get_vpr_repository)
):
    for item in model:
        await vpr_repository.create(item)


@router.get("/get_by_id/{id_oo}", response_model=ResponseVpr)
async def get_all(
        id_oo: int = Path(...),
        vpr_repository: VprRepository = Depends(get_vpr_repository)
):
    return await vpr_repository.get_by_id(id_oo)
