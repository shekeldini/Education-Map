from typing import List, Optional
from db.roles import roles
from models.roles import Roles
from .base import BaseRepository


class RolesRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[Roles]:
        query = roles.select().limit(limit).offset(skip)
        return [Roles.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_role: int) -> Optional[Roles]:
        query = roles.select().where(roles.c.id_role == id_role)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return Roles.parse_obj(res)

    async def get_by_name(self, role: str) -> Optional[Roles]:
        query = roles.select().where(roles.c.role == role)
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return Roles.parse_obj(res)

    async def create(self, role: str) -> Roles:
        new_role = Roles(
            role=role
        )
        values = {**new_role.dict()}
        values.pop("id_role", None)
        query = roles.insert().values(**values)
        new_role.id_role = await self.database.execute(query)
        return new_role

    async def delete(self, id_role: int):
        query = roles.delete().where(roles.c.id_role == id_role)
        return await self.database.execute(query=query)

    async def update(self, id_role: int, role: str) -> Roles:
        update_oo_location_type = Roles(
            id_role=id_role,
            role=role
        )
        values = {**update_oo_location_type.dict()}
        values.pop("id_role", None)
        query = roles.update().where(roles.c.id_role == id_role).values(**values)
        await self.database.execute(query=query)
        return update_oo_location_type
