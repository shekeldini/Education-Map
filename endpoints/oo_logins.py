from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.oo_logins import OOLoginsRepository
from models.oo_logins import OOLogins
from .depends import get_oo_logins_repository

router = APIRouter()


@router.get("/get_all", response_model=List[OOLogins])
async def read_oo_logins(
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository),
        limit: int = 100,
        skip: int = 0):
    return await oo_logins.get_all(limit=limit, skip=skip)


@router.get("/get_by_oo_login", response_model=OOLogins)
async def read_oo_logins_by_oo_login(
        oo_login: str,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository)):
    return await oo_logins.get_by_oo_login(oo_login)


@router.post("/", response_model=OOLogins)
async def create_oo_login(
        oo_login: str,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository)):
    return await oo_logins.create(oo_login)


@router.delete("/", response_model=OOLogins)
async def delete_oo_login(
        oo_login: str,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository)):
    return await oo_logins.delete(oo_login)


@router.put("/", response_model=OOLogins)
async def update_oo_login(
        oo_login: str,
        new_oo_login: str,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository)):
    return await oo_logins.update(oo_login, new_oo_login)
