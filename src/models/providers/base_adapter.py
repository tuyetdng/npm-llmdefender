"""
Abstract base class for LLM providers.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class LLMAdapter(ABC):    
    def __init__(self, model_name: str, device: str = "cuda", **kwargs):
        self.model_name = model_name
        self.device = device
        self.config = kwargs
        logger.info(f"Initializing {self.__class__.__name__} with model: {model_name}")
    
    @abstractmethod
    def generate(
        self,
        prompt: str,
        max_tokens: int = 2048,
        temperature: float = 0.1,
        **kwargs
    ) -> str:
        """Generate text from prompt.
        
        Args:
            prompt: Input prompt text
            max_tokens: Maximum generation length
            temperature: Sampling temperature (0=deterministic, 1=creative)
            **kwargs: Provider-specific parameters
            
        Returns:
            Generated text response
        """
        pass
    
    @abstractmethod
    def load_model(self):
        pass
    
    @abstractmethod
    def get_model_info(self) -> Dict[str, Any]:
        """Return model metadata."""
        pass
    
    @abstractmethod
    def estimate_tokens(self, text: str) -> int:
        """Token count for input text."""
        pass
    
    def validate_prompt(self, prompt: str, max_length: int = 8192) -> bool:
        """Check if prompt within context window."""
        token_count = self.estimate_tokens(prompt)
        if token_count > max_length:
            logger.warning(
                f"Prompt exceeds token limit: {token_count} > {max_length}"
            )
            return False
        return True