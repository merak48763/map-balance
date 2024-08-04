import { WeaponItem, MeleeWeapon, meleeWeapons, getMeleeDamage, getMeleeAttackSpeed, getItemName } from "../minecraft/data";

import { Group, Stack, TextInput, NumberInput, Menu, ActionIcon, Popover, Text, Code, rem } from "@mantine/core";
import { IconMenu2, IconHelp } from "@tabler/icons-react";
import ItemCard from "./ItemCard";

export interface WeaponCardEditProps {
  weapon: WeaponItem,
  index?: number,
  onDelete?: () => void,
  onChange?: (weapon: WeaponItem) => void
}

function WeaponCardEdit(props: WeaponCardEditProps) {
  const weaponName = props.weapon.customName || `測試品 #${props.index}`;

  function updateName(value: string) {
    props.onChange?.({
      ...props.weapon,
      customName: value
    });
  }

  function updateAttack(value: string | number) {
    if(typeof value === "number") {
      if(props.weapon.type === "melee") {
        props.onChange?.({
          ...props.weapon,
          attack: value
        });
      }
      else {
        props.onChange?.({
          type: "melee",
          attack: value,
          attackSpeed: 0,
          customName: props.weapon.customName
        });
      }
    }
  }

  function updateSharpness(value: string | number) {
    if(typeof value === "number") {
      if(props.weapon.type === "melee") {
        props.onChange?.({
          ...props.weapon,
          enchantments: {
            ...props.weapon.enchantments,
            sharpnessLevel: value
          }
        });
      }
      else {
        props.onChange?.({
          type: "melee",
          attack: 0,
          attackSpeed: 0,
          customName: props.weapon.customName,
          enchantments: {
            sharpnessLevel: value
          }
        });
      }
    }
  }
  function updateTypeSpecificBonus(value: string | number) {
    if(typeof value === "number") {
      if(props.weapon.type === "melee") {
        props.onChange?.({
          ...props.weapon,
          enchantments: {
            ...props.weapon.enchantments,
            typeSpecificLevel: value
          }
        });
      }
      else {
        props.onChange?.({
          type: "melee",
          attack: 0,
          attackSpeed: 0,
          customName: props.weapon.customName,
          enchantments: {
            typeSpecificLevel: value
          }
        });
      }
    }
  }
  function updateBreach(value: string | number) {
    if(typeof value === "number") {
      if(props.weapon.type === "melee") {
        props.onChange?.({
          ...props.weapon,
          enchantments: {
            ...props.weapon.enchantments,
            breachLevel: value
          }
        });
      }
      else {
        props.onChange?.({
          type: "melee",
          attack: 0,
          attackSpeed: 0,
          customName: props.weapon.customName,
          enchantments: {
            breachLevel: value
          }
        });
      }
    }
  }

  function selectMeleePreset(value: MeleeWeapon) {
    props.onChange?.({
      type: "melee",
      attack: getMeleeDamage(value),
      attackSpeed: getMeleeAttackSpeed(value),
      customName: getItemName(value)
    });
  }

  const nameEditor = (
    <TextInput placeholder={weaponName} value={props.weapon.customName ?? ""} onChange={e => updateName(e.currentTarget.value)} />
  );

  return (
    <ItemCard title={nameEditor} onDelete={props.onDelete}>
      {props.weapon.type === "melee" ? (
        <Stack gap="xs">
          <Group align="flex-end" gap="xs">
            <NumberInput label="武器攻擊力"
              value={props.weapon.attack}
              onChange={updateAttack} isAllowed={v => v.floatValue !== undefined}
              min={-1000} max={1000} clampBehavior="strict" allowLeadingZeros={false}
              w={rem(160)} inputMode="decimal"
            />
            <Menu shadow="sm" width={rem(180)}>
              <Menu.Target>
                <ActionIcon size="input-sm" variant="default">
                  <IconMenu2 style={{width: rem(18), height: rem(18)}} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {meleeWeapons.map(preset => (
                  <Menu.Item key={preset} onClick={() => selectMeleePreset(preset)}>
                    {getItemName(preset)}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
          <NumberInput label="鋒利等級"
            value={props.weapon.enchantments?.sharpnessLevel ?? 0}
            onChange={updateSharpness} isAllowed={v => v.floatValue !== undefined}
            min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
            w={rem(160)} inputMode="numeric"
          />
          <NumberInput label="特定生物剋星等級"
            value={props.weapon.enchantments?.typeSpecificLevel ?? 0}
            onChange={updateTypeSpecificBonus} isAllowed={v => v.floatValue !== undefined}
            min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
            w={rem(160)} inputMode="numeric"
          />
          <Group align="flex-end" gap="xs">
            <NumberInput label="破甲等級"
              value={props.weapon.enchantments?.breachLevel ?? 0}
              onChange={updateBreach} isAllowed={v => v.floatValue !== undefined}
              min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="numeric"
              error={(props.weapon.enchantments?.breachLevel ?? 0) > 6}
            />
            {(props.weapon.enchantments?.breachLevel ?? 0) > 6 && (
              <Popover shadow="sm" withArrow>
                <Popover.Target>
                  <ActionIcon size="input-sm" variant="default">
                    <IconHelp style={{width: rem(18), height: rem(18)}} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="sm">等級6已發揮最大效果</Text>
                </Popover.Dropdown>
              </Popover>
            )}
          </Group>
        </Stack>
      ) : (
        <Code>:lul:</Code>
      )}
    </ItemCard>
  );
}

export default WeaponCardEdit;
