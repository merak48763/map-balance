import { Table, Text } from "@mantine/core";
import ItemCard from "./ItemCard";
import Number from "./Number";

import { EnchantedWeapon, WeaponEnchantment, CustomWeaponEnchantmentEffectTarget } from "../minecraft/types";
import { isCustomWeapon, isCustomWeaponEnchantment } from "../minecraft/types";
import { getWeaponName, getWeaponEnchantmentName, getEnchantmentLevelName } from "../minecraft/preset";

export interface WeaponCardProps {
  weapon?: EnchantedWeapon,
  damageDealt?: number,
  damageDealtCrit?: number,
  damageTaken?: number,
  damageTakenCrit?: number,
  onDelete?: () => void,
  onRequireUpdate?: () => void
}

function getItemName(weapon?: EnchantedWeapon) {
  if(weapon === undefined) return "N/A";
  if(weapon.customName) return weapon.customName;
  if(isCustomWeapon(weapon.item)) return "自訂武器";
  return getWeaponName(weapon.item);
}
function getEnchantmentName(enchantment: WeaponEnchantment) {
  if(isCustomWeaponEnchantment(enchantment)) {
    if(enchantment.effect === CustomWeaponEnchantmentEffectTarget.damage) {
      return (
        <>
          [自訂]傷害值
          <Number value={enchantment.value} delta />
        </>
      );
    }
    else if(enchantment.effect === CustomWeaponEnchantmentEffectTarget.armorEffectiveness) {
      return (
        <>
          [自訂]盔甲效益
          <Number value={enchantment.value} percentage delta />
        </>
      );
    }
  }
  else {
    return (
      <>
        {getWeaponEnchantmentName(enchantment.type)}
        {" "}
        {getEnchantmentLevelName(enchantment.level)}
      </>
    );
  }
}

function WeaponCard(props: WeaponCardProps) {
  const weaponName = getItemName(props.weapon);

  return (
    <ItemCard title={weaponName} onDelete={props.onDelete} onRequireUpdate={props.onRequireUpdate}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>發動攻擊</Table.Th>
            <Table.Th>承受傷害</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>一般攻擊</Table.Td>
            <Table.Td>
              <Number value={props.damageDealt} />
            </Table.Td>
            <Table.Td>
              <Number value={props.damageTaken} />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>暴擊</Table.Td>
            <Table.Td>
              <Number value={props.damageDealtCrit} />
            </Table.Td>
            <Table.Td>
              <Number value={props.damageTakenCrit} />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      {props.weapon?.enchantments.map((enchantment, idx) => (
        <Text key={idx} c="violet">{getEnchantmentName(enchantment)}</Text>
      ))}
    </ItemCard>
  );
}

export default WeaponCard;
