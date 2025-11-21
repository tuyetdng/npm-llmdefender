import logging
from logging.handlers import TimedRotatingFileHandler
import os
from datetime import datetime

def setup_logger() -> logging.Logger:
    """
    log_YYYY-MM-DD.log
    """
    LOG_DIR = "logs"
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    date_str = datetime.now().strftime("%Y-%m-%d")
    LOG_FILE_NAME = f"log_{date_str}.log"
    log_file_path = os.path.join(LOG_DIR, LOG_FILE_NAME)

    logger = logging.getLogger("LLMDefender")
    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    if not any(isinstance(h, logging.StreamHandler) for h in logger.handlers):
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)
        ch.setFormatter(formatter)
        logger.addHandler(ch)

    if not any(isinstance(h, TimedRotatingFileHandler) for h in logger.handlers):
        fh = TimedRotatingFileHandler(
            filename=log_file_path,
            when="midnight",
            interval=1,
            backupCount=30   
        )
        fh.setLevel(logging.INFO)
        fh.setFormatter(formatter)
        fh.suffix = "%Y-%m-%d" 
        logger.addHandler(fh)

    logger.info(f"Logger initialized. Logging to file: {log_file_path}")
    return logger
