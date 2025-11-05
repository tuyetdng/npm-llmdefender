/// <reference types="react" />
import React from 'react';
type InputProgressProps = {
    maxCodeLength: number;
    codeLength?: number;
    error: boolean;
    value?: string;
    dataTestId?: string;
};
declare const InputProgress: React.FC<InputProgressProps>;
export { InputProgressProps, InputProgress };
