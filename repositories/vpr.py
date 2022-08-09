from typing import Optional, List
from db.vpr import vpr
from models.others.vpr import VprSubjectResult
from models.request.vpr import RequestVpr
from models.response.vpr import VprParallelResult, ResponseVpr, ResponseAllVpr, VprItem
from models.others.subject import Subject, OONameDistrictName
from .base import BaseRepository


class VprRepository(BaseRepository):
    async def get_by_id(self, id_oo: int) -> Optional[ResponseVpr]:
        base_info = await self.get_oo_name_and_district_name(id_oo)
        if not base_info:
            return None
        return ResponseVpr(
            oo_name=base_info.oo_name,
            district_name=base_info.district_name,
            parallel_4=VprParallelResult(
                rus=await self.get_result_for_subject(id_oo, Subject.RUS, 4),
                math=await self.get_result_for_subject(id_oo, Subject.MATH, 4)
            ),
            parallel_5=VprParallelResult(
                rus=await self.get_result_for_subject(id_oo, Subject.RUS, 5),
                math=await self.get_result_for_subject(id_oo, Subject.MATH, 5)
            ),
            parallel_6=VprParallelResult(
                rus=await self.get_result_for_subject(id_oo, Subject.RUS, 6),
                math=await self.get_result_for_subject(id_oo, Subject.MATH, 6)
            ),
            parallel_7=VprParallelResult(
                rus=await self.get_result_for_subject(id_oo, Subject.RUS, 7),
                math=await self.get_result_for_subject(id_oo, Subject.MATH, 7)
            ),
            parallel_8=VprParallelResult(
                rus=await self.get_result_for_subject(id_oo, Subject.RUS, 8),
                math=await self.get_result_for_subject(id_oo, Subject.MATH, 8)
            )
        )

    async def get_result_for_subject(
            self,
            id_oo: int,
            subject_name: Subject,
            parallel: int
    ) -> Optional[VprSubjectResult]:
        query = """
        SELECT 
            vpr.low,
            vpr.medium,
            vpr.high
        FROM vpr
        WHERE vpr.id_oo = :id_oo
        AND vpr.parallel = :parallel
        AND vpr.id_subject IN (
            SELECT id AS id_subject FROM subject
            WHERE name = :subject_name
        );
        """
        res = await self.database.fetch_one(
            query=query,
            values={
                "id_oo": id_oo,
                "subject_name": subject_name.value,
                "parallel": parallel
            }
        )
        if not res:
            return None
        return VprSubjectResult.parse_obj(res)

    async def get_oo_name_and_district_name(self, id_oo) -> Optional[OONameDistrictName]:
        query = """
        SELECT 
            oo.oo_name,
            district.district_name
        FROM oo
            LEFT JOIN district ON
                oo.id_district = district.id_district
        WHERE oo.id_oo = :id_oo;
        """
        res = await self.database.fetch_one(
            query=query,
            values={
                "id_oo": id_oo
            }
        )
        if not res:
            return None
        return OONameDistrictName.parse_obj(res)

    async def create(self, item: RequestVpr):
        values = {**item.dict()}
        query = vpr.insert().values(**values)
        return await self.database.execute(query=query)

    async def get_all(self) -> ResponseAllVpr:
        query = """
        SELECT 
            oo.id_oo,
            oo.coordinates
        FROM oo
        WHERE oo.id_oo IN (
            SELECT DISTINCT id_oo FROM vpr
        );
        """
        res = await self.database.fetch_all(query)
        if not res:
            return ResponseAllVpr(items=[])
        return ResponseAllVpr(items=[VprItem.parse_obj(row) for row in res])