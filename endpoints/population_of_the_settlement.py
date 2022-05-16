from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.population_of_the_settlement import PopulationOfTheSettlementRepository
from models.population_of_the_settlement import PopulationOfTheSettlement
from .depends import get_population_of_the_settlement_repository

router = APIRouter()


@router.get("/get_all", response_model=List[PopulationOfTheSettlement])
async def read_population_of_the_settlement(
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(get_population_of_the_settlement_repository),
        limit: int = 100,
        skip: int = 0):
    return await population_of_the_settlement.get_all(limit=limit, skip=skip)


@router.post("/", response_model=PopulationOfTheSettlement)
async def create_population_of_the_settlement(
        interval: str,
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(get_population_of_the_settlement_repository)):
    return await population_of_the_settlement.create(interval)


@router.delete("/", response_model=PopulationOfTheSettlement)
async def delete_population_of_the_settlement(
        id_population_of_the_settlement: int,
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(get_population_of_the_settlement_repository)):
    return await population_of_the_settlement.delete(id_population_of_the_settlement)


@router.put("/", response_model=PopulationOfTheSettlement)
async def update_population_of_the_settlement(
        id_population_of_the_settlement: int,
        interval: str,
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(get_population_of_the_settlement_repository)):
    return await population_of_the_settlement.update(id_population_of_the_settlement, interval)
