from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from models.response.users import ResponseUsers
from repositories.roles import RolesRepository
from models.response.roles import ResponseRoles
from .depends import get_roles_repository, get_current_user

router = APIRouter()


@router.get("/", response_model=List[ResponseRoles])
async def read_roles(
        roles: RolesRepository = Depends(get_roles_repository),
        limit: int = 100,
        skip: int = 0,
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await roles.get_all(limit=limit, skip=skip)


@router.post("/")
async def create_role(
        role: str,
        roles: RolesRepository = Depends(get_roles_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await roles.create(role)


@router.delete("/", response_model=ResponseRoles)
async def delete_role(
        id_role: int,
        roles: RolesRepository = Depends(get_roles_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await roles.delete(id_role)


@router.put("/", response_model=ResponseRoles)
async def update_role(
        id_role: int,
        role: str,
        roles: RolesRepository = Depends(get_roles_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await roles.update(id_role, role)
