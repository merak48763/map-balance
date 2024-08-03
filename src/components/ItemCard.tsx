import { useState } from "react";
import { Card, Group, Stack, Text, SegmentedControl, Menu, ActionIcon, rem } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";

export interface ItemCardProps {
  title?: string,
  onDelete?: () => void
}

function ItemCard(props: ItemCardProps) {
  const [weaponMode, setWeaponMode] = useState("default");

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder miw={300}>
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
              <Menu.Item color="red" leftSection={<IconTrash style={{width: rem(14), height: rem(14)}} />} onClick={props.onDelete}>
                刪除
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section withBorder inheritPadding pb="xs">
        <Stack gap="xs">
          <SegmentedControl value={weaponMode} onChange={setWeaponMode} data={[
            {
              label: "預設",
              value: "default"
            },
            {
              label: "自訂",
              value: "customized"
            }
          ]} mt="sm" />
          <Text>木劍</Text>
        </Stack>
      </Card.Section>
    </Card>
  );
}

export default ItemCard;
