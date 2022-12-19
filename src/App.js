import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import { SnackbarProvider } from "notistack";

// custom components
import AddCurrentlyInvolvedInfo from "./components/AddCurrentlyInvolvedInfo";

const App = () => {
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
        <AddCurrentlyInvolvedInfo />
      </SnackbarProvider>
    </>
  );
};

export default App;
