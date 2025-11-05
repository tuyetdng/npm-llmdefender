"""
LLM HYPERPARAMETERS
"""
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from enum import Enum

class SamplingStrategy(str, Enum):
    GREEDY = "greedy"               # highest probability token
    NUCLEUS = "nucleus"             # cumulative prob > top_p
    TEMPERATURE = "temperature"     # base on temperature 
    # BEAM_SEARCH = "beam_search"     # find optimal sequence with multiple paths

class ModelConfig(BaseModel):
 
    # Model Identification
    model_name: str = Field(default="deepseek-ai/DeepSeek-Coder-6.7B-Instruct")
    model_version: str = Field(default="v1.0.0")
    
    # Generation Parameters
    # max_new_tokens: int = Field(default=2048, ge=256, le=4096)  # Max token for llm response
    max_new_tokens: int = Field(default=2048, ge=256, le=8192)
    temperature: float = Field(default=0.1, ge=0.0, le=2.0)
    top_p: float = Field(default=0.9, ge=0.1, le=1.0)
    top_k: int = Field(default=50, ge=1, le=100)
    repetition_penalty: float = Field(default=1.1, ge=1.0, le=2.0)
    
    # Sampling Strategy
    sampling_strategy: SamplingStrategy = Field(default=SamplingStrategy.NUCLEUS)
    do_sample: bool = Field(default=True)
    
    # Hardware 
    torch_dtype: str = Field(default="float16")                 # Data type for model tensors
    device_map: str = Field(default="auto")                     # Automatically allocate model across available GPU
    max_memory: Dict[str, str] = Field(                       # Per-GPU memory limit
        default_factory=lambda: {"0": "10GB", "1": "10GB"}
    )
    
    # Tokenizer
    truncation: bool = Field(default=True)                      # Cut-out input if too long
    max_length: int = Field(default=4096)                       # Model context window
    padding_side: str = Field(default="left")
    
    # Batch Processing 
    batch_size: int = Field(default=1, ge=1, le=8)              # Number of input sample handler
    
    # Validation
    @property
    def generation_config(self) -> Dict[str, Any]:
        return {
            "max_new_tokens": self.max_new_tokens,
            "temperature": self.temperature,
            "top_p": self.top_p,
            "top_k": self.top_k,
            "repetition_penalty": self.repetition_penalty,
            "do_sample": self.do_sample,
            "pad_token_id": 0,  # dynamically
        }

class ExperimentalSetups:
    
    @staticmethod
    def get_structural_analysis_config() -> ModelConfig:
        return ModelConfig(
            temperature=0.1,                                # Low for consistent structural analysis
            max_new_tokens=2048,
            sampling_strategy=SamplingStrategy.NUCLEUS
        )
    
    @staticmethod
    def get_semantic_analysis_config() -> ModelConfig:
        return ModelConfig(
            temperature=0.3,                                # Slightly higher for creative semantic code analysis
            max_new_tokens=2048,
            sampling_strategy=SamplingStrategy.NUCLEUS
        )
    
    @staticmethod
    def get_behavior_chain_config() -> ModelConfig:
        return ModelConfig(
            temperature=0.2,                                # Balanced for reasoning
            max_new_tokens=2048,
            sampling_strategy=SamplingStrategy.NUCLEUS
        )

# Default configuration
DEFAULT_MODEL_CONFIG = ModelConfig()