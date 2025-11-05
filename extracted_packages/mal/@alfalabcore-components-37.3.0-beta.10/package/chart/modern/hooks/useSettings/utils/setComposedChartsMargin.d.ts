import { BrushProps } from "../../../types/brush.types";
import { ComposedChartProps } from "../../../types/composedChart.types";
import { LegendProps } from "../../../types/legend.types";
import { XAxisProps } from "../../../types/xAxis.types";
type ComposedChartsMarginResultProps = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
declare const setComposedChartsMargin: (composeChart: ComposedChartProps, legend: LegendProps | undefined, brush: BrushProps | undefined, xAxis: XAxisProps) => ComposedChartsMarginResultProps;
export { setComposedChartsMargin };
