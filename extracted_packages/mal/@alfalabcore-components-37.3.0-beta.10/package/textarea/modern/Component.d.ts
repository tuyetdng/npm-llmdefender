/// <reference types="react" />
import React from 'react';
declare const getDefaultCounterText: (textLength: number, maxLength?: number) => string;
declare const Textarea: React.ForwardRefExoticComponent<Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "defaultValue" | "style" | "onChange" | "value"> & import("./typings").TextareaIncomeProps & React.RefAttributes<HTMLTextAreaElement>>;
export { getDefaultCounterText, Textarea };
