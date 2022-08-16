from typing import List
from fastapi import APIRouter, Depends, Response, HTTPException, status
from models.request.committee import RequestCommittee
from models.response.committee import ResponseCommittee, CommitteeCoordinates
from models.response.users import ResponseUsers
from repositories.committee import CommitteeRepository
from .depends import get_committee_repository, get_current_user

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_committee_items(
        model: List[RequestCommittee],
        committee_repository: CommitteeRepository = Depends(get_committee_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    for item in model:
        await committee_repository.create(item)


@router.get("/get_by_id/{id_district}", response_model=ResponseCommittee)
async def get_by_id(
        id_district: int,
        committee_repository: CommitteeRepository = Depends(get_committee_repository),
):
    item = await committee_repository.get_by_id(id_district)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="id_district not found")
    return item


@router.get("/get_coordinates/{id_district}", response_model=CommitteeCoordinates)
async def get_by_id(
        id_district: int,
        committee_repository: CommitteeRepository = Depends(get_committee_repository),
):
    item = await committee_repository.get_coordinates(id_district)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="id_district not found")
    return item
