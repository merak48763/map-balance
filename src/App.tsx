import { createTheme, MantineProvider } from "@mantine/core";

import Shell from "./parts/Shell";

const theme = createTheme({
  fontFamilyMonospace: "inconsolata, monospace"
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Shell />
    </MantineProvider>
  );
}

export default App;
