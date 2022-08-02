from typing import List, Optional
from db.oo import oo
from models.request.growing_point import RequestGrowingPoint
from models.response.growing_point import ResponseGrowingPoint

from .base import BaseRepository


class GrowingPointsRepository(BaseRepository):

    async def get_all(self) -> List[Optional[ResponseGrowingPoint]]:
        query = """
        SELECT 
            oo.id_oo,
            oo.coordinates
        FROM oo
        WHERE oo.growing_point IS TRUE;
        """
        return [ResponseGrowingPoint.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def set_growing_point(self, item: RequestGrowingPoint):
        values = {"growing_point": item.growing_point}
        query = oo.update().where(oo.c.id_oo == item.id_oo).values(**values)
        return await self.database.execute(query=query)
