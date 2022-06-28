from typing import Optional
from db.digital_environment import digital_environment
from models.oo import OO
from models.digital_environment_import import DigitalItem, DigitalGet
from .base import BaseRepository
from .district import DistrictRepository


class DigitalEnvironment(BaseRepository):
    async def get_all(self, year: str) -> DigitalGet:
        query = """
        SELECT 
            oo_login, year, oo_name, 
            oo_address, director, 
            email_oo, phone_number, coordinates, 
            url, REPLACE(district_name, '_', ' ') as district_name 
        FROM digital_environment
        WHERE year = :year
        """
        res = await self.database.fetch_all(query=query, values={"year": year})
        if not res:
            return DigitalGet(items=[])
        return DigitalGet(
            items=[DigitalItem.parse_obj(row) for row in res]
        )

    async def create(self, item: OO):
        district_repository = DistrictRepository(self.database)
        new_item = DigitalItem(
            oo_login=item.oo_login,
            year=item.year,
            oo_name=item.oo_name,
            oo_address=item.oo_address,
            director=item.director,
            email_oo=item.email_oo,
            phone_number=item.phone_number,
            coordinates=item.coordinates,
            url=item.url,
            district_name=await district_repository.get_district_name_for_oo(item.id_oo)
        )
        values = {**new_item.dict()}
        query = digital_environment.insert().values(**values)
        return await self.database.execute(query=query)

    async def get_one(self, oo_login: str, year: str) -> Optional[DigitalItem]:
        query = digital_environment.select().where(
            (digital_environment.c.oo_login == oo_login) &
            (digital_environment.c.year == year)
        )
        res = await self.database.fetch_one(query=query)
        if not res:
            return None
        return DigitalItem.parse_obj(res)
