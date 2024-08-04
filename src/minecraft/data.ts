export type MeleeWeapon = "air" | "woodenSword" | "goldenSword" | "stoneSword" | "ironSword" | "diamondSword" | "netheriteSword" | "woodenAxe" | "goldenAxe" | "stoneAxe" | "ironAxe" | "diamondAxe" | "netheriteAxe" | "trident";
export const meleeWeapons: MeleeWeapon[] = ["air", "woodenSword", "goldenSword", "stoneSword", "ironSword", "diamondSword", "netheriteSword", "woodenAxe", "goldenAxe", "stoneAxe", "ironAxe", "diamondAxe", "netheriteAxe", "trident"];
const meleeWeaponSet = new Set<string>(meleeWeapons);
const meleeAttackData = new Map<MeleeWeapon, number>([
  ["woodenSword", 3],
  ["goldenSword", 3],
  ["stoneSword", 4],
  ["ironSword", 5],
  ["diamondSword", 6],
  ["netheriteSword", 7],
  ["woodenAxe", 6],
  ["goldenAxe", 6],
  ["stoneAxe", 8],
  ["ironAxe", 8],
  ["diamondAxe", 8],
  ["netheriteAxe", 9],
  ["trident", 8]
]);
const meleeAttackSpeedData = new Map<MeleeWeapon, number>([
  ["woodenSword", -2.4],
  ["goldenSword", -2.4],
  ["stoneSword", -2.4],
  ["ironSword", -2.4],
  ["diamondSword", -2.4],
  ["netheriteSword", -2.4],
  ["woodenAxe", -3.2],
  ["goldenAxe", -3],
  ["stoneAxe", -3.2],
  ["ironAxe", -3.1],
  ["diamondAxe", -3],
  ["netheriteAxe", -3],
  ["trident", -2.9]
]);
const meleeWeaponNames = new Map<MeleeWeapon, string>([
  ["air", "空手"],
  ["woodenSword", "木劍"],
  ["goldenSword", "金劍"],
  ["stoneSword", "石劍"],
  ["ironSword", "鐵劍"],
  ["diamondSword", "鑽石劍"],
  ["netheriteSword", "獄髓劍"],
  ["woodenAxe", "木斧"],
  ["goldenAxe", "金斧"],
  ["stoneAxe", "石斧"],
  ["ironAxe", "鐵斧"],
  ["diamondAxe", "鑽石斧"],
  ["netheriteAxe", "獄髓斧"],
  ["trident", "三叉戟 (近戰)"]
]);

export type RangedWeapon = "bow" | "crossbow" | "thrownTrident";
export const rangedWeapons: RangedWeapon[] = ["bow", "crossbow", "thrownTrident"];
const rangedWeaponSet = new Set<string>(rangedWeapons);
const rangedAttackData = new Map<RangedWeapon, [number, number]>([
  ["bow", [6, 11]],
  ["crossbow", [7, 11]],
  ["thrownTrident", [8, 8]]
]);
const rangedWeaponNames = new Map<RangedWeapon, string>([
  ["bow", "弓"],
  ["crossbow", "弩"],
  ["thrownTrident", "三叉戟 (投擲)"]
]);

const enchantmentLevelNames = new Map<number, string>([
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

export interface MeleeWeaponItem {
  type: "melee",
  customName?: string,
  attack: number,
  attackSpeed: number,
  enchantments?: {
    sharpnessLevel?: number,
    typeSpecificLevel?: number,
    breachLevel?: number,
    customDamageBonus?: number,
    customArmorModifier?: number
  }
}
export interface RangedWeaponItem {
  type: "ranged",
  customName?: string,
  minPossibleDamage: number,
  maxPossibleDamage: number,
  enchantments?: {
    powerLevel?: number
  }
}
export type WeaponItem = MeleeWeaponItem | RangedWeaponItem;

function isMeleeWeapon(name: string): name is MeleeWeapon {
  return meleeWeaponSet.has(name);
}
function isRangedWeapon(name: string): name is RangedWeapon {
  return rangedWeaponSet.has(name);
}

export function getMeleeDamage(name: MeleeWeapon) {
  return meleeAttackData.get(name) ?? 0;
}
export function getMeleeAttackSpeed(name: MeleeWeapon) {
  return meleeAttackSpeedData.get(name) ?? 0;
}
export function getRangedDamage(name: RangedWeapon) {
  return rangedAttackData.get(name) ?? [0, 0];
}

export function getSharpnessEffect(level: number) {
  if(level === 0) {
    return 0;
  }
  else {
    return 0.5 + 0.5*level;
  }
}

export function getItemName(name: string) {
  let result = undefined;
  if(isMeleeWeapon(name)) {
    result = meleeWeaponNames.get(name);
  }
  else if(isRangedWeapon(name)) {
    result = rangedWeaponNames.get(name);
  }
  return result ?? "unknown";
}
export function getEnchantmentLevelName(level: number) {
  return enchantmentLevelNames.get(level) ?? level.toString();
}
