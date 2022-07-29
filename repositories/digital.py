from db.digital import digital
from models.request.digital import RequestDigital
from models.response.digital import ResponseDigital, DigitalItem
from .base import BaseRepository


class DigitalRepository(BaseRepository):
    async def get_all(self) -> ResponseDigital:
        query = """
        SELECT 
            oo.oo_name,
            district.district_name,
            digital.cos2020,
            digital.cos2021,
            digital.cos2022,
            digital.osnash,
            digital.arm_ped,
            digital.arm_adm,
            digital.i_panel,
            digital.notebook,
            digital.mfu,
            digital.server,
            digital.smart_tv,
            digital.ip_camera,
            digital.ik
        FROM digital
            LEFT JOIN oo ON
                oo.id_oo = digital.id_oo
            LEFT JOIN district ON
                oo.id_district = district.id_district;
        """
        res = await self.database.fetch_all(query=query)
        if not res:
            return ResponseDigital(items=[])
        return ResponseDigital(
            items=[DigitalItem.parse_obj(row) for row in res]
        )

    async def create(self, item: RequestDigital):
        values = {**item.dict()}
        query = digital.insert().values(**values)
        return await self.database.execute(query=query)

