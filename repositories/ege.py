from typing import Optional, Union
from db.ege import ege
from models.request.ege import RequestEge
from models.response.ege import Rus, MathBase, MathProf, ResponseEge, Statistic, StatisticRus, StatisticMathBase, \
    StatisticMathProf
from models.others.subject import Subject
from .base import BaseRepository


class EgeRepository(BaseRepository):
    async def get_by_id(self, id_oo: int) -> Optional[ResponseEge]:
        rus = await self.get_result_for_subject(id_oo, Subject.RUS)
        math_base = await self.get_result_for_subject(id_oo, Subject.MATH_BASE)
        math_prof = await self.get_result_for_subject(id_oo, Subject.MATH_PROF)
        statistic = Statistic(
            rus=StatisticRus.parse_obj(rus),
            math_base=StatisticMathBase.parse_obj(math_base),
            math_prof=StatisticMathProf.parse_obj(math_prof),
        )
        return ResponseEge(
            oo_name=rus.oo_name,
            district_name=rus.district_name,
            subject=statistic
        )

    async def get_result_for_subject(self, id_oo: int, subject_name: Subject) -> Optional[
        Union[Rus, MathBase, MathProf]
    ]:
        query = """
        SELECT 
            oo.oo_name,
            district.district_name,
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
        res = await self.database.fetch_one(query=query,
                                            values={"id_oo": id_oo, "subject_name": subject_name.value})
        if not res:
            return None
        if subject_name == Subject.RUS:
            return Rus.parse_obj(res)

        elif subject_name == Subject.MATH_BASE:
            return MathBase.parse_obj(res)

        elif subject_name == Subject.MATH_PROF:
            return MathProf.parse_obj(res)

    async def create(self, item: RequestEge):
        values = {**item.dict()}
        query = ege.insert().values(**values)
        return await self.database.execute(query=query)
