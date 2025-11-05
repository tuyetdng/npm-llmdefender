import { FC } from 'react';
import { SteppedProgressBarView } from "../../Component";
type StepBarProps = {
    isDone: boolean;
    view?: SteppedProgressBarView;
};
declare const StepBar: FC<StepBarProps>;
export { StepBar };
