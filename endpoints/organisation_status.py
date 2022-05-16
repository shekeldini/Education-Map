from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.organisation_status import OrganisationStatusRepository
from models.organisation_status import OrganisationStatus
from .depends import get_organisation_status_repository

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
        status: str,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository)):
    return await organisation_status.create(status)


@router.delete("/", response_model=OrganisationStatus)
async def delete_organisation_status(
        id_organisation_status: int,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository)):
    return await organisation_status.delete(id_organisation_status)


@router.put("/", response_model=OrganisationStatus)
async def update_organisation_status(
        id_organisation_status: int,
        status: str,
        organisation_status: OrganisationStatusRepository = Depends(get_organisation_status_repository)):
    return await organisation_status.update(id_organisation_status, status)
