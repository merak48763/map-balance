import { createTheme, MantineProvider } from "@mantine/core";

import Shell from "./parts/Shell";

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Shell />
    </MantineProvider>
  );
}

export default App;
