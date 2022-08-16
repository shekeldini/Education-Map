from typing import List
from fastapi import APIRouter, Depends, Response, Path, HTTPException, status
from models.request.vpr import RequestVpr
from models.response.users import ResponseUsers
from models.response.vpr import ResponseVpr, ResponseAllVpr
from repositories.vpr import VprRepository
from .depends import get_vpr_repository, get_current_user

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: List[RequestVpr],
        vpr_repository: VprRepository = Depends(get_vpr_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    for item in model:
        await vpr_repository.create(item)


@router.get("/get_by_id/{id_oo}", response_model=ResponseVpr)
async def get_all(
        id_oo: int = Path(...),
        vpr_repository: VprRepository = Depends(get_vpr_repository)
):
    return await vpr_repository.get_by_id(id_oo)


@router.get("/get_all", response_model=ResponseAllVpr)
async def get_all_vpr(
        vpr_repository: VprRepository = Depends(get_vpr_repository)
):
    return await vpr_repository.get_all()
