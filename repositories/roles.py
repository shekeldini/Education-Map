from typing import List, Optional
from db.roles import roles
from models.response.roles import ResponseRoles
from .base import BaseRepository


class RolesRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[ResponseRoles]:
        query = roles.select().limit(limit).offset(skip)
        return [ResponseRoles.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_role: int) -> Optional[ResponseRoles]:
        query = roles.select().where(roles.c.id_role == id_role)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return ResponseRoles.parse_obj(res)

    async def get_by_name(self, role: str) -> Optional[ResponseRoles]:
        query = roles.select().where(roles.c.role == role)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return ResponseRoles.parse_obj(res)

    async def create(self, role: str):
        values = {"role": role}
        query = roles.insert().values(**values)
        return await self.database.execute(query)

    async def delete(self, id_role: int):
        query = roles.delete().where(roles.c.id_role == id_role)
        return await self.database.execute(query=query)

    async def update(self, id_role: int, role: str):
        values = {"role": role}
        query = roles.update().where(roles.c.id_role == id_role).values(**values)
        return await self.database.execute(query=query)
