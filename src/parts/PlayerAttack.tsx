import type { WeaponItem } from "../minecraft/data";

import { useDisclosure } from "@mantine/hooks";
import { usePlayerAttackLab } from "../minecraft/playerAttackLab";

import { Group, Stack, Text, ActionIcon, Button, NumberInput, Popover, rem } from "@mantine/core";
import { IconReload, IconHelp } from "@tabler/icons-react";
import WeaponCard from "../components/WeaponCard";
import WeaponCardEdit from "../components/WeaponCardEdit";
import AddCardButton from "../components/AddCardButton";

function PlayerAttack() {
  const [editMode, {toggle: toggleEditMode}] = useDisclosure(false);

  const {
    parameters: {
      baseAttack,
      setBaseAttack,
      strengthLevel,
      setStrengthLevel,
      weaknessLevel,
      setWeaknessLevel,

      weapons,
      setWeapons,

      dummyArmor,
      setDummyArmor,
      dummyArmorToughness,
      setDummyArmorToughness,
      dummyProtectionLevel,
      setDummyProtectionLevel,
      //dummySpecializedProtectionLevel,
      //setDummySpecializedProtectionLevel
    },
    output: {
      damageDealt1,
      damageDealt2,
      damageTaken1,
      damageTaken2
    }
  } = usePlayerAttackLab();

  function handleBaseAttackInput(value: string | number) {
    if(typeof value === "number") {
      setBaseAttack(value);
    }
  }
  function resetBaseAttack() {
    setBaseAttack(1);
  }

  function handleStrengthInput(value: string | number) {
    if(typeof value === "number") {
      setStrengthLevel(value);
    }
  }
  function resetStrength() {
    setStrengthLevel(0);
  }

  function handleWeaknessInput(value: string | number) {
    if(typeof value === "number") {
      setWeaknessLevel(value);
    }
  }
  function resetWeakness() {
    setWeaknessLevel(0);
  }

  function handleArmorInput(value: string | number) {
    if(typeof value === "number") {
      setDummyArmor(value);
    }
  }
  function resetArmor() {
    setDummyArmor(0);
  }

  function handleArmorToughnessInput(value: string | number) {
    if(typeof value === "number") {
      setDummyArmorToughness(value);
    }
  }
  function resetArmorToughness() {
    setDummyArmorToughness(0);
  }

  function handleProtectionInput(value: string | number) {
    if(typeof value === "number") {
      setDummyProtectionLevel(value);
    }
  }
  function resetProtection() {
    setDummyProtectionLevel(0);
  }

  /*
  function handleSpecializedProtectionInput(value: string | number) {
    if(typeof value === "number") {
      setDummySpecializedProtectionLevel(value);
    }
  }
  function resetSpecializedProtection() {
    setDummySpecializedProtectionLevel(0);
  }
  */

  function addNewWeapon() {
    setWeapons([
      ...weapons,
      {
        type: "melee",
        attack: 0,
        attackSpeed: 0
      }
    ]);
  }
  function deleteWeapon(index: number) {
    const newWeapons = [...weapons];
    newWeapons.splice(index, 1);
    setWeapons(newWeapons);
  }
  function editWeapon(index: number, value: WeaponItem) {
    const newWeapons = [...weapons];
    newWeapons.splice(index, 1, value);
    setWeapons(newWeapons);
  }

  return (
    <Stack p="sm" pb={rem(320)}>
      <Group gap={rem(120)}>
        <Stack gap="xs">
          <Text fw={500} fz={rem(24)}>人偶</Text>
          <Group align="flex-end" gap="xs">
            <NumberInput label="盔甲"
              value={dummyArmor}
              onChange={handleArmorInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={30} clampBehavior="strict" allowNegative={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="decimal"
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetArmor}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
          </Group>
          <Group align="flex-end" gap="xs">
            <NumberInput label="盔甲強度"
              value={dummyArmorToughness}
              onChange={handleArmorToughnessInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={20} clampBehavior="strict" allowNegative={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="decimal"
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetArmorToughness}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
          </Group>
          <Group align="flex-end" gap="xs">
            <NumberInput label="保護等級"
              value={dummyProtectionLevel}
              onChange={handleProtectionInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="numeric"
              error={dummyProtectionLevel > 20}
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetProtection}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
            {dummyProtectionLevel > 20 && (
              <Popover shadow="sm" withArrow>
                <Popover.Target>
                  <ActionIcon size="input-sm" variant="default">
                    <IconHelp style={{width: rem(18), height: rem(18)}} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="sm">等級20已發揮最大效果</Text>
                </Popover.Dropdown>
              </Popover>
            )}
          </Group>
          {/*<Group align="flex-end" gap="xs">
            <NumberInput label="特殊保護等級"
              value={dummySpecializedProtectionLevel}
              onChange={handleSpecializedProtectionInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="numeric"
              error={dummySpecializedProtectionLevel > 10}
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetSpecializedProtection}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
            {dummySpecializedProtectionLevel > 10 && (
              <Popover shadow="sm" withArrow>
                <Popover.Target>
                  <ActionIcon size="input-sm" variant="default">
                    <IconHelp style={{width: rem(18), height: rem(18)}} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="sm">等級10已發揮最大效果</Text>
                </Popover.Dropdown>
              </Popover>
            )}
          </Group>*/}
        </Stack>

        <Stack gap="xs">
          <Text fw={500} fz={rem(24)}>玩家屬性</Text>
          <Group align="flex-end" gap="xs">
            <NumberInput label="基礎攻擊力"
              value={baseAttack}
              onChange={handleBaseAttackInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={1000} clampBehavior="strict" allowNegative={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="decimal"
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetBaseAttack}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
          </Group>
          <Group align="flex-end" gap="xs">
            <NumberInput label="力量效果"
              value={strengthLevel}
              onChange={handleStrengthInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="numeric"
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetStrength}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
          </Group>
          <Group align="flex-end" gap="xs">
            <NumberInput label="虛弱效果"
              value={weaknessLevel}
              onChange={handleWeaknessInput} isAllowed={v => v.floatValue !== undefined}
              min={0} max={255} clampBehavior="strict" allowNegative={false} allowDecimal={false} allowLeadingZeros={false}
              w={rem(160)} inputMode="numeric"
            />
            <ActionIcon size="input-sm" variant="default" onClick={resetWeakness}>
              <IconReload style={{width: rem(18), height: rem(18)}} />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>

      <Text fw={500} fz={rem(24)}>武器庫</Text>
      <Group>
        <Button variant="outline" onClick={toggleEditMode}>{editMode ? "查看結果" : "編輯武器"}</Button>
      </Group>
      <Group align="stretch">
        {editMode ? (
          weapons.map((weapon, idx) => (
            <WeaponCardEdit key={idx} index={idx + 1}
              weapon={weapon}
              onDelete={() => deleteWeapon(idx)}
              onChange={weapon => editWeapon(idx, weapon)}
            />
          ))
        ) : (
          weapons.map((weapon, idx) => (
            <WeaponCard key={idx} index={idx + 1}
              weapon={weapon}
              damageDealt1={damageDealt1[idx]}
              damageDealt2={damageDealt2[idx]}
              damageTaken1={damageTaken1[idx]}
              damageTaken2={damageTaken2[idx]}
              onDelete={() => deleteWeapon(idx)}
            />
          ))
        )}
        <AddCardButton onClick={addNewWeapon} />
      </Group>
    </Stack>
  );
}

export default PlayerAttack;
