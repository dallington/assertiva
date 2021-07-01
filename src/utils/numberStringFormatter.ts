const defaultOptions = {
  locale: "pt-BR",
  minimumIntegerDigits: 2,
  precision: 0,
  showPlaceholder: false,
  grouping: true,
};

const forbiddenStates = ["", "0.0", "."];
export const numberStringFormatter = (value: string, options = {}) => {
  const innerOptions = {
    ...defaultOptions,
    ...options,
  };

  let result: number | string = value

    .replaceAll(".", "")
    .replace(",", ".")
    .replace(/[^.0-9]/g, "");

  if (!innerOptions.showPlaceholder && forbiddenStates.includes(result)) {
    return "";
  }

  result = result.padStart(innerOptions.precision, "0");

  result = result === "" ? "0" : result;

  result = result.length === 1 ? `0${result}` : result;

  const lastDigitsRegex = new RegExp(
    `([0-9]{0,${innerOptions.precision}})$`,
    "g"
  );

  result = result.replace(/[^\d]/g, "").replace(lastDigitsRegex, ".$1");

  result = parseFloat(result);

  return result.toLocaleString(innerOptions.locale, {
    minimumFractionDigits: innerOptions.precision,
    useGrouping: innerOptions.grouping,
    minimumIntegerDigits: innerOptions.minimumIntegerDigits,
  });
};

export default numberStringFormatter;

export const numberStringUnformatter = (value: string): number =>
  parseFloat(value.replaceAll(".", "").replace(",", "."));
