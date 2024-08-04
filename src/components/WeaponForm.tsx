import type { EnchantedWeapon } from "../minecraft/types";
import { DefaultWeapons } from "../minecraft/types";

import { useState, useEffect } from "react";

import { Modal, Group, Stack, Button, Select, SegmentedControl, NumberInput } from "@mantine/core";

import { isCustomWeapon } from "../minecraft/types";
import { getWeaponName } from "../minecraft/preset";

export interface WeaponFormProps {
  opened: boolean,
  weapon?: EnchantedWeapon,
  onChange?: (weapon: EnchantedWeapon) => void,
  onSubmit?: () => void,
  onCancel: () => void
}

const defaultWeaponOptions = [
  DefaultWeapons.fist,

  DefaultWeapons.woodenSword,
  DefaultWeapons.goldenSword,
  DefaultWeapons.stoneSword,
  DefaultWeapons.ironSword,
  DefaultWeapons.diamondSword,
  DefaultWeapons.netheriteSword,

  DefaultWeapons.woodenAxe,
  DefaultWeapons.goldenAxe,
  DefaultWeapons.stoneAxe,
  DefaultWeapons.ironAxe,
  DefaultWeapons.diamondAxe,
  DefaultWeapons.netheriteAxe,

  DefaultWeapons.tridentMelee
];
const defaultWeaponData = defaultWeaponOptions.map(option => ({
  value: option.toString(),
  label: getWeaponName(option)
}));

const weaponModeData = [
  { value: "default", label: "預設武器" },
  { value: "custom", label: "自訂武器" }
];

function WeaponForm(props: WeaponFormProps) {
  const [customAttackInput, setCustomAttackInput] = useState<string | number>(0);
  useEffect(() => {
    if(typeof customAttackInput === "number" && customAttackInput >= -1000 && customAttackInput <= 1000) {
      setCustomWeaponAttack(customAttackInput);
    }
  }, [customAttackInput]);
  useEffect(() => {
    if(props.weapon === undefined) return;
    if(props.opened && isCustomWeapon(props.weapon.item)) {
      setCustomAttackInput(props.weapon.item.attackDamage);
    }
  }, [props.weapon, props.opened]);

  // Handlers
  function selectWeaponMode(value: string) {
    if(props.weapon === undefined) return;
    if(value === "default") {
      props?.onChange?.({
        ...props.weapon,
        item: DefaultWeapons.fist
      });
    }
    else {
      setCustomAttackInput(1);
      setCustomWeaponAttack(1);
    }
  }
  function selectDefaultWeapon(value: string | null) {
    if(props.weapon === undefined) return;
    if(value !== null) {
      props?.onChange?.({
        ...props.weapon,
        item: parseInt(value) as DefaultWeapons
      });
    }
  }
  function setCustomWeaponAttack(value: number) {
    if(props.weapon === undefined) return;
    props?.onChange?.({
      ...props.weapon,
      item: {
        attackDamage: value,
        attackSpeed: 1.6
      }
    });
  }

  return (
    <Modal opened={props.opened} onClose={props.onCancel}
      title="編輯武器" centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 1
      }}
      transitionProps={{
        transition: "fade"
      }}
    >
      {props.weapon !== undefined &&
        <Stack align="flex-start">
          <SegmentedControl data={weaponModeData} value={isCustomWeapon(props.weapon.item) ? "custom" : "default"} onChange={selectWeaponMode} />
          {isCustomWeapon(props.weapon.item)
          ? <NumberInput label="攻擊力" value={customAttackInput} onChange={setCustomAttackInput} min={-1000} max={1000} inputMode="decimal" />
          : <Select data={defaultWeaponData} value={props.weapon.item.toString()} onChange={selectDefaultWeapon} allowDeselect={false} />}
          <Group w="100%" justify="flex-end">
            <Button onClick={props.onSubmit}>確認</Button>
          </Group>
        </Stack>
      }
    </Modal>
  );
}

export default WeaponForm;
