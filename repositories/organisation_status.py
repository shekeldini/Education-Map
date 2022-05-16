from typing import List, Optional
from db.organisation_status import organisation_status
from models.organisation_status import OrganisationStatus
from .base import BaseRepository


class OrganisationStatusRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[OrganisationStatus]:
        query = organisation_status.select().limit(limit).offset(skip)
        return [OrganisationStatus.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id_organisation_status: int) -> Optional[OrganisationStatus]:
        query = organisation_status.select().where(
            organisation_status.c.id_organisation_status == id_organisation_status
        )
        res = await self.database.fetch_one(query)
        if res is None:
            return None
        return OrganisationStatus.parse_obj(res)

    async def create(self, status: str) -> OrganisationStatus:
        new_organisation_status = OrganisationStatus(
            status=status
        )
        values = {**new_organisation_status.dict()}
        values.pop("id_organisation_status", None)
        query = organisation_status.insert().values(**values)
        new_organisation_status.id_organisation_status = await self.database.execute(query)
        return new_organisation_status

    async def delete(self, id_organisation_status: int):
        query = organisation_status.delete().where(
            organisation_status.c.id_organisation_status == id_organisation_status
        )
        return await self.database.execute(query=query)

    async def update(self, id_organisation_status: int, status: str) -> OrganisationStatus:
        update_organisation_status = OrganisationStatus(
            id_organisation_status=id_organisation_status,
            status=status
        )
        values = {**update_organisation_status.dict()}
        values.pop("id_organisation_status", None)
        query = organisation_status.update().where(
            organisation_status.c.id_organisation_status == id_organisation_status
        ).values(**values)
        await self.database.execute(query=query)
        return update_organisation_status
