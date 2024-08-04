import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useMinecraft } from "../minecraft/hook";

import type { EnchantedWeapon } from "../minecraft/types";
import { DefaultWeapons } from "../minecraft/types";

import { Group, Stack, Text, Code, ActionIcon, NumberInput, rem } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import WeaponCard from "../components/WeaponCard";
import AddCardButton from "../components/AddCardButton";
import WeaponForm from "../components/WeaponForm";

function PlayerAttack() {
  const {
    playerAttackLab: {
      playerWeapons,
      setPlayerWeapons,
      dummyMob,
      setDummyMob,
      playerBaseAttack,
      setPlayerBaseAttack,
      playerWeaknessLevel,
      setPlayerWeaknessLevel,
      playerStrengthLevel,
      setPlayerStrengthLevel,
      damageDealt,
      damageDealtCrit,
      damageTaken,
      damageTakenCrit,
      dummyArmor,
      dummyArmorToughness,
      dummyMagicProtection
    }
  } = useMinecraft();

  useEffect(() => {
    setPlayerWeapons([
      {
        item: 0,
        enchantments: []
      },
      {
        item: 5,
        enchantments: []
      },
      {
        item: 5,
        enchantments: [
          {
            type: 0,  // sharpness
            level: 5
          },
          {
            type: 1,  // smite
            level: 5
          }
        ]
      },
      {
        item: 5,
        enchantments: [
          {
            effect: 1,  // breach
            value: -0.8
          }
        ]
      }
    ]);

    setDummyMob([
      {
        item: 0,
        enchantments: []
      },
      {
        item: 6,
        enchantments: [
          {
            type: 0,
            level: 4
          }
        ]
      },
      {
        item: 0,
        enchantments: []
      },
      {
        item: 6,
        enchantments: []
      }
    ]);
  }, []);

  const [baseAttackInput, setBaseAttackInput] = useState<string | number>(playerBaseAttack);
  const [weaknessInput, setWeaknessInput] = useState<string | number>(playerWeaknessLevel);
  const [strengthInput, setStrengthInput] = useState<string | number>(playerStrengthLevel);

  useEffect(() => {
    if(typeof baseAttackInput === "number" && baseAttackInput >= 0 && baseAttackInput <= 1000) {
      setPlayerBaseAttack(baseAttackInput);
    }
  }, [baseAttackInput]);
  useEffect(() => {
    if(typeof weaknessInput === "number" && weaknessInput >= 0 && weaknessInput <= 255) {
      setPlayerWeaknessLevel(weaknessInput);
    }
  }, [weaknessInput]);
  useEffect(() => {
    if(typeof strengthInput === "number" && strengthInput >= 0 && strengthInput <= 255) {
      setPlayerStrengthLevel(strengthInput);
    }
  }, [strengthInput]);

  const [modalOpened, {open: openModal, close: closeModal}] = useDisclosure(false);
  const [weaponWorkspace, setWeaponWorkspace] = useState<EnchantedWeapon>({
    item: DefaultWeapons.fist,
    enchantments: []
  });
  const [editingWeaponIndex, setEditingWeaponIndex] = useState(0);

  function onResetBaseAttack() {
    setBaseAttackInput(1);
  }
  function onResetWeakness() {
    setWeaknessInput(0);
  }
  function onResetStrength() {
    setStrengthInput(0);
  }

  function onAddWeapon() {
    const newWeapons = [...playerWeapons];
    newWeapons.push({
      item: DefaultWeapons.fist,
      enchantments: []
    });
    setPlayerWeapons(newWeapons);
  }
  function onDeleteWeapon(index: number) {
    const newWeapons = [...playerWeapons];
    newWeapons.splice(index, 1);
    setPlayerWeapons(newWeapons);
  }
  function onRequireEditWeapon(index: number) {
    setEditingWeaponIndex(index);
    setWeaponWorkspace(playerWeapons[index]);
    openModal();
  }
  function onSubmitWeapon() {
    const newWeaponList = [...playerWeapons];
    newWeaponList[editingWeaponIndex] = weaponWorkspace;
    setPlayerWeapons(newWeaponList);
    closeModal();
  }

  return (
    <Stack p="sm">
      <Text fw={500} fz={rem(24)}>人偶</Text>
      <Group><Code>Dummy Mob [PlaceHolder]</Code></Group>

      <Text fw={500} fz={rem(24)}>玩家屬性</Text>
      <Group align="flex-end" gap="xs">
        <NumberInput label="基礎攻擊力" value={baseAttackInput} onChange={setBaseAttackInput} min={0} max={1000} allowNegative={false} w={rem(112)} inputMode="decimal" />
        <ActionIcon size="input-sm" variant="default" onClick={onResetBaseAttack}>
          <IconReload />
        </ActionIcon>
      </Group>
      <Group align="flex-end" gap="xs">
        <NumberInput label="力量效果" value={strengthInput} onChange={setStrengthInput} min={0} max={255} allowNegative={false} allowDecimal={false} w={rem(112)} inputMode="numeric" />
        <ActionIcon size="input-sm" variant="default" onClick={onResetStrength}>
          <IconReload />
        </ActionIcon>
      </Group>
      <Group align="flex-end" gap="xs">
        <NumberInput label="虛弱效果" value={weaknessInput} onChange={setWeaknessInput} min={0} max={255} allowNegative={false} allowDecimal={false} w={rem(112)} inputMode="numeric" />
        <ActionIcon size="input-sm" variant="default" onClick={onResetWeakness}>
          <IconReload />
        </ActionIcon>
      </Group>

      <Text fw={500} fz={rem(24)}>武器庫</Text>
      <Group align="stretch">
        {playerWeapons.map((weapon, idx) => (
          <WeaponCard key={idx}
            weapon={weapon}
            damageDealt={damageDealt[idx]}
            damageDealtCrit={damageDealtCrit[idx]}
            damageTaken={damageTaken[idx]}
            damageTakenCrit={damageTakenCrit[idx]}
            onDelete={() => onDeleteWeapon(idx)}
            onRequireUpdate={() => onRequireEditWeapon(idx)}
          />
        ))}
        <AddCardButton onClick={onAddWeapon} />
      </Group>
      <WeaponForm opened={modalOpened} onCancel={closeModal}
        weapon={weaponWorkspace} onChange={setWeaponWorkspace} onSubmit={onSubmitWeapon}
      />
    </Stack>
  );
}

export default PlayerAttack;
