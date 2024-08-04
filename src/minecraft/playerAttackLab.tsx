import type { PropsWithChildren } from "react";
import type { WeaponItem } from "./data";

import { createContext, useState, useMemo, useContext } from "react";
import { getSharpnessEffect } from "./data";
import { calculateDamageDealt, calculateDamageTaken } from "./calculation";

export interface PlayerAttackLabContent {
  parameters: {
    baseAttack: number,
    setBaseAttack: (attack: number) => void,
    strengthLevel: number,
    setStrengthLevel: (level: number) => void,
    weaknessLevel: number,
    setWeaknessLevel: (level: number) => void,

    weapons: WeaponItem[],
    setWeapons: (weapons: WeaponItem[]) => void,

    dummyArmor: number,
    setDummyArmor: (armor: number) => void,
    dummyArmorToughness: number,
    setDummyArmorToughness: (toughness: number) => void,
    dummyProtectionLevel: number,
    setDummyProtectionLevel: (level: number) => void,
    dummySpecializedProtectionLevel: number,
    setDummySpecializedProtectionLevel: (level: number) => void
  },
  output: {
    playerAttackAttribute: number,
    dummyMagicProtectionFactor: number,
    // Melee: no crit
    // Ranged: minimum
    damageDealt1: number[],
    damageTaken1: number[],
    // Melee: crit
    // Ranged: maximum
    damageDealt2: number[],
    damageTaken2: number[]
  }
}

const playerAttackLabContext = createContext<PlayerAttackLabContent>({
  parameters: {
    baseAttack: 1,
    setBaseAttack: () => {},
    strengthLevel: 0,
    setStrengthLevel: () => {},
    weaknessLevel: 0,
    setWeaknessLevel: () => {},

    weapons: [],
    setWeapons: () => {},

    dummyArmor: 0,
    setDummyArmor: () => {},
    dummyArmorToughness: 0,
    setDummyArmorToughness: () => {},
    dummyProtectionLevel: 0,
    setDummyProtectionLevel: () => {},
    dummySpecializedProtectionLevel: 0,
    setDummySpecializedProtectionLevel: () => {}
  },
  output: {
    playerAttackAttribute: 0,
    dummyMagicProtectionFactor: 0,
    damageDealt1: [],
    damageDealt2: [],
    damageTaken1: [],
    damageTaken2: []
  }
});

function PlayerAttackLabProvider({children}: PropsWithChildren) {
  const [baseAttack, setBaseAttack] = useState(1);
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [weaknessLevel, setWeaknessLevel] = useState(0);

  const [weapons, setWeapons] = useState<WeaponItem[]>([]);

  const [dummyArmor, setDummyArmor] = useState(0);
  const [dummyArmorToughness, setDummyArmorToughness] = useState(0);
  const [dummyProtectionLevel, setDummyProtectionLevel] = useState(0);
  const [dummySpecializedProtectionLevel, setDummySpecializedProtectionLevel] = useState(0);

  const playerAttackAttribute = useMemo(() => {
    return baseAttack + 3*strengthLevel - 4*weaknessLevel;
  }, [baseAttack, strengthLevel, weaknessLevel]);
  const dummyMagicProtectionFactor = useMemo(() => {
    return Math.min(20, dummyProtectionLevel + 2*dummySpecializedProtectionLevel)
  }, [dummyProtectionLevel, dummySpecializedProtectionLevel]);

  const dummyOutput = useMemo(() => {
    const damageDealt1 = [] as number[];
    const damageDealt2 = [] as number[];
    const damageTaken1 = [] as number[];
    const damageTaken2 = [] as number[];

    weapons.forEach(weapon => {
      let dealt1 = 0;
      let dealt2 = 0;
      let taken1 = 0;
      let taken2 = 0;

      if(weapon.type === "melee") {
        const attackAttribute = playerAttackAttribute + weapon.attack;
        const enchantmentBonus =
          getSharpnessEffect(weapon.enchantments?.sharpnessLevel ?? 0)
          + 2.5 * (weapon.enchantments?.typeSpecificLevel ?? 0)
          + (weapon.enchantments?.customDamageBonus ?? 0);
        const enchantmentBreach =
          -0.15 * (weapon.enchantments?.breachLevel ?? 0);
          + (weapon.enchantments?.customArmorModifier ?? 0);
        [dealt1, dealt2] = calculateDamageDealt(attackAttribute, enchantmentBonus);
        taken1 = calculateDamageTaken(dummyArmor, dummyArmorToughness, dummyMagicProtectionFactor, dealt1, enchantmentBreach);
        taken2 = calculateDamageTaken(dummyArmor, dummyArmorToughness, dummyMagicProtectionFactor, dealt2, enchantmentBreach);
      }
      else if(weapon.type === "ranged") {
        dealt1 = weapon.minPossibleDamage + 0.5 * (weapon?.enchantments?.powerLevel ?? 0);
        dealt1 = weapon.maxPossibleDamage + 0.5 * (weapon?.enchantments?.powerLevel ?? 0);
      }

      damageDealt1.push(dealt1);
      damageDealt2.push(dealt2);
      damageTaken1.push(taken1);
      damageTaken2.push(taken2);
    });

    return {
      damageDealt1,
      damageDealt2,
      damageTaken1,
      damageTaken2
    };
  }, [playerAttackAttribute, weapons, dummyArmor, dummyArmorToughness, dummyMagicProtectionFactor]);

  return (
    <playerAttackLabContext.Provider value={{
      parameters: {
        baseAttack, setBaseAttack,
        strengthLevel, setStrengthLevel,
        weaknessLevel, setWeaknessLevel,
        weapons, setWeapons,
        dummyArmor, setDummyArmor,
        dummyArmorToughness, setDummyArmorToughness,
        dummyProtectionLevel, setDummyProtectionLevel,
        dummySpecializedProtectionLevel, setDummySpecializedProtectionLevel
      },
      output: {
        playerAttackAttribute,
        dummyMagicProtectionFactor,
        ...dummyOutput
      }
    }}>
      {children}
    </playerAttackLabContext.Provider>
  );
}

function usePlayerAttackLab() {
  return useContext(playerAttackLabContext);
}

export { PlayerAttackLabProvider, usePlayerAttackLab };
