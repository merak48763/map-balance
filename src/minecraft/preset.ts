import { DefaultWeapons, DefaultWeaponEnchantments, DefaultHeadArmors, DefaultChestArmors, DefaultLegsArmors, DefaultFeetArmors, DefaultArmorEnchantments } from "./types";

const attackDamageMap = new Map<DefaultWeapons, number>([
  [DefaultWeapons.woodenSword, 4],
  [DefaultWeapons.goldenSword, 4],
  [DefaultWeapons.stoneSword, 5],
  [DefaultWeapons.ironSword, 6],
  [DefaultWeapons.diamondSword, 7],
  [DefaultWeapons.netheriteSword, 8],

  [DefaultWeapons.woodenAxe, 7],
  [DefaultWeapons.goldenAxe, 7],
  [DefaultWeapons.stoneAxe, 9],
  [DefaultWeapons.ironAxe, 9],
  [DefaultWeapons.diamondAxe, 9],
  [DefaultWeapons.netheriteAxe, 10],

  [DefaultWeapons.tridentMelee, 9]
]);
function getWeaponAttackDamage(weapon: DefaultWeapons) {
  return (attackDamageMap.get(weapon) ?? 1) - 1;
}

const weaponNameMap = new Map<DefaultWeapons, string>([
  [DefaultWeapons.fist, "空手"],

  [DefaultWeapons.woodenSword, "木劍"],
  [DefaultWeapons.goldenSword, "金劍"],
  [DefaultWeapons.stoneSword, "石劍"],
  [DefaultWeapons.ironSword, "鐵劍"],
  [DefaultWeapons.diamondSword, "鑽石劍"],
  [DefaultWeapons.netheriteSword, "獄髓劍"],

  [DefaultWeapons.woodenAxe, "木斧"],
  [DefaultWeapons.goldenAxe, "金斧"],
  [DefaultWeapons.stoneAxe, "石斧"],
  [DefaultWeapons.ironAxe, "鐵斧"],
  [DefaultWeapons.diamondAxe, "鑽石斧"],
  [DefaultWeapons.netheriteAxe, "獄髓斧"],

  [DefaultWeapons.tridentMelee, "三叉戟 (近戰)"]
]);
function getWeaponName(weapon: DefaultWeapons) {
  return weaponNameMap.get(weapon) ?? "N/A";
}

function getWeaponEnchantmentDamage(enchantment: DefaultWeaponEnchantments, level: number) {
  if(enchantment === DefaultWeaponEnchantments.sharpness) {
    return 0.5*level + 0.5;
  }
  else if(enchantment === DefaultWeaponEnchantments.typeSpecific) {
    return 2.5*level;
  }
  return 0.0;
}
function getWeaponEnchantmentBreach(enchantment: DefaultWeaponEnchantments, level: number) {
  if(enchantment === DefaultWeaponEnchantments.breach) {
    return -0.15*level;
  }
  return 0.0;
}

const weaponEnchantmentNameMap = new Map<DefaultWeaponEnchantments, string>([
  [DefaultWeaponEnchantments.sharpness, "鋒利"],
  [DefaultWeaponEnchantments.typeSpecific, "特定生物剋星 (生效)"],
  [DefaultWeaponEnchantments.breach, "破甲"]
]);
function getWeaponEnchantmentName(enchantment: DefaultWeaponEnchantments) {
  return weaponEnchantmentNameMap.get(enchantment) ?? "N/A";
}

const headArmorPointMap = new Map<DefaultHeadArmors, number>([
  [DefaultHeadArmors.turtleShell, 2],
  [DefaultHeadArmors.leatherCap, 1],
  [DefaultHeadArmors.goldenHelmet, 2],
  [DefaultHeadArmors.chainmailHelmet, 2],
  [DefaultHeadArmors.ironHelmet, 2],
  [DefaultHeadArmors.diamondHelmet, 3],
  [DefaultHeadArmors.netheriteHelmet, 3]
]);
const headArmorToughnessMap = new Map<DefaultHeadArmors, number>([
  [DefaultHeadArmors.diamondHelmet, 2],
  [DefaultHeadArmors.netheriteHelmet, 3]
]);
function getHeadArmorPoint(armor: DefaultHeadArmors) {
  return headArmorPointMap.get(armor) ?? 0;
}
function getHeadArmorToughness(armor: DefaultHeadArmors) {
  return headArmorToughnessMap.get(armor) ?? 0;
}

