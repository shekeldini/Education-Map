from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from models.response.users import ResponseUsers
from repositories.oo_logins import OOLoginsRepository
from models.response.oo_logins import ResponseOOLogins
from .depends import get_oo_logins_repository, get_current_user

router = APIRouter()


@router.get("/get_all", response_model=List[ResponseOOLogins])
async def read_oo_logins(
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository),
        limit: int = 100,
        skip: int = 0):
    return await oo_logins.get_all(limit=limit, skip=skip)


@router.post("/", response_model=ResponseOOLogins)
async def create_oo_login(
        oo_login: ResponseOOLogins,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo_logins.create(oo_login)


@router.delete("/", response_model=ResponseOOLogins)
async def delete_oo_login(
        oo_login: str,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo_logins.delete(oo_login)


@router.put("/", response_model=ResponseOOLogins)
async def update_oo_login(
        oo_login: str,
        new_oo_login: str,
        oo_logins: OOLoginsRepository = Depends(get_oo_logins_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await oo_logins.update(oo_login, new_oo_login)
