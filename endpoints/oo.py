from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from models.users import Users
from repositories.oo import OORepository
from models.oo import OO, OOIn, OOLoginOOName, OOLoginUrl
from .depends import get_oo_repository, get_current_user

router = APIRouter()


@router.get("/get_all", response_model=List[OO])
async def read_oo(
        oo: OORepository = Depends(get_oo_repository),
        limit: int = 100,
        skip: int = 0):
    return await oo.get_all(limit=limit, skip=skip)


@router.get("/get_by_id", response_model=OO)
async def read_oo_by_id(
        id_oo: int,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.get_by_id(id_oo)


@router.get("/get_by_oo_login_and_year", response_model=OO)
async def read_oo_by_oo_login_and_year(
        oo_login: str,
        year: str,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.get_by_oo_login_and_year(oo_login, year)


@router.get("/get_all_by_year_and_id_district", response_model=List[OO])
async def read_oo_by_year_and_id_district(
        year: str,
        id_district: int,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.get_all_by_year_and_id_district(year, id_district)


@router.get("/get_all_by_year", response_model=List[OO])
async def read_oo_by_year(
        year: str,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.get_all_by_year(year)


@router.get("/get_all_oo_url_by_year", response_model=List[OOLoginUrl])
async def read_all_oo_url_by_year(
        year: str,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.get_all_oo_url_by_year(year)


@router.post("/", response_model=OO)
async def create_oo(
        oo_in: OOIn,
        oo: OORepository = Depends(get_oo_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo.create(oo_in)


@router.delete("/", response_model=OO)
async def delete_district(
        id_oo: int,
        oo: OORepository = Depends(get_oo_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo.delete(id_oo)


@router.put("/", response_model=OO)
async def update_district(
        id_oo: int,
        oo_in: OOIn,
        oo: OORepository = Depends(get_oo_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo.update(id_oo, oo_in)
