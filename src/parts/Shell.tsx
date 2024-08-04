import { useState, useEffect } from "react";
import { AppShell, Burger, Group, NavLink, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSword, IconShield, IconInfoSquareRounded as IconInfo, IconIkosaedr } from "@tabler/icons-react";
import { Pages } from "../types";

import { PlayerAttackLabProvider } from "../minecraft/playerAttackLab";

import PlayerAttackPage from "./PlayerAttack";
import MobAttackPage from "./MobAttack";
import AboutPage from "./About";

const pages = [
  {
    label: "攻擊測試",
    value: Pages.weapon,
    icon: IconSword,
    page: PlayerAttackPage
  },
  {
    label: "受傷測試",
    value: Pages.mob,
    icon: IconShield,
    page: MobAttackPage
  },
  {
    label: "關於",
    value: Pages.about,
    icon: IconInfo,
    page: AboutPage
  }
]

function Shell() {
  const [navOpened, {toggle: toggleNav, close: closeNav}] = useDisclosure();
  const [activePage, setActivePage] = useState(Pages.weapon);

  useEffect(() => {
    closeNav();
  }, [activePage]);

  return (
    <AppShell header={{height: 60}} navbar={{
      width: 300,
      breakpoint: "sm",
      collapsed: {
        mobile: !navOpened
      }
    }}>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={navOpened} onClick={toggleNav} hiddenFrom="sm" size="sm" />
          <IconIkosaedr style={{width: rem(32), height: rem(32)}} />
          <Text fw={600} fz={rem(24)}>Minecraft 地圖平衡工具箱</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {pages.map(p =>
          <NavLink key={p.value} label={p.label} active={activePage === p.value} onClick={() => setActivePage(p.value)} leftSection={<p.icon />} />
        )}
      </AppShell.Navbar>
      <AppShell.Main>
        <PlayerAttackLabProvider>
          {pages.map(p =>
            activePage === p.value && <p.page key={p.value} />
          )}
        </PlayerAttackLabProvider>
      </AppShell.Main>
    </AppShell>
  );
}

export default Shell;
