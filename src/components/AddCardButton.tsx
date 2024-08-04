import { Card, Center, rem } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons-react";

export interface AddCardButtonProps {
  onClick?: () => void
}

function AddCardButton(props: AddCardButtonProps) {
  return (
    <Card padding="sm" radius="md" withBorder mih={rem(200)} w={rem(320)} component="button" onClick={props.onClick}>
      <Center w="100%" h="100%">
        <IconCirclePlus style={{width: rem(32), height: rem(32)}} />
      </Center>
    </Card>
  );
}

export default AddCardButton;
