from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.oo import OORepository
from models.oo import OO, OOIn, OOLoginOOName
from .depends import get_oo_repository

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


@router.get("/get_by_district_and_id_user_and_years", response_model=List[OOLoginOOName])
async def read_by_district_and_id_user_and_years(
        id_district: int,
        id_user: int,
        years: str,
        oo_logins: OORepository = Depends(get_oo_repository)):
    return await oo_logins.get_by_district_and_id_user_and_years(id_district, id_user, years)


@router.post("/", response_model=OO)
async def create_oo(
        oo_in: OOIn,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.create(oo_in)


@router.delete("/", response_model=OO)
async def delete_district(
        id_oo: int,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.delete(id_oo)


@router.put("/", response_model=OO)
async def update_district(
        id_oo: int,
        oo_in: OOIn,
        oo: OORepository = Depends(get_oo_repository)):
    return await oo.update(id_oo, oo_in)