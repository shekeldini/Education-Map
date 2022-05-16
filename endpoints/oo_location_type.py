from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.oo_location_type import OOLocationTypeRepository
from models.oo_location_type import OOLocationType
from .depends import get_oo_location_type_repository

router = APIRouter()


@router.get("/", response_model=List[OOLocationType])
async def read_oo_location_type(
        oo_location_type: OOLocationTypeRepository = Depends(get_oo_location_type_repository),
        limit: int = 100,
        skip: int = 0):
    return await oo_location_type.get_all(limit=limit, skip=skip)


@router.post("/", response_model=OOLocationType)
async def create_oo_location_type(
        location_type: str,
        oo_location_type: OOLocationTypeRepository = Depends(get_oo_location_type_repository)):
    return await oo_location_type.create(location_type)


@router.delete("/", response_model=OOLocationType)
async def delete_oo_location_type(
        id_oo_location_type: int,
        oo_location_type: OOLocationTypeRepository = Depends(get_oo_location_type_repository)):
    return await oo_location_type.delete(id_oo_location_type)


@router.put("/", response_model=OOLocationType)
async def update_oo_location_type(
        id_oo_location_type: int,
        location_type: str,
        oo_location_type: OOLocationTypeRepository = Depends(get_oo_location_type_repository)):
    return await oo_location_type.update(id_oo_location_type, location_type)
