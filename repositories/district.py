from typing import List, Optional
from db.district import district
from models.district import District
from .base import BaseRepository


class DistrictRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[District]:
        query = district.select().limit(limit).offset(skip)
        return [District.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_district: int) -> Optional[District]:
        query = district.select().where(district.c.id_district == id_district)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return District.parse_obj(res)

    async def get_by_name(self, district_name: str) -> Optional[District]:
        query = district.select().where(district.c.district_name == district_name)

        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return District.parse_obj(res)

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

    async def get_district_name_for_oo(self, id_oo: int):
        query = """
        SELECT district_name FROM district
        WHERE id_district IN
        (
            SELECT id_district FROM name_of_the_settlement
            WHERE id_name_of_the_settlement IN
            (
                SELECT id_name_of_the_settlement FROM oo
                WHERE id_oo = :id_oo
            )
        );
        """
        res = await self.database.fetch_one(query=query, values={"id_oo": id_oo})
        return res.district_name
