import { useEffect } from "react";
import { useMinecraft } from "../minecraft/hook";

// import WeaponCard from "../components/WeaponCard";

function PlayerAttack() {
  const {
    playerAttackLab: {
      setPlayerWeapons,
      setDummyMob,
      damageDealt,
      damageTaken,
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
          }
        ]
      },
      {
        item: 5,
        enchantments: [
          {
            type: 2,  // breach
            level: 6
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

  return (
    <div style={{fontFamily: "inconsolata"}}>
      Armor: {dummyArmor} / Toughness: {dummyArmorToughness} / EPF: {dummyMagicProtection}<br />
      Weapon Damage: {damageDealt.map(value => value.toLocaleString(undefined, {maximumFractionDigits: 4})).join(", ")} <br />
      Damage Taken: {damageTaken.map(value => value.toLocaleString(undefined, {maximumFractionDigits: 4})).join(", ")}
    </div>
  );
}

export default PlayerAttack;
