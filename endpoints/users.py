from typing import List

import openpyxl
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.users import UsersRepository
from models.response.users import ResponseUsers
from models.request.users import RequestUser
from .depends import get_users_repository, get_current_user

router = APIRouter()


@router.get("/get_all", response_model=List[ResponseUsers])
async def read_users(
        users: UsersRepository = Depends(get_users_repository),
        limit: int = 100,
        skip: int = 0,
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await users.get_all(limit=limit, skip=skip)


@router.get("/get_by_id", response_model=ResponseUsers)
async def read_user_by_id(
        id_user: int,
        users: UsersRepository = Depends(get_users_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await users.get_by_id(id_user)


@router.get("/get_by_login", response_model=ResponseUsers)
async def read_user_by_login(
        login: str,
        users: UsersRepository = Depends(get_users_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await users.get_by_login(login)


@router.post("/", response_model=ResponseUsers)
async def create_user(
        user: RequestUser,
        users: UsersRepository = Depends(get_users_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await users.create(user)


@router.delete("/", response_model=ResponseUsers)
async def delete_user(
        id_user: int,
        users: UsersRepository = Depends(get_users_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await users.delete(id_user)


@router.put("/", response_model=ResponseUsers)
async def update_user(
        id_user: int,
        user: RequestUser,
        users: UsersRepository = Depends(get_users_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    old_user = await users.get_by_id(id_user)
    if old_user is None or not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found user")
    return await users.update(id_user=id_user, item=user)
