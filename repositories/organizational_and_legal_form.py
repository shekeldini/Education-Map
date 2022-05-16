from typing import List
from db.organizational_and_legal_form import organizational_and_legal_form
from models.organizational_and_legal_form import OrganizationalAndLegalForm
from .base import BaseRepository


class OrganizationalAndLegalFormRepository(BaseRepository):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[OrganizationalAndLegalForm]:
        query = organizational_and_legal_form.select().limit(limit).offset(skip)
        return [OrganizationalAndLegalForm.parse_obj(row) for row in await self.database.fetch_all(query)]

    async def get_by_id(self, id: int) -> OrganizationalAndLegalForm:
        query = organizational_and_legal_form.select().where(
            organizational_and_legal_form.c.id_organizational_and_legal_form == id
        )
        return OrganizationalAndLegalForm.parse_obj(await self.database.fetch_one(query))

    async def get_by_type(self, type: str) -> OrganizationalAndLegalForm:
        query = organizational_and_legal_form.select().where(
            organizational_and_legal_form.c.type_of_organizational_and_legal_form == type
        )
        return OrganizationalAndLegalForm.parse_obj(await self.database.fetch_all(query))

    async def create(self, type_of_organizational_and_legal_form: str) -> OrganizationalAndLegalForm:
        new_organizational_and_legal_form = OrganizationalAndLegalForm(
            type_of_organizational_and_legal_form=type_of_organizational_and_legal_form
        )
        values = {**new_organizational_and_legal_form.dict()}
        values.pop("id_organizational_and_legal_form", None)
        query = organizational_and_legal_form.insert().values(**values)
        new_organizational_and_legal_form.id_organizational_and_legal_form = await self.database.execute(query)
        return new_organizational_and_legal_form

    async def delete(self, id: int):
        query = organizational_and_legal_form.delete().where(
            organizational_and_legal_form.c.id_organizational_and_legal_form == id
        )
        return await self.database.execute(query=query)

    async def update(self, id: int, type_of_organizational_and_legal_form: str) -> OrganizationalAndLegalForm:
        update_organizational_and_legal_form = OrganizationalAndLegalForm(
            id_organizational_and_legal_form=id,
            type_of_organizational_and_legal_form=type_of_organizational_and_legal_form
        )
        values = {**update_organizational_and_legal_form.dict()}
        values.pop("id_organizational_and_legal_form", None)
        query = organizational_and_legal_form.update().where(
            organizational_and_legal_form.c.id_organizational_and_legal_form == id
        ).values(**values)
        await self.database.execute(query=query)
        return update_organizational_and_legal_form
