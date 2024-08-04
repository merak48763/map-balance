function calculateDamageDealt(attack: number, enchantmentBonus: number): [number, number] {
  const clampedAttack = Math.max(0, attack);
  return [
    Math.max(0, clampedAttack + enchantmentBonus),
    Math.max(0, clampedAttack*1.5 + enchantmentBonus)
  ];
}

function calculateDamageTaken(armor: number, armorToughness: number, epf: number, incomingDamage: number, incomingBreachEffect: number) {
  let armorEffectiveness = (armor - 4*incomingDamage / (armorToughness+8)) / 25;
  if(armorEffectiveness > 0.8) {
    armorEffectiveness = 0.8;
  }
  else if(armorEffectiveness < armor / 125) {
    armorEffectiveness = armor / 125;
  }

  armorEffectiveness += incomingBreachEffect;
  if(armorEffectiveness < 0) {
    armorEffectiveness = 0;
  }
  else if(armorEffectiveness > 1) {
    armorEffectiveness = 1;
  }

  let magicProtection = epf * 0.04;
  if(magicProtection > 0.8) {
    magicProtection = 0.8;
  }
  else if(magicProtection < 0) {
    magicProtection = 0;
  }

  return incomingDamage * (1 - armorEffectiveness) * (1 - magicProtection);
}

export { calculateDamageDealt, calculateDamageTaken };
