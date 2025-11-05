import { FC } from 'react';
type CountdownSectionProps = {
    codeSendHintVisible: boolean;
    timePassed: boolean;
    processing: boolean;
    mobile?: boolean;
    handleSmsRetryClick: () => void;
};
declare const CountdownSection: FC<CountdownSectionProps>;
export { CountdownSection };
