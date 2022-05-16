from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.roles import RolesRepository
from models.roles import Roles
from .depends import get_roles_repository

router = APIRouter()


@router.get("/", response_model=List[Roles])
async def read_roles(
        roles: RolesRepository = Depends(get_roles_repository),
        limit: int = 100,
        skip: int = 0):
    return await roles.get_all(limit=limit, skip=skip)


@router.post("/", response_model=Roles)
async def create_role(
        role: str,
        roles: RolesRepository = Depends(get_roles_repository)):
    return await roles.create(role)


@router.delete("/", response_model=Roles)
async def delete_role(
        id_role: int,
        roles: RolesRepository = Depends(get_roles_repository)):
    return await roles.delete(id_role)


@router.put("/", response_model=Roles)
async def update_role(
        id_role: int,
        role: str,
        roles: RolesRepository = Depends(get_roles_repository)):
    return await roles.update(id_role, role)
