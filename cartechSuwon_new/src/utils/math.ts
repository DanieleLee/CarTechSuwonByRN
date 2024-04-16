export interface MapRangeOptions {
  inputValue: number;
  outputMin: number;
  outputMax: number;
  inputMax: number;
  inputMin: number;
}

export function mapRange(options: MapRangeOptions) {
  const {inputValue, outputMax, outputMin, inputMax, inputMin} = options;

  const result =
    ((inputValue - inputMin) / (inputMax - inputMin)) *
      (outputMax - outputMin) +
    outputMin;

  if (result === Infinity) return 0;

  return result;
}

export function componentPosInfo<T>(
  parent: React.RefObject<T>,
  child: React.RefObject<T>,
) {
  if (child.current && parent.current) {
    child.current?.measureLayout(
      parent.current,
      (left, top, width, height) => {
        return {left: left, top: top, width: width, height: height};
      },
      () => {
        console.error('measurement failed');
      },
    );
  }
}
