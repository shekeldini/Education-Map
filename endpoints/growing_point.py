from typing import List
from fastapi import APIRouter, Depends, Response
from models.request.growing_point import RequestGrowingPoint
from models.response.growing_point import ResponseGrowingPoint
from repositories.growing_points import GrowingPointsRepository
from .depends import get_growing_points_repository

router = APIRouter()


@router.post("/import", response_class=Response)
async def set_growing_point(
        items: List[RequestGrowingPoint],
        growing_points_repository: GrowingPointsRepository = Depends(get_growing_points_repository)
):
    for item in items:
        await growing_points_repository.set_growing_point(item)


@router.get("/get_all", response_model=ResponseGrowingPoint)
async def get_all(
        growing_points_repository: GrowingPointsRepository = Depends(get_growing_points_repository)
):
    return await growing_points_repository.get_all()
