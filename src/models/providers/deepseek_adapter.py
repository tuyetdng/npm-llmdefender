"""
DeepSeek-Coder-6.7B-Instruct adapter for local inference.
"""

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from typing import Optional, Dict, Any
from pydantic import BaseModel
import logging
from pathlib import Path


logger = logging.getLogger(__name__)


class DeepSeekAdapter:
    def __init__(self, model_name = "deepseek-ai/deepseek-coder-6.7b-instruct", config: Optional[Dict[str, Any]] = None):
        self.model_name = model_name
        self.model = None
        self.tokenizer = None
        self.config = config or {}
        self._loaded = False
    
    def load_model(self):
        if self._loaded:
            return
        
        logger.info(f"Loading model {self.model_name} ...")
        print(f"Loading model {self.model_name} ...")
        
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_name, 
            trust_remote_code=True
        )

        dtype = getattr(torch, self.config.get("torch_dtype", "float16"))
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            torch_dtype=dtype,
            device_map=self.config.get("device_map", "auto"),
            trust_remote_code=self.config.get("trust_remote_code", True)
        )
        self._loaded = True
        print("Model loaded successfully!")
        
    def prepare_inputs(self, prompt: str, use_chat_template: bool = True, add_generation_prompt: bool = True):
        # Chat template helper
        if use_chat_template and hasattr(self.tokenizer, "apply_chat_template"):
            messages = [{"role":"user","content": prompt}]
            text = self.tokenizer.apply_chat_template(
                messages, 
                add_generation_prompt=add_generation_prompt, 
                tokenize=False  
            )
            inputs = self.tokenizer(text, return_tensors="pt")
        else:
            inputs = self.tokenizer(prompt, return_tensors="pt")
            
        result = {}
        for key, tensor_value in inputs.items():
            tensor_on_gpu = tensor_value.to(self.model.device)
            result[key] = tensor_on_gpu
        
        return result

    
    def generate(self, prompt: str, max_new_tokens: Optional[int] = None) -> str:
        try:
            if not self._loaded:
                self.load_model()

            cfg = {
                "max_new_tokens": max_new_tokens or self.config.get("max_new_tokens", 2048),
                "temperature": self.config.get("temperature", 0.1),
                "top_k": self.config.get("top_k", 50),
                "top_p": self.config.get("top_p", 0.95),
                "do_sample": self.config.get("do_sample", False),
            }

            inputs = self.prepare_inputs(prompt)
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    **cfg,
                    eos_token_id=getattr(self.tokenizer, "eos_token_id", None),
                    pad_token_id=getattr(self.tokenizer, "pad_token_id", self.tokenizer.eos_token_id)
                )

            text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

            if text.startswith(prompt):
                text = text[len(prompt):].strip()
            elif prompt in text:
                text = text.split(prompt, 1)[-1].strip()
                
            return text
        except Exception as e:
            logger.error(f"Generation failed: {e}")
            return f"ERROR: {str(e)}"