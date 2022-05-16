from typing import List, Optional
from db.oo import oo
from models.oo import OO, OOIn, OOLoginOOName
from .base import BaseRepository


class OORepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[OO]:
        query = oo.select().limit(limit).offset(skip)
        return [OO.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_oo: int) -> Optional[OO]:
        query = oo.select().where(oo.c.id_oo == id_oo)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return OO.parse_obj(res)

    async def get_by_oo_login_and_year(self, oo_login: str, year: str) -> Optional[OO]:
        query = """
        SELECT * FROM oo 
        WHERE oo_login = :oo_login
        AND year = :year ;"""

        res = await self.database.fetch_one(query, {"oo_login": oo_login,
                                                    "year": year})
        if res is None:
            return None
        return OO.parse_obj(res)

    async def get_by_district_and_id_user_and_years(
            self,
            id_district: int,
            id_user: int,
            years: str
    ) -> Optional[List[OOLoginOOName]]:

        years = years.split(",")
        last_year = years.pop()
        query = f"""
            SELECT oo_login, oo_name FROM
            (
                SELECT oo_login FROM oo 
                WHERE year = :last_year  
                AND id_name_of_the_settlement IN 
                (
                    SELECT id_name_of_the_settlement FROM name_of_the_settlement 
                    WHERE id_district = :id_district
                ) 
                AND id_oo IN 
                (
                    SELECT id_oo FROM oo_parallels
                )
                AND oo_login in 
                (
                    SELECT oo_login FROM users_oo_logins 
                    WHERE id_user = :id_user
                ) """
        values = {
            "last_year": last_year,
            "id_district": id_district,
            "id_user": id_user
        }
        if years:
            for i, year in enumerate(years):
                query += f"""
                    INTERSECT
                    SELECT oo_login FROM oo 
                    WHERE year = :year_{i} 
                    AND id_name_of_the_settlement IN 
                    (
                        SELECT id_name_of_the_settlement FROM name_of_the_settlement 
                        WHERE id_district = :id_district
                    ) 
                    AND id_oo IN 
                    (
                        SELECT id_oo FROM oo_parallels
                    )
                    AND oo_login in 
                    (
                        SELECT oo_login FROM users_oo_logins 
                        WHERE id_user = :id_user
                    ) """
                values[f"year_{i}"] = year
        query += """
        ) AS T1
        LEFT JOIN
        (
            SELECT oo_login, oo_name FROM oo 
            WHERE year = :last_year
        ) AS T2
        USING (oo_login);
        """

        res = await self.database.fetch_all(query, values)
        if res is None:
            return None
        return [OOLoginOOName.parse_obj(row) for row in res]

    async def create(self, oo_in: OOIn) -> OO:
        new_oo = OO(
            oo_login=oo_in.oo_login,
            year=oo_in.year,
            id_name_of_the_settlement=oo_in.id_name_of_the_settlement,
            id_organizational_and_legal_form=oo_in.id_organizational_and_legal_form,
            id_population_of_the_settlement=oo_in.id_population_of_the_settlement,
            oo_name=oo_in.oo_name,
            oo_full_name=oo_in.oo_full_name,
            oo_address=oo_in.oo_address,
            full_name_of_the_director=oo_in.full_name_of_the_director,
            email_oo=oo_in.email_oo,
            phone_number=oo_in.phone_number,
            inn=oo_in.inn,
            key_oge=oo_in.key_oge,
            key_ege=oo_in.key_ege,
            id_organisation_status=oo_in.id_organisation_status,
            place_index=oo_in.place_index,
            coordinates=oo_in.coordinates
        )
        values = {**new_oo.dict()}
        values.pop("id_oo", None)
        query = oo.insert().values(**values)
        new_oo.id_oo = await self.database.execute(query)
        return new_oo

    async def delete(self, id_oo: int):
        query = oo.delete().where(oo.c.id_oo == id_oo)
        return await self.database.execute(query=query)

    async def update(self, id_oo: int, oo_in: OOIn) -> OO:
        update_oo = OO(
            oo_login=oo_in.oo_login,
            year=oo_in.year,
            id_name_of_the_settlement=oo_in.id_name_of_the_settlement,
            id_organizational_and_legal_form=oo_in.id_organizational_and_legal_form,
            id_population_of_the_settlement=oo_in.id_population_of_the_settlement,
            oo_name=oo_in.oo_name,
            oo_full_name=oo_in.oo_full_name,
            oo_address=oo_in.oo_address,
            full_name_of_the_director=oo_in.full_name_of_the_director,
            email_oo=oo_in.email_oo,
            phone_number=oo_in.phone_number,
            inn=oo_in.inn,
            key_oge=oo_in.key_oge,
            key_ege=oo_in.key_ege,
            id_organisation_status=oo_in.id_organisation_status,
            place_index=oo_in.place_index,
            coordinates=oo_in.coordinates
        )
        values = {**update_oo.dict()}
        values.pop("id_oo", None)
        query = oo.update().where(oo.c.id_oo == id_oo).values(**values)
        await self.database.execute(query=query)
        return update_oo
