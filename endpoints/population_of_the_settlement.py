from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from models.users import Users
from repositories.population_of_the_settlement import PopulationOfTheSettlementRepository
from models.population_of_the_settlement import PopulationOfTheSettlement
from .depends import get_population_of_the_settlement_repository, get_current_user

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
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(
            get_population_of_the_settlement_repository
        ),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await population_of_the_settlement.create(interval)


@router.delete("/", response_model=PopulationOfTheSettlement)
async def delete_population_of_the_settlement(
        id_population_of_the_settlement: int,
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(
            get_population_of_the_settlement_repository
        ),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await population_of_the_settlement.delete(id_population_of_the_settlement)


@router.put("/", response_model=PopulationOfTheSettlement)
async def update_population_of_the_settlement(
        id_population_of_the_settlement: int,
        interval: str,
        population_of_the_settlement: PopulationOfTheSettlementRepository = Depends(
            get_population_of_the_settlement_repository
        ),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    return await population_of_the_settlement.update(id_population_of_the_settlement, interval)
