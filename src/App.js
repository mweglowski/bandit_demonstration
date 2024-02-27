import { useState, useEffect } from "react";
import BanditButtons from "./components/BanditButtons";
import BanditDetails from "./components/BanditDetails";
import { Distribution } from "./objects/Distribution.js";
import Section from "./components/Section.js";
import DistributionPanels from "./components/DistributionPanels.js";

function App() {
  const [banditsData, updateBanditsData] = useState([]);

  useEffect(() => {
    const initBanditsData = [];

    // DUMMY DATA, TO CONFIGURE IN THE FUTURE
    for (let i = 0; i < 4; i++) {
      const banditData = {
        id: i,
        clicks: 0,
        q: 0,
        Q: 0,
        distribution: new Distribution(),
      };

      banditData.q = banditData.distribution.q;
      // console.log(banditData.distribution.q)

      initBanditsData.push(banditData);
    }

    updateBanditsData(initBanditsData);
  }, []);

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
          };
        }
        return bandit;
      });
    });
  };

  return (
    <div className="p-2">
      <Section title="Actions">
        <BanditButtons
          onBanditButtonClick={banditButtonClickHandler}
          data={banditsData}
        />
      </Section>

      <Section title="Details">
        <BanditDetails data={banditsData} />
      </Section>

      <Section title="Distributions">
        <DistributionPanels data={banditsData} />
      </Section>
    </div>
  );
}

export default App;
