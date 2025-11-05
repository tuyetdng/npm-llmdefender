import { GroupShape, OptionShape } from "../../../select";
import { OptionMatcher, SelectWithTagsProps } from "../types";
declare const filterOptions: (options: SelectWithTagsProps['options'], inputValue: string, math?: OptionMatcher) => OptionShape[] | GroupShape[];
export { filterOptions };
