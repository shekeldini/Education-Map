from typing import List
from db.population_of_the_settlement import population_of_the_settlement
from models.population_of_the_settlement import PopulationOfTheSettlement
from .base import BaseRepository


class PopulationOfTheSettlementRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[PopulationOfTheSettlement]:
        query = population_of_the_settlement.select().limit(limit).offset(skip)
        return [PopulationOfTheSettlement.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_population_of_the_settlement: int) -> PopulationOfTheSettlement:
        query = population_of_the_settlement.select().where(
            population_of_the_settlement.c.id_population_of_the_settlement == id_population_of_the_settlement
        )
        return PopulationOfTheSettlement.parse_obj(await self.database.fetch_one(query))

    async def get_by_interval(self, interval: str) -> PopulationOfTheSettlement:
        query = population_of_the_settlement.select().where(
            population_of_the_settlement.c.interval == interval
        )
        return PopulationOfTheSettlement.parse_obj(await self.database.fetch_one(query))

    async def create(self, interval: str) -> PopulationOfTheSettlement:
        new_population_of_the_settlement = PopulationOfTheSettlement(
            interval=interval
        )
        values = {**new_population_of_the_settlement.dict()}
        values.pop("id_population_of_the_settlement", None)
        query = population_of_the_settlement.insert().values(**values)
        new_population_of_the_settlement.id_population_of_the_settlement = await self.database.execute(query)
        return new_population_of_the_settlement

    async def delete(self, id_population_of_the_settlement: int):
        query = population_of_the_settlement.delete().where(
            population_of_the_settlement.c.id_population_of_the_settlement == id_population_of_the_settlement
        )
        return await self.database.execute(query=query)

    async def update(self, id_population_of_the_settlement: int, interval: str) -> PopulationOfTheSettlement:
        update_population_of_the_settlement = PopulationOfTheSettlement(
            id_population_of_the_settlement=id_population_of_the_settlement,
            interval=interval
        )
        values = {**update_population_of_the_settlement.dict()}
        values.pop("id_oo_location_type", None)
        query = population_of_the_settlement.update().where(
            population_of_the_settlement.c.id_population_of_the_settlement == id_population_of_the_settlement
        ).values(**values)
        await self.database.execute(query=query)
        return update_population_of_the_settlement
