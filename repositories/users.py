import math
import time
from typing import List, Optional
from db.users import users
from models.response.users import ResponseUsers
from models.request.users import RequestUser
from .base import BaseRepository
from core.security import hash_password


class UsersRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[ResponseUsers]:
        query = users.select().limit(limit).offset(skip)
        return [ResponseUsers.parse_obj(user) for user in await self.database.fetch_all(query)]

    async def get_by_id(self, id_user: int) -> Optional[ResponseUsers]:
        query = users.select().where(users.c.id_user == id_user)
        user = await self.database.fetch_one(query)
        if user is None:
            return None
        return ResponseUsers.parse_obj(user)

    async def get_by_login(self, login: str) -> Optional[ResponseUsers]:
        query = users.select().where(users.c.login == login)
        user = await self.database.fetch_one(query)
        if user is None:
            return None
        return ResponseUsers.parse_obj(user)

    async def create(self, item: RequestUser):
        values = {
            "login": item.login,
            "name": item.name,
            "password": hash_password(item.password),
            "id_role": item.id_role,
            "time": math.floor(time.time())
        }
        query = users.insert().values(**values)
        return await self.database.execute(query)

    async def import_users(self, user_list: List[RequestUser]):
        for user in user_list:
            await self.create(user)
        return

    async def delete(self, id_user: int):
        query = users.delete().where(users.c.id_user == id_user)
        return await self.database.execute(query=query)

    async def update(self, id_user: int, item: RequestUser):
        values = {
            "login": item.login,
            "name": item.name,
            "password": hash_password(item.password),
            "id_role": item.id_role,
            "time": math.floor(time.time())
        }
        query = users.update().where(users.c.id_user == id_user).values(**values)
        return await self.database.execute(query=query)
