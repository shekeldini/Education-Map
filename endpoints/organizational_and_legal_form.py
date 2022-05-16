from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from repositories.organizational_and_legal_form import OrganizationalAndLegalFormRepository
from models.organizational_and_legal_form import OrganizationalAndLegalForm
from .depends import get_organizational_and_legal_form_repository

router = APIRouter()


@router.get("/get_all", response_model=List[OrganizationalAndLegalForm])
async def read_organizational_and_legal_form(
        organizational_and_legal_form: OrganizationalAndLegalFormRepository = Depends(
            get_organizational_and_legal_form_repository
        ),
        limit: int = 100,
        skip: int = 0):
    return await organizational_and_legal_form.get_all(limit=limit, skip=skip)


@router.get("/get_by_id", response_model=OrganizationalAndLegalForm)
async def read_name_of_the_settlement_by_id(
        id_organizational_and_legal_form: int,
        organizational_and_legal_form: OrganizationalAndLegalFormRepository = Depends(
            get_organizational_and_legal_form_repository
        )):
    return await organizational_and_legal_form.get_by_id(id_organizational_and_legal_form)


@router.get("/get_by_type", response_model=OrganizationalAndLegalForm)
async def read_name_of_the_settlement_by_name(
        name: str,
        organizational_and_legal_form: OrganizationalAndLegalFormRepository = Depends(
            get_organizational_and_legal_form_repository
        )):
    return await organizational_and_legal_form.get_by_type(name)


@router.post("/", response_model=OrganizationalAndLegalForm)
async def create_district(
        type_of_organizational_and_legal_form: str,
        organizational_and_legal_form: OrganizationalAndLegalFormRepository = Depends(
            get_organizational_and_legal_form_repository
        )):
    return await organizational_and_legal_form.create(type_of_organizational_and_legal_form)


@router.delete("/", response_model=OrganizationalAndLegalForm)
async def delete_district(
        id_organizational_and_legal_form: int,
        organizational_and_legal_form: OrganizationalAndLegalFormRepository = Depends(
            get_organizational_and_legal_form_repository
        )):
    return await organizational_and_legal_form.delete(id_organizational_and_legal_form)


@router.put("/", response_model=OrganizationalAndLegalForm)
async def update_district(
        id_organizational_and_legal_form: int,
        type_of_organizational_and_legal_form: str,
        organizational_and_legal_form: OrganizationalAndLegalFormRepository = Depends(
            get_organizational_and_legal_form_repository
        )):
    return await organizational_and_legal_form.update(
        id_organizational_and_legal_form, type_of_organizational_and_legal_form
    )
