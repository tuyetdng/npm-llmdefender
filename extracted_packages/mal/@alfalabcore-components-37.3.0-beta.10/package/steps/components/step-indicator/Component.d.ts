/// <reference types="react" />
import React from 'react';
import { BadgeProps } from "../../../badge";
type StepIndicatorProps = Pick<BadgeProps, 'content' | 'iconColor' | 'className'>;
declare const StepIndicator: React.FC<StepIndicatorProps>;
export { StepIndicatorProps, StepIndicator };
