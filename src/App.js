import { useState } from "react";
import { SnackbarProvider } from "notistack";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";

// custom components
import AppContext from "./components/context/AppContext";
import AddCurrentlyInvolvedInfo from "./components/AddCurrentlyInvolvedInfo";

const App = () => {
  const [entries, setEntries] = useState([]);

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <AppContext.Provider value={{ entries, setEntries }}>
          <AddCurrentlyInvolvedInfo />
        </AppContext.Provider>
      </SnackbarProvider>
    </>
  );
};

export default App;
