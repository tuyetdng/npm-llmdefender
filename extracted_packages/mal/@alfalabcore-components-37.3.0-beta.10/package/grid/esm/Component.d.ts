import { FC } from 'react';
import { ColProps } from "./col/index";
import { RowProps } from "./row/index";
declare const Grid: {
    Row: FC<RowProps>;
    Col: FC<ColProps>;
};
export { Grid };
