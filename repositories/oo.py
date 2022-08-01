from typing import List, Optional
from db.oo import oo
from models.request.oo import RequestOO
from models.response.oo import ResponseOO, ResponseOOLoginUrl
from models.response.search import ResponseSearch, SearchResult
from .base import BaseRepository


class OORepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[ResponseOO]:
        query = oo.select().limit(limit).offset(skip)
        return [ResponseOO.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_oo: int) -> Optional[ResponseOO]:
        query = """
        SELECT 
            oo.id_oo,
            oo.id_district,
            oo.oo_name,
            oo.oo_address,
            oo.director,
            oo.email_oo,
            oo.phone_number,
            oo.coordinates,
            oo.url,
            district.district_name
        FROM oo
            LEFT JOIN district ON
                oo.id_district = district.id_district
            WHERE oo.id_oo = :id_oo ;
        """
        res = await self.database.fetch_one(query, {"id_oo": id_oo})
        if res is None:
            return None
        return ResponseOO.parse_obj(res)

    async def exist(self, oo_login: str, filial: bool) -> bool:
        query = """
        SELECT * FROM oo 
        WHERE oo_login = :oo_login
        AND filial = :filial;"""

        res = await self.database.fetch_one(query, {
            "oo_login": oo_login,
            "filial": filial
        })
        return bool(res)

    async def get_by_district(self, id_district: int) -> Optional[List[ResponseOO]]:
        query = """
        SELECT 
            oo.id_oo,
            oo.id_district,
            oo.oo_name,
            oo.oo_address,
            oo.director,
            oo.email_oo,
            oo.phone_number,
            oo.coordinates,
            oo.url,
            district.district_name
        FROM oo
            LEFT JOIN district ON
                oo.id_district = district.id_district
            WHERE oo.id_district = :id_district 
            AND show = TRUE
        ORDER BY oo.oo_name;
        """

        res = await self.database.fetch_all(query, {
            "id_district": id_district
        })
        if res is None:
            return None
        return [ResponseOO.parse_obj(i) for i in res]

    async def get_all_by_year(self, year: int) -> Optional[List[ResponseOO]]:
        query = """
        SELECT * FROM oo 
        WHERE year = :year ;
        """

        res = await self.database.fetch_all(query, {"year": year})
        if res is None:
            return None
        return [ResponseOO.parse_obj(i) for i in res]

    async def get_all_oo_url_by_year(self, year: int) -> Optional[List[ResponseOOLoginUrl]]:
        query = """
        SELECT oo_login, url FROM oo 
        WHERE year = :year 
        AND url != '';
        """
        res = await self.database.fetch_all(query, {"year": year})
        if res is None:
            return None
        return [ResponseOOLoginUrl.parse_obj(i) for i in res]

    async def import_oo(self, items: List[RequestOO]):
        for item in items:
            values = {**item.dict()}
            query = oo.insert().values(**values)
            await self.database.execute(query)

    async def delete(self, id_oo: int):
        query = oo.delete().where(oo.c.id_oo == id_oo)
        return await self.database.execute(query=query)

    async def update(self, id_oo: int, item: RequestOO):
        values = {**item.dict()}
        query = oo.update().where(oo.c.id_oo == id_oo).values(**values)
        return await self.database.execute(query=query)

    async def search(self, oo_name: str) -> ResponseSearch:

        query = f"""
        SELECT id_oo, oo_login, year, oo_name, oo_address, director, email_oo, phone_number, coordinates, url, REPLACE(district_name, '_', ' ') as district_name FROM 
        (
            SELECT * FROM oo 
            WHERE oo.year= 2022
            AND LOWER(oo.oo_name) like '%{oo_name.lower()}%'
            AND oo.coordinates != ''
        ) as t1
        
        LEFT JOIN 
        (
            SELECT district.id_district, district.district_name FROM district
            LEFT JOIN district ON district.id_district = oo.id_district
        ) as t2
        USING (id_district)
        Order By district_name, oo_name;
        """
        res = await self.database.fetch_all(query=query)
        if not res:
            return ResponseSearch(items=[])
        return ResponseSearch(items=[SearchResult.parse_obj(row) for row in res])
