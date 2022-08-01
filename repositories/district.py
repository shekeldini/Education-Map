from typing import List, Optional
from db.district import district
from models.response.district import ResponseDistrict
from models.request.district import RequestDistrict
from .base import BaseRepository


class DistrictRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[ResponseDistrict]:
        query = district.select().limit(limit).offset(skip)
        return [ResponseDistrict.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_district: int) -> Optional[ResponseDistrict]:
        query = district.select().where(district.c.id_district == id_district)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return ResponseDistrict.parse_obj(res)

    async def get_by_name(self, district_name: str) -> Optional[ResponseDistrict]:
        query = district.select().where(district.c.district_name == district_name)

        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return ResponseDistrict.parse_obj(res)

    async def create(self, item: RequestDistrict):
        values = {**item.dict()}
        query = district.insert().values(**values)
        return await self.database.execute(query)

    async def import_district(self, items: List[RequestDistrict]):
        for item in items:
            await self.create(item)
        return

    async def delete(self, id_district: int):
        query = district.delete().where(district.c.id_district == id_district)
        return await self.database.execute(query=query)

    async def update(self, id_district: int, item: RequestDistrict) -> ResponseDistrict:
        values = {**item.dict()}
        values.pop("id_district", None)
        query = district.update().where(district.c.id_district == id_district).values(**values)
        return await self.database.execute(query=query)

    async def get_district_name_for_oo(self, id_oo: int):
        query = """
        SELECT district_name FROM district
        WHERE id_district IN
        (
            SELECT id_district FROM oo
            WHERE id_oo = :id_oo
        );
        """
        res = await self.database.fetch_one(query=query, values={"id_oo": id_oo})
        return res.district_name
