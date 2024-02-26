import { useState, useEffect } from "react";
import BanditButtons from "./components/BanditButtons";
import BanditDetails from "./components/BanditDetails";
import { Distribution } from "./objects/Distribution.js";

function App() {
  const [banditsData, updateBanditsData] = useState([
    {
      id: 0,
      clicks: 0,
      q: (Math.random() * 10).toFixed(2),
      Q: 0,
    },
    {
      id: 1,
      clicks: 0,
      q: (Math.random() * 10).toFixed(2),
      Q: 0,
    },
    {
      id: 2,
      clicks: 0,
      q: (Math.random() * 10).toFixed(2),
      Q: 0,
    },
    {
      id: 3,
      clicks: 0,
      q: (Math.random() * 10).toFixed(2),
      Q: 0,
    },
  ]);

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
          return {
            ...bandit,
            clicks: bandit.clicks + 1,
          };
        }
        return bandit;
      });
    });
  };

  return (
    <div>
      <BanditButtons
        onBanditButtonClick={banditButtonClickHandler}
        data={banditsData}
      />
      <BanditDetails data={banditsData} />
    </div>
  );
}

export default App;
