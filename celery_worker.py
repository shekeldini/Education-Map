from time import sleep
from celery import Celery
from celery.utils.log import get_task_logger
from core.config import REDIS_URL, REDIS_PORT, REDIS_PASSWORD
from loguru import logger
celery = Celery('tasks', broker=f'redis://:{REDIS_PASSWORD}@{REDIS_URL}:{REDIS_PORT}/0')
logger.add("logs/debug.log", format="{time} {level} {message}", level="INFO", rotation="9:00", compression="zip")
celery_log = get_task_logger(__name__)


@celery.task
def write_log(message):
    logger.info(message)
    celery_log.info(f"Order Complete!")
    return {"message": message}
