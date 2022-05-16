import math
import time
from typing import List, Optional
from db.users import users
from models.users import Users, UserIn
from .base import BaseRepository
from core.security import hash_password


class UsersRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[Users]:
        query = users.select().limit(limit).offset(skip)
        return [Users.parse_obj(user) for user in await self.database.fetch_all(query)]

    async def get_by_id(self, id_user: int) -> Optional[Users]:
        query = users.select().where(users.c.id_user == id_user)
        user = await self.database.fetch_one(query)
        if user is None:
            return None
        return Users.parse_obj(user)

    async def get_by_login(self, login: str) -> Optional[Users]:
        query = users.select().where(users.c.login == login)
        user = await self.database.fetch_one(query)
        if user is None:
            return None
        return Users.parse_obj(user)

    async def create(self, user: UserIn) -> Users:
        new_user = Users(
            login=user.login,
            name=user.name,
            email=user.email,
            phone=user.phone,
            password=hash_password(user.password),
            id_role=user.id_role,
            time=math.floor(time.time()),
        )
        values = {**new_user.dict()}
        values.pop("id_user", None)
        query = users.insert().values(**values)
        new_user.id_user = await self.database.execute(query)
        return new_user

    async def delete(self, id_user: int):
        query = users.delete().where(users.c.id_user == id_user)
        return await self.database.execute(query=query)

    async def update(self, id_user: int, user: UserIn) -> Users:
        update_user = Users(
            id_user=id_user,
            login=user.login,
            name=user.name,
            email=user.email,
            phone=user.phone,
            password=hash_password(user.password),
            id_role=user.id_role,
            time=math.floor(time.time()),
        )
        values = {**update_user.dict()}
        values.pop("id_user", None)
        values.pop("time", None)
        query = users.update().where(users.c.id_user == id_user).values(**values)
        await self.database.execute(query=query)
        return update_user
