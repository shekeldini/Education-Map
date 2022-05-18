from aioredis import create_redis_pool
from aioredis import Redis as aioRedis
from typing import Optional


class Redis:
    def __init__(self, url: str, port: str, password: str):
        self._connection: Optional[aioRedis] = None
        self._url = url
        self._port = port
        self._password = password

    async def connect(self):
        self._connection: aioRedis = await create_redis_pool(
            address=(self._url, self._port),
            password=self._password,
            encoding="utf8"
        )

    async def get(self, key):
        return await self._connection.get(key)

    async def set(self, key, value):
        return await self._connection.set(key, value)

    async def disconnect(self):
        self._connection.close()
        return await self._connection.wait_closed()

