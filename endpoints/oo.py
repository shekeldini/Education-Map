from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Path
from models.request.search import RequestSearch
from models.response.search import ResponseSearch
from models.response.users import ResponseUsers
from repositories.oo import OORepository
from models.request.oo import RequestOO
from models.response.oo import ResponseOO
from .depends import get_oo_repository, get_current_user

router = APIRouter()


@router.get("/get_all", response_model=List[ResponseOO])
async def read_oo(
        oo: OORepository = Depends(get_oo_repository),
        limit: int = 100,
        skip: int = 0):
    return await oo.get_all(limit=limit, skip=skip)


@router.get("/get_by_district/{id_district}", response_model=List[ResponseOO])
async def read_oo_by_district(
        id_district: int = Path(...),
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.get_by_district(id_district)


@router.get("/search", response_model=ResponseSearch)
async def search_oo_name(
        model: RequestSearch = Depends(),
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.search(model.oo_name)


@router.post("/")
async def import_oo(
        items: List[RequestOO],
        oo: OORepository = Depends(get_oo_repository)
):
    return await oo.import_oo(items)


@router.delete("/")
async def delete_district(
        id_oo: int,
        oo: OORepository = Depends(get_oo_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo.delete(id_oo)


@router.put("/")
async def update_district(
        id_oo: int,
        oo_in: RequestOO,
        oo: OORepository = Depends(get_oo_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo.update(id_oo, oo_in)
