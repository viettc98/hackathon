import RootProvider from "./providers/RootProvider";
import Page from "./pages";
import React from "react";

function App() {
  return (
    <RootProvider>
      <Page />
    </RootProvider>
  );
}

export default App;
