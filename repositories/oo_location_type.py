from typing import List
from db.oo_location_type import oo_location_type
from models.oo_location_type import OOLocationType
from .base import BaseRepository


class OOLocationTypeRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[OOLocationType]:
        query = oo_location_type.select().limit(limit).offset(skip)
        return [OOLocationType.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_oo_location_type: int) -> OOLocationType:
        query = oo_location_type.select().where(oo_location_type.c.id_oo_location_type == id_oo_location_type)
        return OOLocationType.parse_obj(await self.database.fetch_one(query))

    async def get_by_name(self, location_type: str) -> OOLocationType:
        query = oo_location_type.select().where(oo_location_type.c.location_type == location_type)
        return OOLocationType.parse_obj(await self.database.fetch_one(query))

    async def create(self, location_type: str) -> OOLocationType:
        new_oo_location_type = OOLocationType(
            location_type=location_type
        )
        values = {**new_oo_location_type.dict()}
        values.pop("id_oo_location_type", None)
        query = oo_location_type.insert().values(**values)
        new_oo_location_type.id_oo_location_type = await self.database.execute(query)
        return new_oo_location_type

    async def delete(self, id_district: int):
        query = oo_location_type.delete().where(oo_location_type.c.id_district == id_district)
        return await self.database.execute(query=query)

    async def update(self, id_oo_location_type: int, location_type: str) -> OOLocationType:
        update_oo_location_type = OOLocationType(
            id_oo_location_type=id_oo_location_type,
            location_type=location_type
        )
        values = {**update_oo_location_type.dict()}
        values.pop("id_oo_location_type", None)
        query = oo_location_type.update().where(oo_location_type.c.id_oo_location_type == id_oo_location_type).values(**values)
        await self.database.execute(query=query)
        return update_oo_location_type
