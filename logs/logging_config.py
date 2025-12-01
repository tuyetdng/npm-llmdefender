import logging
from logging.handlers import TimedRotatingFileHandler
import os
from datetime import datetime

def setup_logger() -> logging.Logger:
    """
    Initializes a logger with a StreamHandler and a TimedRotatingFileHandler.
    Log file pattern: logs/log_YYYY-MM-DD.log
    Retains 30 days of logs.
    """

    LOG_DIR = "logs"
    os.makedirs(LOG_DIR, exist_ok=True)

    logger = logging.getLogger("LLMDefender")
    logger.setLevel(logging.INFO)
    logger.propagate = False  # Prevent logs from propagating to root logger (avoid duplicates)

    # Check if logger is already initialized
    if logger.handlers:
        return logger

    date_str = datetime.now().strftime("%Y-%m-%d")
    LOG_FILE_NAME = f"log_{date_str}.log"
    log_file_path = os.path.join(LOG_DIR, LOG_FILE_NAME)

    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    # Console output
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    ch.setFormatter(formatter)
    logger.addHandler(ch)

    # Rotating file handler
    fh = TimedRotatingFileHandler(
        filename=log_file_path,
        when="midnight",
        interval=1,
        backupCount=30,
        encoding="utf-8"
    )
    fh.setFormatter(formatter)
    fh.suffix = "%Y-%m-%d"
    logger.addHandler(fh)

    logger.info(f"Logger initialized. Logging to file: {log_file_path}")
    return logger
