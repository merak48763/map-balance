import type { PropsWithChildren } from "react";
import { createContext, useContext, useState, useEffect } from "react";

import type {
  EnchantedWeapon, EnchantedArmorSet
} from "./types";
import {
  DefaultWeapons, DefaultHeadArmors, DefaultChestArmors, DefaultFeetArmors, DefaultLegsArmors,
  CustomWeaponEnchantmentEffectTarget,
  isCustomWeapon, isCustomWeaponEnchantment,
  isCustomArmor, isCustomArmorEnchantment
} from "./types";
import { calculateDamageDealt, calculateDamageTaken } from "./calculation";
import {
  getWeaponAttackDamage,
  getWeaponEnchantmentDamage, getWeaponEnchantmentBreach,
  getHeadArmorPoint, getHeadArmorToughness,
  getChestArmorPoint, getChestArmorToughness,
  getLegsArmorPoint, getLegsArmorToughness,
  getFeetArmorPoint, getFeetArmorToughness,
  getArmorEnchantmentProtection
} from "./preset";

export interface MinecraftContextProps {
  playerAttackLab: {
    playerBaseAttack: number,
    setPlayerBaseAttack: (attack: number) => void,
    playerWeaknessLevel: number,
    setPlayerWeaknessLevel: (level: number) => void,
    playerStrengthLevel: number,
    setPlayerStrengthLevel: (level: number) => void,
    playerWeapons: EnchantedWeapon[],
    setPlayerWeapons: (weapons: EnchantedWeapon[]) => void,
    dummyMob: EnchantedArmorSet,
    setDummyMob: (armorSet: EnchantedArmorSet) => void,

    dummyArmor: number,
    dummyArmorToughness: number,
    dummyMagicProtection: number,
    damageDealt: number[],
    damageDealtCrit: number[],
    damageTaken: number[],
    damageTakenCrit: number[]
  },
  mobAttackLab?: {
    playerArmors: EnchantedArmorSet[],
    setPlayerArmors: (armorSets: EnchantedArmorSet[]) => void,
    mobBaseAttack: number,
    setMobBaseAttack: (attack: number) => void,
    mobWeapon: EnchantedWeapon,
    setMobWeapon: (weapon: EnchantedWeapon) => void,

    mobAttackDamage: number,
    damageTaken: number[]
  }
}

const context = createContext<MinecraftContextProps>({
  playerAttackLab: {
    playerBaseAttack: 1,
    setPlayerBaseAttack: () => {},
    playerWeaknessLevel: 0,
    setPlayerWeaknessLevel: () => {},
    playerStrengthLevel: 0,
    setPlayerStrengthLevel: () => {},
    playerWeapons: [],
    setPlayerWeapons: () => {},
    dummyMob: [
      {
        item: 0,
        enchantments: []
      },
      {
        item: 0,
        enchantments: []
      },
      {
        item: 0,
        enchantments: []
      },
      {
        item: 0,
        enchantments: []
      }
    ],
    setDummyMob: () => {},
    dummyArmor: 0,
    dummyArmorToughness: 0,
    dummyMagicProtection: 0,
    damageDealt: [],
    damageDealtCrit: [],
    damageTaken: [],
    damageTakenCrit: []
  },
  mobAttackLab: {
    playerArmors: [],
    setPlayerArmors: () => {},
    mobBaseAttack: 1,
    setMobBaseAttack: () => {},
    mobWeapon: {
      item: 0,
      enchantments: []
    },
    setMobWeapon: () => {},
    mobAttackDamage: 0,
    damageTaken: []
  }
});