const chestArmorPointMap = new Map<DefaultChestArmors, number>([
  [DefaultChestArmors.leatherTunic, 3],
  [DefaultChestArmors.goldenChestplate, 5],
  [DefaultChestArmors.chainmailChestplate, 5],
  [DefaultChestArmors.ironChestplate, 6],
  [DefaultChestArmors.diamondChestplate, 8],
  [DefaultChestArmors.netheriteChestplate, 8]
]);
const chestArmorToughnessMap = new Map<DefaultChestArmors, number>([
  [DefaultChestArmors.diamondChestplate, 2],
  [DefaultChestArmors.netheriteChestplate, 3]
]);
function getChestArmorPoint(armor: DefaultChestArmors) {
  return chestArmorPointMap.get(armor) ?? 0;
}
function getChestArmorToughness(armor: DefaultChestArmors) {
  return chestArmorToughnessMap.get(armor) ?? 0;
}

const legsArmorPointMap = new Map<DefaultLegsArmors, number>([
  [DefaultLegsArmors.leatherPants, 2],
  [DefaultLegsArmors.goldenLeggings, 3],
  [DefaultLegsArmors.chainmailLeggings, 4],
  [DefaultLegsArmors.ironLeggings, 5],
  [DefaultLegsArmors.diamondLeggings, 6],
  [DefaultLegsArmors.netheriteLeggings, 6]
]);
const legsArmorToughnessMap = new Map<DefaultLegsArmors, number>([
  [DefaultLegsArmors.diamondLeggings, 2],
  [DefaultLegsArmors.netheriteLeggings, 3]
]);
function getLegsArmorPoint(armor: DefaultLegsArmors) {
  return legsArmorPointMap.get(armor) ?? 0;
}
function getLegsArmorToughness(armor: DefaultLegsArmors) {
  return legsArmorToughnessMap.get(armor) ?? 0;
}

const feetArmorPointMap = new Map<DefaultFeetArmors, number>([
  [DefaultFeetArmors.leatherBoots, 1],
  [DefaultFeetArmors.goldenBoots, 1],
  [DefaultFeetArmors.chainmailBoots, 1],
  [DefaultFeetArmors.ironBoots, 2],
  [DefaultFeetArmors.diamondBoots, 3],
  [DefaultFeetArmors.netheriteBoots, 3]
]);
const feetArmorToughnessMap = new Map<DefaultFeetArmors, number>([
  [DefaultFeetArmors.diamondBoots, 2],
  [DefaultFeetArmors.netheriteBoots, 3]
]);
function getFeetArmorPoint(armor: DefaultFeetArmors) {
  return feetArmorPointMap.get(armor) ?? 0;
}
function getFeetArmorToughness(armor: DefaultFeetArmors) {
  return feetArmorToughnessMap.get(armor) ?? 0;
}

function getArmorEnchantmentProtection(enchantment: DefaultArmorEnchantments, level: number) {
  if(enchantment === DefaultArmorEnchantments.protection) {
    return level;
  }
  else if(enchantment === DefaultArmorEnchantments.typeSpecific) {
    return 2*level;
  }
  return 0;
}

const enchantmentLevelNameMap = new Map<number, string>([
  [1, "I"],
  [2, "II"],
  [3, "III"],
  [4, "IV"],
  [5, "V"],
  [6, "VI"],
  [7, "VII"],
  [8, "VIII"],
  [9, "IX"],
  [10, "X"],
  [87, "LXXXVII"]
]);
function getEnchantmentLevelName(level: number) {
  return enchantmentLevelNameMap.get(level) ?? level.toString();
}

export {
  getWeaponAttackDamage, getWeaponName,
  getWeaponEnchantmentDamage, getWeaponEnchantmentBreach, getWeaponEnchantmentName,
  getHeadArmorPoint, getHeadArmorToughness,
  getChestArmorPoint, getChestArmorToughness,
  getLegsArmorPoint, getLegsArmorToughness,
  getFeetArmorPoint, getFeetArmorToughness,
  getArmorEnchantmentProtection,
  getEnchantmentLevelName
};
