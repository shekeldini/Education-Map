from typing import List
from db.district import district
from models.district import District
from .base import BaseRepository


class DistrictRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[District]:
        query = district.select().limit(limit).offset(skip)
        return [District.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_district: int) -> District:
        query = district.select().where(district.c.id_district == id_district)
        return District.parse_obj(await self.database.fetch_one(query))

    async def get_by_name(self, district_name: str) -> District:
        query = district.select().where(district.c.district_name == district_name)
        return District.parse_obj(await self.database.fetch_all(query))

    async def create(self, district_name: str) -> District:
        new_district = District(
            district_name=district_name
        )
        values = {**new_district.dict()}
        values.pop("id_district", None)
        query = district.insert().values(**values)
        new_district.id_district = await self.database.execute(query)
        return new_district

    async def delete(self, id_district: int):
        query = district.delete().where(district.c.id_district == id_district)
        return await self.database.execute(query=query)

    async def update(self, id_district: int, district_name: str) -> District:
        update_district = District(
            id_district=id_district,
            district_name=district_name
        )
        values = {**update_district.dict()}
        values.pop("id_district", None)
        query = district.update().where(district.c.id_district == id_district).values(**values)
        await self.database.execute(query=query)
        return update_district
