import { useState, useEffect } from "react";
import { Distribution } from "./objects/Distribution";
import BanditButtons from "./components/BanditButtons";
import BanditDetails from "./components/BanditDetails";
import DistributionPanels from "./components/DistributionPanels";
import SimulationContent from "./components/SimulationContent";
import Section from "./UI/Section";
import Backdrop from "./UI/Backdrop";

function App() {
  const [banditsData, updateBanditsData] = useState([]);
  const [isBackdropDisplayed, setBackDropDisplay] = useState(true);

  const generateBanditsData = () => {
    const initBanditsData = [];

    // DUMMY DATA, TO CONFIGURE IN THE FUTURE
    for (let i = 0; i < 4; i++) {
      const banditData = {
        id: i,
        clicks: 0,
        q: 0,
        Q: 0,
        distribution: new Distribution(),
        lastDrawnNumber: null,
      };

      banditData.q = banditData.distribution.q;

      initBanditsData.push(banditData);
    }

    updateBanditsData(initBanditsData);
  };

  useEffect(() => {
    generateBanditsData();
  }, []);

  const runAgentHandler = () => {
    toggleBackdropDisplay();
  };

  const toggleBackdropDisplay = () => {
    setBackDropDisplay((prevDisplay) => !prevDisplay);
  };

  const banditButtonClickHandler = (id) => {
    updateBanditsData((prevBanditsData) => {
      return prevBanditsData.map((bandit) => {
        if (bandit.id === id) {
          const target = bandit.distribution.drawNumber();
          const old_estimate = bandit.Q;
          const step_size = 1 / bandit.clicks;

          return {
            ...bandit,
            clicks: bandit.clicks + 1,
            // INCREMENTAL ACTION VALUE ESTIMATION FORMULA
            // Qn+1 = Qn + 1/n(Rn - Qn)
            Q:
              bandit.clicks === 0
                ? target
                : Number(
                    (
                      old_estimate +
                      step_size * (target - old_estimate)
                    ).toFixed(2)
                  ),
            lastDrawnNumber: target,
          };
        }
        return bandit;
      });
    });
  };

  return (
    <div>
      <main className="p-2 max-w-[700px] mx-auto">
        <Section title="Actions" animation="fade-in-animation">
          <BanditButtons
            onBanditButtonClick={banditButtonClickHandler}
            data={banditsData}
          />
        </Section>

        {!isBackdropDisplayed ? (
          <Section title="Details" animation="fade-in-animation">
            <BanditDetails data={banditsData} />
          </Section>
        ) : (
          <Section title="Details" animation="opacity-0 fade-out-animation">
            <BanditDetails data={banditsData} />
          </Section>
        )}

        <Section title="Distributions" animation="fade-in-animation">
          <DistributionPanels
            data={banditsData}
            onRandomizeButtonClick={generateBanditsData}
            onRunAgentButtonClick={runAgentHandler}
          />
        </Section>
      </main>

      {isBackdropDisplayed ? (
        <Backdrop>
          <SimulationContent
            toggleDisplay={toggleBackdropDisplay}
            banditsData={banditsData}
            updateBanditsData={updateBanditsData}
          />
        </Backdrop>
      ) : null}
    </div>
  );
}

export default App;
