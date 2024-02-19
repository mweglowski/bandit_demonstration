import { useState } from "react";
import BanditButtons from "./components/BanditButtons";
import BanditDetails from "./components/BanditDetails";

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
