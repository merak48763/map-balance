import type { WeaponItem } from "../minecraft/data";

import { Table, Text } from "@mantine/core";
import ItemCard from "./ItemCard";
import Number from "./Number";

export interface WeaponCardProps {
  weapon: WeaponItem,
  index?: number,
  damageDealt1?: number,
  damageDealt2?: number,
  damageTaken1?: number,
  damageTaken2?: number,
  onDelete?: () => void
}

function WeaponCard(props: WeaponCardProps) {
  const weaponName = props.weapon?.customName || `測試品 #${props.index}`;

  return (
    <ItemCard title={<Text fw={500}>{weaponName}</Text>} onDelete={props.onDelete}>
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
            <Table.Td>{props.weapon.type === "melee" ? "一般攻擊" : "最低攻擊"}</Table.Td>
            <Table.Td>
              <Number value={props.damageDealt1} />
            </Table.Td>
            <Table.Td>
              <Number value={props.damageTaken1} />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>{props.weapon.type === "melee" ? "暴擊" : "最高攻擊"}</Table.Td>
            <Table.Td>
              <Number value={props.damageDealt2} />
            </Table.Td>
            <Table.Td>
              <Number value={props.damageTaken2} />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </ItemCard>
  );
}

export default WeaponCard;
