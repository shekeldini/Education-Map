from typing import Optional, Union

from db.committee import committee
from models.others.digital import DigitalDistrict
from models.others.ege import Rus, MathBase, MathProf
from models.others.subject import Subject
from models.others.vpr import VprStatistic, VprParallelResult, VprSubjectResult
from models.request.committee import RequestCommittee
from models.response.committee import BaseCommittee, ResponseCommittee, CommitteeCoordinates
from models.response.ege import Statistic
from models.response.growing_point import GrowingPointCount
from .base import BaseRepository


class CommitteeRepository(BaseRepository):
    async def get_by_id(self, id_district: int) -> Optional[ResponseCommittee]:
        base = await self.get_base_info(id_district)
        if not base:
            return None
        return ResponseCommittee(
            base_info=base,
            ege=Statistic(
                rus=await self.get_ege_for_subject(id_district, Subject.RUS),
                math_base=await self.get_ege_for_subject(id_district, Subject.MATH_BASE),
                math_prof=await self.get_ege_for_subject(id_district, Subject.MATH_PROF),
            ),
            vpr=VprStatistic(
                parallel_4=VprParallelResult(
                    rus=await self.get_vpr_for_subject(id_district, Subject.RUS, 4),
                    math=await self.get_vpr_for_subject(id_district, Subject.MATH, 4)
                ),
                parallel_5=VprParallelResult(
                    rus=await self.get_vpr_for_subject(id_district, Subject.RUS, 5),
                    math=await self.get_vpr_for_subject(id_district, Subject.MATH, 5)
                ),
                parallel_6=VprParallelResult(
                    rus=await self.get_vpr_for_subject(id_district, Subject.RUS, 6),
                    math=await self.get_vpr_for_subject(id_district, Subject.MATH, 6)
                ),
                parallel_7=VprParallelResult(
                    rus=await self.get_vpr_for_subject(id_district, Subject.RUS, 7),
                    math=await self.get_vpr_for_subject(id_district, Subject.MATH, 7)
                ),
                parallel_8=VprParallelResult(
                    rus=await self.get_vpr_for_subject(id_district, Subject.RUS, 8),
                    math=await self.get_vpr_for_subject(id_district, Subject.MATH, 8)
                )
            ),
            digital=await self.get_digital_info(id_district),
            growing_point=await self.get_growing_point_info(id_district)
        )

    async def get_vpr_for_subject(
            self,
            id_district: int,
            subject_name: Subject,
            parallel
    ) -> Optional[VprSubjectResult]:
        query = """
        SELECT 
            district.district_name,
            COUNT(vpr.low),
            SUM(vpr.low) / COUNT(vpr.low) as low,
            SUM(vpr.medium) / COUNT(vpr.medium) as medium,
            SUM(vpr.high) / COUNT(vpr.high) as high,
            SUM(vpr.count_low) as count_low,
            SUM(vpr.count_medium) as count_medium,
            SUM(vpr.count_high) as count_high
        FROM vpr
            LEFT JOIN oo ON
                vpr.id_oo = oo.id_oo
            LEFT JOIN subject ON 
                subject.id = vpr.id_subject
            LEFT JOIN district ON
                district.id_district = oo.id_district
        WHERE oo.id_district = :id_district
        AND vpr.parallel = :parallel
        AND subject.name = :subject_name
        GROUP BY district.district_name;
        """
        res = await self.database.fetch_one(
            query=query,
            values={
                "id_district": id_district,
                "subject_name": subject_name.value,
                "parallel": parallel
            }
        )
        if not res:
            return None
        return VprSubjectResult.parse_obj(res)

    async def get_ege_for_subject(
            self,
            id_district: int,
            subject_name: Subject
    ) -> Optional[
        Union[Rus, MathBase, MathProf]
    ]:
        query = """
        SELECT 
            district.district_name,
            COUNT(ege.low),
            SUM(ege.low) / COUNT(ege.id_oo) as low,
            SUM(ege.medium) / COUNT(ege.id_oo) as medium,
            SUM(ege.high) / COUNT(ege.id_oo) as high,
            SUM(ege.count_low) as count_low,
            SUM(ege.count_medium) as count_medium,
            SUM(ege.count_high) as count_high
        FROM ege
            LEFT JOIN oo ON 
                ege.id_oo = oo.id_oo
            LEFT JOIN subject ON 
                subject.id = ege.id_subject
            LEFT JOIN district ON
                district.id_district = oo.id_district
        WHERE oo.id_district = :id_district
        AND subject.name = :subject_name
        GROUP BY district.district_name;
        """
        res = await self.database.fetch_one(
            query=query,
            values={
                "id_district": id_district,
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

    async def get_base_info(self, id_district: int) -> Optional[BaseCommittee]:
        query = """
        SELECT 
            committee.id_district,
            district.district_name,
            committee.name,
            committee.address,
            committee.executive,
            committee.email,
            committee.phone_number,
            committee.coordinates,
            committee.url
        FROM committee
            LEFT JOIN district ON
                committee.id_district = district.id_district
        WHERE committee.id_district = :id_district;
        """
        res = await self.database.fetch_one(query=query, values={"id_district": id_district})
        if not res:
            return None
        return BaseCommittee.parse_obj(res)

    async def get_digital_info(
            self,
            id_district: int
    ) -> Optional[DigitalDistrict]:
        query = """
        SELECT 
            district.district_name,
            COUNT(1) filter (where digital.osnash IS True) as osnash_true,
            count_oo.count as count_all,
            SUM(digital.arm_ped) as arm_ped,
            SUM(digital.arm_adm) as arm_adm,
            SUM(digital.i_panel) as i_panel,
            SUM(digital.notebook) as notebook,
            SUM(digital.mfu) as mfu,
            SUM(digital.server) as server,
            SUM(digital.smart_tv) as smart_tv,
            SUM(digital.ip_camera) as ip_camera,
            SUM(digital.ik) as ik
        FROM digital
            LEFT JOIN oo ON
                oo.id_oo = digital.id_oo
            LEFT JOIN district ON
                oo.id_district = district.id_district
            CROSS JOIN (SELECT count(*) FROM oo WHERE id_district = :id_district) as count_oo
        WHERE oo.id_district = :id_district
        GROUP BY district.district_name, count_oo.count;
        """
        res = await self.database.fetch_one(query=query, values={"id_district": id_district})
        if not res:
            return None
        return DigitalDistrict.parse_obj(res)

    async def get_growing_point_info(self, id_district: int) -> Optional[GrowingPointCount]:
        query = """
        SELECT 
            count(1) filter (where oo.growing_point IS True) as count_true,
            count(1) filter (where oo.growing_point IS False) as count_false
        FROM oo
        WHERE oo.id_district = :id_district;
        """

        res = await self.database.fetch_one(query, values={"id_district": id_district})
        if not res:
            return None
        return GrowingPointCount.parse_obj(res)

    async def create(self, item: RequestCommittee):
        values = {**item.dict()}
        query = committee.insert().values(**values)
        return await self.database.execute(query=query)

    async def get_coordinates(self, id_district: int) -> Optional[CommitteeCoordinates]:
        query = """
        SELECT
            committee.id_district,
            committee.coordinates,
            committee.name,
            district.id_region
        FROM committee
            LEFT JOIN district ON
                committee.id_district = district.id_district
        WHERE committee.id_district = :id_district;
        """
        res = await self.database.fetch_one(query, values={"id_district": id_district})
        if not res:
            return None
        return CommitteeCoordinates.parse_obj(res)