function MinecraftProvider({children}: PropsWithChildren) {
  // Player Attack Lab
  const [playerBaseAttack, setPlayerBaseAttack] = useState(1.0);
  const [playerWeaknessLevel, setPlayerWeaknessLevel] = useState(0);
  const [playerStrengthLevel, setPlayerStrengthLevel] = useState(0);
  const [playerWeapons, setPlayerWeapons] = useState<EnchantedWeapon[]>([
    {
      item: DefaultWeapons.fist,
      enchantments: []
    }
  ]);
  const [dummyMob, setDummyMob] = useState<EnchantedArmorSet>([
    {
      item: DefaultHeadArmors.air,
      enchantments: []
    },
    {
      item: DefaultChestArmors.air,
      enchantments: []
    },
    {
      item: DefaultLegsArmors.air,
      enchantments: []
    },
    {
      item: DefaultFeetArmors.air,
      enchantments: []
    }
  ]);

  const [dummyArmor, setDummyArmor] = useState(0);
  const [dummyArmorToughness, setDummyArmorToughness] = useState(0);
  const [dummyMagicProtection, setDummyMagicProtection] = useState(0);
  useEffect(() => {
    let armor = 0;
    let armorToughness = 0;
    let magicProtection = 0;

    const headItem = dummyMob[0].item;
    if(!isCustomArmor(headItem)) {
      armor += getHeadArmorPoint(headItem);
      armorToughness += getHeadArmorToughness(headItem);
    }
    else {
      armor += headItem.armor;
      armorToughness += headItem.armorToughness;
    }

    const chestItem = dummyMob[1].item;
    if(!isCustomArmor(chestItem)) {
      armor += getChestArmorPoint(chestItem);
      armorToughness += getChestArmorToughness(chestItem);
    }
    else {
      armor += chestItem.armor;
      armorToughness += chestItem.armorToughness;
    }

    const legsItem = dummyMob[2].item;
    if(!isCustomArmor(legsItem)) {
      armor += getLegsArmorPoint(legsItem);
      armorToughness += getLegsArmorToughness(legsItem);
    }
    else {
      armor += legsItem.armor;
      armorToughness += legsItem.armorToughness;
    }

    const feetItem = dummyMob[3].item;
    if(!isCustomArmor(feetItem)) {
      armor += getFeetArmorPoint(feetItem);
      armorToughness += getFeetArmorToughness(feetItem);
    }
    else {
      armor += feetItem.armor;
      armorToughness += feetItem.armorToughness;
    }

    dummyMob.forEach(armorPiece => armorPiece.enchantments.forEach(enchantment => {
      if(!isCustomArmorEnchantment(enchantment)) {
        magicProtection += getArmorEnchantmentProtection(enchantment.type, enchantment.level);
      }
      else {
        magicProtection += enchantment.epf;
      }
    }));

    setDummyArmor(armor);
    setDummyArmorToughness(armorToughness);
    setDummyMagicProtection(magicProtection);
  }, [dummyMob]);

  const [damageDealt, setDamageDealt] = useState<number[]>([1.0]);
  const [damageDealtCrit, setDamageDealtCrit] = useState<number[]>([1.5]);
  const [damageTaken, setDamageTaken] = useState<number[]>([1.0]);
  const [damageTakenCrit, setDamageTakenCrit] = useState<number[]>([1.5]);
  useEffect(() => {
    const newDamageDealt = [] as number[];
    const newDamageDealtCrit = [] as number[];
    const newDamageTaken = [] as number[];
    const newDamageTakenCrit = [] as number[];
    playerWeapons.forEach(weapon => {
      const weaponItem = weapon.item;
      let attack = playerBaseAttack + 3*playerStrengthLevel - 4*playerWeaknessLevel;
      if(!isCustomWeapon(weaponItem)) {
        attack += getWeaponAttackDamage(weaponItem);
      }
      else {
        attack += weaponItem.attackDamage;
      }

      let enchantmentBonus = 0;
      let enchantmentBreach = 0;
      weapon.enchantments.forEach(enchantment => {
        if(!isCustomWeaponEnchantment(enchantment)) {
          enchantmentBonus += getWeaponEnchantmentDamage(enchantment.type, enchantment.level);
          enchantmentBreach += getWeaponEnchantmentBreach(enchantment.type, enchantment.level);
        }
        else if(enchantment.effect === CustomWeaponEnchantmentEffectTarget.damage) {
          enchantmentBonus += enchantment.value;
        }
        else if(enchantment.effect === CustomWeaponEnchantmentEffectTarget.armorEffectiveness) {
          enchantmentBreach += enchantment.value;
        }
      });

      const [vNormal, vCrit] = calculateDamageDealt(attack, enchantmentBonus);
      newDamageDealt.push(vNormal);
      newDamageDealtCrit.push(vCrit);
      newDamageTaken.push(calculateDamageTaken(dummyArmor, dummyArmorToughness, dummyMagicProtection, vNormal, enchantmentBreach));
      newDamageTakenCrit.push(calculateDamageTaken(dummyArmor, dummyArmorToughness, dummyMagicProtection, vCrit, enchantmentBreach));
    });

    setDamageDealt(newDamageDealt);
    setDamageDealtCrit(newDamageDealtCrit);
    setDamageTaken(newDamageTaken),
    setDamageTakenCrit(newDamageTakenCrit);
  }, [playerBaseAttack, playerStrengthLevel, playerWeaknessLevel, playerWeapons, dummyArmor, dummyArmorToughness, dummyMagicProtection]);

  // TODO: Mob Attack Lab

  return (
    <context.Provider value={{
      playerAttackLab: {
        playerBaseAttack,
        setPlayerBaseAttack,
        playerWeaknessLevel,
        setPlayerWeaknessLevel,
        playerStrengthLevel,
        setPlayerStrengthLevel,
        playerWeapons,
        setPlayerWeapons,
        dummyMob,
        setDummyMob,
        dummyArmor,
        dummyArmorToughness,
        dummyMagicProtection,
        damageDealt,
        damageDealtCrit,
        damageTaken,
        damageTakenCrit
      }
    }}>
      {children}
    </context.Provider>
  );
}

function useMinecraft() {
  return useContext(context);
}

export { MinecraftProvider, useMinecraft };
