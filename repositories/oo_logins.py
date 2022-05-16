from typing import List, Optional
from db.oo_logins import oo_logins
from models.oo_logins import OOLogins
from db.oo import oo
from .base import BaseRepository


class OOLoginsRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[OOLogins]:
        query = oo_logins.select().limit(limit).offset(skip)
        return [OOLogins.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id_oo(self, id_oo: int) -> Optional[OOLogins]:
        query = oo.select().where(oo.c.id_oo == id_oo)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return OOLogins.parse_obj(await self.database.fetch_one(query))

    async def create(self, oo_login: str) -> OOLogins:
        new_oo_login = OOLogins(
            oo_login=oo_login
        )
        values = {**new_oo_login.dict()}
        query = oo_logins.insert().values(**values)
        new_district = await self.database.execute(query)
        return new_district

    async def delete(self, oo_login: str):
        query = oo_logins.delete().where(oo_logins.c.oo_login == oo_login)
        return await self.database.execute(query=query)

    async def update(self, oo_login: str, new_oo_login: str) -> OOLogins:
        update_oo_login = OOLogins(
            oo_login=new_oo_login
        )
        values = {**update_oo_login.dict()}
        query = oo_logins.update().where(oo_logins.c.oo_login == oo_login).values(**values)
        await self.database.execute(query=query)
        return update_oo_login
