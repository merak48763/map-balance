import type { PropsWithChildren } from "react";
import { Card, Group, Text, Menu, ActionIcon, rem } from "@mantine/core";
import { IconDotsVertical, IconTrash, IconEdit } from "@tabler/icons-react";

export interface ItemCardProps extends PropsWithChildren {
  title?: string,
  persistent?: boolean,
  onRequireUpdate?: () => void,
  onDelete?: () => void
}

function ItemCard(props: ItemCardProps) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder w={rem(320)}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>{props.title}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDotsVertical style={{width: rem(16), height: rem(16)}} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEdit style={{width: rem(14), height: rem(14)}} />} onClick={props.onRequireUpdate}>
                編輯
              </Menu.Item>
              {!props.persistent && (
                <Menu.Item color="red" leftSection={<IconTrash style={{width: rem(14), height: rem(14)}} />} onClick={props.onDelete}>
                  刪除
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        {props.children}
      </Card.Section>
    </Card>
  );
}

export default ItemCard;
