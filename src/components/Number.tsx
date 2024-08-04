import { Text, NumberFormatter } from "@mantine/core";

export interface NumberProps {
  value?: number,
  percentage?: boolean,
  delta?: boolean
}

function Number({value, percentage, delta}: NumberProps) {
  const plusSign = (value !== undefined && delta && value >= 0) ? "+" : undefined;

  return (
    <Text span ff="monospace">
      {
        (value !== undefined) && percentage
        ? <NumberFormatter value={value*100} decimalScale={2} prefix={plusSign} suffix="%" />
        : <NumberFormatter value={value} decimalScale={4} prefix={plusSign} />
      }
    </Text>
  );
}

export default Number;
