from typing import List
from db.name_of_the_settlement import name_of_the_settlement
from models.name_of_the_settlement import NameOfTheSettlement, NameOfTheSettlementIn
from .base import BaseRepository


class NameOfTheSettlementRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[NameOfTheSettlement]:
        query = name_of_the_settlement.select().limit(limit).offset(skip)
        return [NameOfTheSettlement.parse_obj(res) for res in await self.database.fetch_all(query)]

    async def get_by_id(self, id_name_of_the_settlement: int) -> NameOfTheSettlement:
        query = name_of_the_settlement.select().where(
            name_of_the_settlement.c.id_name_of_the_settlement == id_name_of_the_settlement
        )
        return NameOfTheSettlement.parse_obj(await self.database.fetch_one(query))

    async def get_by_name(self, name: str) -> NameOfTheSettlement:
        query = name_of_the_settlement.select().where(name_of_the_settlement.c.name == name)
        return NameOfTheSettlement.parse_obj(await self.database.fetch_all(query))

    async def create(self, new: NameOfTheSettlementIn) -> NameOfTheSettlement:
        new_name_of_the_settlement = NameOfTheSettlement(
            id_district=new.id_district,
            id_oo_location_type=new.id_oo_location_type,
            name=new.name
        )
        values = {**new_name_of_the_settlement.dict()}
        values.pop("id_name_of_the_settlement", None)
        query = name_of_the_settlement.insert().values(**values)
        new_name_of_the_settlement.id_name_of_the_settlement = await self.database.execute(query)
        return new_name_of_the_settlement

    async def delete(self, id_name_of_the_settlement: int):
        query = name_of_the_settlement.delete().where(
            name_of_the_settlement.c.id_name_of_the_settlement == id_name_of_the_settlement
        )
        return await self.database.execute(query=query)

    async def update(self, id_name_of_the_settlement: int, new: NameOfTheSettlementIn) -> NameOfTheSettlement:
        update_name_of_the_settlement = NameOfTheSettlement(
            id_name_of_the_settlement=id_name_of_the_settlement,
            id_district=new.id_district,
            id_oo_location_type=new.id_oo_location_type,
            name=new.name
        )
        values = {**update_name_of_the_settlement.dict()}
        values.pop("id_name_of_the_settlement", None)
        query = name_of_the_settlement.update().where(
            name_of_the_settlement.c.id_name_of_the_settlement == id_name_of_the_settlement
        ).values(**values)
        await self.database.execute(query=query)
        return update_name_of_the_settlement
