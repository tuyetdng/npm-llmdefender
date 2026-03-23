"""
DeepSeek-Coder-6.7B-Instruct adapter for local inference.
"""

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)


def _clean_bpe_artifacts(text: str) -> str:
    """Clean BPE byte-level artifacts từ GPT-style tokenizer."""
    text = text.replace('\u0120', ' ')   # Ġ → space
    text = text.replace('\u010a', '\n')  # Ċ → newline
    result = []
    for ch in text:
        cp = ord(ch)
        if 0x0100 <= cp <= 0x017F:
            ascii_byte = cp - 0x0100
            if 0x20 <= ascii_byte <= 0x7E:
                result.append(chr(ascii_byte))
            elif ascii_byte == 0x0A:
                result.append('\n')
            elif ascii_byte == 0x09:
                result.append('\t')
            else:
                result.append(ch)
        else:
            result.append(ch)
    return ''.join(result)


class DeepSeekAdapter:
    def __init__(self, model_name="deepseek-ai/deepseek-coder-6.7b-instruct", config: Optional[Dict[str, Any]] = None):
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
            torch_dtype=dtype,          # GIỮ NGUYÊN torch_dtype= (không đổi sang dtype=)
            device_map=self.config.get("device_map", "auto"),
            trust_remote_code=self.config.get("trust_remote_code", True)
        )
        self._loaded = True
        print("Model loaded successfully!")

    def prepare_inputs(self, prompt: str, use_chat_template: bool = True, add_generation_prompt: bool = True):
        if use_chat_template and hasattr(self.tokenizer, "apply_chat_template"):
            messages = [{"role": "user", "content": prompt}]
            text = self.tokenizer.apply_chat_template(
                messages,
                add_generation_prompt=add_generation_prompt,
                tokenize=False
            )
            inputs = self.tokenizer(text, return_tensors="pt")
        else:
            inputs = self.tokenizer(prompt, return_tensors="pt")

        return {key: tensor.to(self.model.device) for key, tensor in inputs.items()}

    def generate(self, prompt: str, max_new_tokens: Optional[int] = None) -> str:
        try:
            if not self._loaded:
                self.load_model()

            do_sample = self.config.get("do_sample", False)
            cfg = {
                "max_new_tokens": max_new_tokens or self.config.get("max_new_tokens", 2048),
                "do_sample": do_sample,
            }
            # Chỉ truyền sampling params khi do_sample=True
            # (temperature + top_p bị ignore khi do_sample=False → tránh warning)
            if do_sample:
                cfg["temperature"] = self.config.get("temperature", 0.7)
                cfg["top_k"]       = self.config.get("top_k", 50)
                cfg["top_p"]       = self.config.get("top_p", 0.95)

            inputs = self.prepare_inputs(prompt)
            input_length = inputs["input_ids"].shape[1]  # để strip prompt khỏi output

            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    **cfg,
                    eos_token_id=self.tokenizer.eos_token_id,
                    pad_token_id=getattr(self.tokenizer, "pad_token_id", self.tokenizer.eos_token_id),
                )

            # Chỉ decode phần generated (bỏ prompt tokens)
            generated_ids = outputs[0][input_length:]
            text = self.tokenizer.decode(
                generated_ids,
                skip_special_tokens=True,
                clean_up_tokenization_spaces=True,
            )

            return _clean_bpe_artifacts(text).strip()

        except Exception as e:
            logger.error(f"Generation failed: {e}")
            return f"ERROR: {str(e)}"