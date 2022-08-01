from typing import List, Optional
from db.oo_logins import oo_logins
from models.response.oo_logins import ResponseOOLogins
from db.oo import oo
from .base import BaseRepository


class OOLoginsRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> Optional[List[ResponseOOLogins]]:
        query = oo_logins.select().limit(limit).offset(skip)
        return [ResponseOOLogins.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id_oo(self, id_oo: int) -> Optional[ResponseOOLogins]:
        query = oo.select().where(oo.c.id_oo == id_oo)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return ResponseOOLogins.parse_obj(await self.database.fetch_one(query))

    async def create(self, item: ResponseOOLogins):
        values = {**item.dict()}
        query = oo_logins.insert().values(**values)
        return await self.database.execute(query)

    async def delete(self, oo_login: str):
        query = oo_logins.delete().where(oo_logins.c.oo_login == oo_login)
        return await self.database.execute(query=query)

    async def update(self, oo_login: str, new_oo_login: str):
        values = {"oo_login": new_oo_login}
        query = oo_logins.update().where(oo_logins.c.oo_login == oo_login).values(**values)
        return await self.database.execute(query=query)
