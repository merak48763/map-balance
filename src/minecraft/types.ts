export const enum DefaultWeapons {
  fist = 0,

  woodenSword,
  goldenSword,
  stoneSword,
  ironSword,
  diamondSword,
  netheriteSword,

  woodenAxe,
  goldenAxe,
  stoneAxe,
  ironAxe,
  diamondAxe,
  netheriteAxe,

  tridentMelee
}
export interface CustomWeapon {
  attackDamage: number,
  attackSpeed: number
}

export const enum DefaultHeadArmors {
  air = 0,

  turtleShell,
  leatherCap,
  goldenHelmet,
  chainmailHelmet,
  ironHelmet,
  diamondHelmet,
  netheriteHelmet
}
export const enum DefaultChestArmors {
  air = 0,

  leatherTunic,
  goldenChestplate,
  chainmailChestplate,
  ironChestplate,
  diamondChestplate,
  netheriteChestplate
}
export const enum DefaultLegsArmors {
  air = 0,

  leatherPants,
  goldenLeggings,
  chainmailLeggings,
  ironLeggings,
  diamondLeggings,
  netheriteLeggings
}
export const enum DefaultFeetArmors {
  air = 0,

  leatherBoots,
  goldenBoots,
  chainmailBoots,
  ironBoots,
  diamondBoots,
  netheriteBoots
}
export interface CustomArmor {
  armor: number,
  armorToughness: number
}

export type Weapon = DefaultWeapons | CustomWeapon;
export type HeadArmor = DefaultHeadArmors | CustomArmor;
export type ChestArmor = DefaultChestArmors | CustomArmor;
export type LegsArmor = DefaultLegsArmors | CustomArmor;
export type FeetArmor = DefaultFeetArmors | CustomArmor;

type Armor = HeadArmor | ChestArmor | LegsArmor | FeetArmor;
type Item = Weapon | Armor;

export const enum DefaultWeaponEnchantments {
  sharpness,
  typeSpecific,
  breach
}
export const enum DefaultArmorEnchantments {
  protection,
  typeSpecific
}
export const enum CustomWeaponEnchantmentEffectTarget {
  damage,
  armorEffectiveness
}
export interface CustomWeaponEnchantment {
  effect: CustomWeaponEnchantmentEffectTarget,
  value: number
}
export interface CustomArmorEnchantment {
  epf: number
}

export interface BuiltinWeaponEnchantment {
  type: DefaultWeaponEnchantments,
  level: number
}
export interface BultinArmorEnchantment {
  type: DefaultArmorEnchantments,
  level: number
}
export type WeaponEnchantment = BuiltinWeaponEnchantment | CustomWeaponEnchantment;
export type ArmorEnchantment = BultinArmorEnchantment | CustomArmorEnchantment;
type Enchantment = WeaponEnchantment | ArmorEnchantment;

interface EnchantedItem<I extends Item, E extends Enchantment> {
  item: I,
  enchantments: E[]
}
export type EnchantedWeapon = EnchantedItem<Weapon, WeaponEnchantment>;
export type EnchantedHeadArmor = EnchantedItem<HeadArmor, ArmorEnchantment>;
export type EnchantedChestArmor = EnchantedItem<ChestArmor, ArmorEnchantment>;
export type EnchantedLegsArmor = EnchantedItem<LegsArmor, ArmorEnchantment>;
export type EnchantedFeetArmor = EnchantedItem<FeetArmor, ArmorEnchantment>;

export type EnchantedArmorSet = [EnchantedHeadArmor, EnchantedChestArmor, EnchantedLegsArmor, EnchantedFeetArmor];

function isCustomWeapon(weapon: Weapon): weapon is CustomWeapon {
  return !(typeof weapon === "number");
}
function isCustomWeaponEnchantment(enchantment: WeaponEnchantment): enchantment is CustomWeaponEnchantment {
  return !("level" in enchantment);
}
function isCustomArmor(armor: Armor): armor is CustomArmor {
  return !(typeof armor === "number");
}
function isCustomArmorEnchantment(enchantment: ArmorEnchantment): enchantment is CustomArmorEnchantment {
  return !("level" in enchantment);
}

export { isCustomWeapon, isCustomWeaponEnchantment, isCustomArmor, isCustomArmorEnchantment };
