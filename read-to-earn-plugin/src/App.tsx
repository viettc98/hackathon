import RootProvider from "./providers/RootProvider";
import Page from "./pages";

function App() {
  return (
    <RootProvider>
      <Page />
    </RootProvider>
  );
}

export default App;
