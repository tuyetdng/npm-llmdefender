import { SeriaProps } from "../../../types/seria.types";
import { DataDynamicBooleanProps, DataDynamicProps } from "../../../types/utils/data.types";
type DatasResultProps = [DataDynamicProps[], DataDynamicBooleanProps, number];
declare const setDatas: (series: SeriaProps[], labels: Array<string | number>) => DatasResultProps;
export { setDatas };
