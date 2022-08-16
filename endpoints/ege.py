from typing import List
from fastapi import APIRouter, Depends, Response, Path, HTTPException, status
from models.request.ege import RequestEge
from models.response.ege import ResponseEge, ResponseAllEge
from models.response.users import ResponseUsers

from repositories.ege import EgeRepository
from .depends import get_ege_repository, get_current_user

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: List[RequestEge],
        ege_repository: EgeRepository = Depends(get_ege_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    for item in model:
        await ege_repository.create(item)


@router.get("/get_by_id/{id_oo}", response_model=ResponseEge)
async def get_all(
        id_oo: int = Path(...),
        ege_repository: EgeRepository = Depends(get_ege_repository)
):
    return await ege_repository.get_by_id(id_oo)


@router.get("/get_all", response_model=ResponseAllEge)
async def get_all_ege(
        ege_repository: EgeRepository = Depends(get_ege_repository)
):
    return await ege_repository.get_all()