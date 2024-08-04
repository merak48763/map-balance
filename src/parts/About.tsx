import { Stack, Text, Button, rem } from "@mantine/core";
import { IconBrandDiscord } from "@tabler/icons-react";

function About() {
  return (
    <Stack p="sm" align="flex-start">
      <Text>
        作者：Merak（
        <Text span ff="monospace">merak48763</Text>
        ）
      </Text>
      <Button variant="outline" leftSection={<IconBrandDiscord style={{width: rem(18), height: rem(18)}} />} component="a" href="https://discord.gg/UMYxwHyRNE" target="_blank">創世聯邦Discord</Button>
    </Stack>
  );
}

export default About;
