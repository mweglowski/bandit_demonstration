import { useState } from "react";
import { useBanditContext } from "./context/BanditContext";
import BanditButtons from "./components/BanditButtons";
import BanditDetails from "./components/BanditDetails";
import DistributionPanels from "./components/DistributionPanels";
import SimulationContent from "./components/Simulation/SimulationContent";
import Section from "./UI/Section";
import Backdrop from "./UI/Backdrop";

function App() {
  const [isBackdropDisplayed, setBackDropDisplay] = useState(false);
  const { generateBanditsData } = useBanditContext();

  const runAgentHandler = () => {
    toggleBackdropDisplay();
  };

  const toggleBackdropDisplay = () => {
    setBackDropDisplay((prevDisplay) => !prevDisplay);
  };

  return (
    <div>
      <main className="p-4 max-w-[700px] mx-auto">
        <Section title="Actions" animation="fade-in-animation">
          <BanditButtons />
        </Section>

        {!isBackdropDisplayed ? (
          <Section title="Details" animation="fade-in-animation">
            <BanditDetails />
          </Section>
        ) : (
          <Section title="Details" animation="opacity-0 fade-out-animation">
            <BanditDetails />
          </Section>
        )}

        <Section title="Distributions" animation="fade-in-animation">
          <DistributionPanels
            onRandomizeButtonClick={generateBanditsData}
            onRunAgentButtonClick={runAgentHandler}
          />
        </Section>
      </main>

      {isBackdropDisplayed ? (
        <Backdrop>
          <SimulationContent toggleDisplay={toggleBackdropDisplay} />
        </Backdrop>
      ) : null}
    </div>
  );
}

export default App;
