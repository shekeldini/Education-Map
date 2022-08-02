from typing import Optional, Union
from db.ege import ege
from models.request.ege import RequestEge
from models.response.ege import Rus, MathBase, MathProf, ResponseEge, Statistic
from models.others.subject import Subject, OONameDistrictName
from .base import BaseRepository


class EgeRepository(BaseRepository):
    async def get_by_id(self, id_oo: int) -> Optional[ResponseEge]:
        base_info = await self.get_oo_name_and_district_name(id_oo)
        if not base_info:
            return None
        statistic = Statistic(
            rus=await self.get_result_for_subject(id_oo, Subject.RUS),
            math_base=await self.get_result_for_subject(id_oo, Subject.MATH_BASE),
            math_prof=await self.get_result_for_subject(id_oo, Subject.MATH_PROF),
        )
        return ResponseEge(
            oo_name=base_info.oo_name,
            district_name=base_info.district_name,
            subject=statistic
        )

    async def get_result_for_subject(self, id_oo: int, subject_name: Subject) -> Optional[
        Union[Rus, MathBase, MathProf]
    ]:
        query = """
        SELECT 
            ege.low,
            ege.medium,
            ege.high
        FROM ege
            LEFT JOIN oo ON
                oo.id_oo = ege.id_oo
            LEFT JOIN district ON
                oo.id_district = district.id_district
            WHERE ege.id_oo = :id_oo
            AND ege.id_subject IN (
                SELECT id as id_subject FROM subject
                WHERE name = :subject_name
            );
        """
        res = await self.database.fetch_one(
            query=query,
            values={
                "id_oo": id_oo,
                "subject_name": subject_name.value
            }
        )
        if not res:
            return None
        if subject_name == Subject.RUS:
            return Rus.parse_obj(res)

        elif subject_name == Subject.MATH_BASE:
            return MathBase.parse_obj(res)

        elif subject_name == Subject.MATH_PROF:
            return MathProf.parse_obj(res)

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

    async def create(self, item: RequestEge):
        values = {**item.dict()}
        query = ege.insert().values(**values)
        return await self.database.execute(query=query)
