import { PureAmount } from "./pure/component";
import { Amount as DefaultAmount } from "./component";
type AmountType = typeof DefaultAmount & {
    Pure: typeof PureAmount;
};
declare const Amount: AmountType;
export { Amount };
export * from "./types/index";
