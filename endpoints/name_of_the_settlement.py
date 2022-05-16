from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.name_of_the_settlement import NameOfTheSettlementRepository
from models.name_of_the_settlement import NameOfTheSettlement, NameOfTheSettlementIn
from .depends import get_name_of_the_settlement_repository

router = APIRouter()


@router.get("/get_all", response_model=List[NameOfTheSettlement])
async def read_name_of_the_settlement(
        name_of_the_settlement: NameOfTheSettlementRepository = Depends(get_name_of_the_settlement_repository),
        limit: int = 100,
        skip: int = 0):
    return await name_of_the_settlement.get_all(limit=limit, skip=skip)


@router.get("/get_by_id", response_model=NameOfTheSettlement)
async def read_name_of_the_settlement_by_id(
        id_name_of_the_settlement: int,
        name_of_the_settlement: NameOfTheSettlementRepository = Depends(get_name_of_the_settlement_repository)):
    return await name_of_the_settlement.get_by_id(id_name_of_the_settlement)


@router.get("/get_by_name", response_model=NameOfTheSettlement)
async def read_name_of_the_settlement_by_name(
        name: str,
        name_of_the_settlement: NameOfTheSettlementRepository = Depends(get_name_of_the_settlement_repository)):
    return await name_of_the_settlement.get_by_name(name)


@router.post("/", response_model=NameOfTheSettlement)
async def create_name_of_the_settlement(
        name_of_the_settlement_in: NameOfTheSettlementIn,
        name_of_the_settlement: NameOfTheSettlementRepository = Depends(get_name_of_the_settlement_repository)):
    return await name_of_the_settlement.create(name_of_the_settlement_in)


@router.delete("/", response_model=NameOfTheSettlement)
async def delete_name_of_the_settlement(
        id_name_of_the_settlement: int,
        name_of_the_settlement: NameOfTheSettlementRepository = Depends(get_name_of_the_settlement_repository)):
    return await name_of_the_settlement.delete(id_name_of_the_settlement)


@router.put("/", response_model=NameOfTheSettlement)
async def update_name_of_the_settlement(
        id_name_of_the_settlement: int,
        name_of_the_settlement_in: NameOfTheSettlementIn,
        name_of_the_settlement: NameOfTheSettlementRepository = Depends(get_name_of_the_settlement_repository)):
    return await name_of_the_settlement.update(id_name_of_the_settlement, name_of_the_settlement_in)
