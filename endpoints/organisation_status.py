from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from models.users import Users
from repositories.organisation_status import OrganisationStatusRepository
from models.organisation_status import OrganisationStatus
from .depends import get_organisation_status_repository, get_current_user

router = APIRouter()


@router.get("/get_all", response_model=List[OrganisationStatus])
async def read_organisation_status(
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository),
        limit: int = 100,
        skip: int = 0):
    return await organisation_status.get_all(limit=limit, skip=skip)


@router.get("/get_by_id", response_model=OrganisationStatus)
async def read_organisation_status_by_id(
        id_organisation_status: int,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository)):
    return await organisation_status.get_by_id(id_organisation_status)


@router.post("/", response_model=OrganisationStatus)
async def create_organisation_status(
        new_status: str,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await organisation_status.create(new_status)


@router.delete("/", response_model=OrganisationStatus)
async def delete_organisation_status(
        id_organisation_status: int,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await organisation_status.delete(id_organisation_status)


@router.put("/", response_model=OrganisationStatus)
async def update_organisation_status(
        id_organisation_status: int,
        new_status: str,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await organisation_status.update(id_organisation_status, new_status)
