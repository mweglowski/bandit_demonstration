import React, { createContext, useContext, useState, useEffect } from 'react';
import { Distribution } from '../objects/Distribution';
import { findMaxValueIndex } from '../utils/findMaxValueIndex';

const BanditContext = createContext();

export const useBanditContext = () => useContext(BanditContext);

export const BanditProvider = ({ children }) => {
  const [banditsData, setBanditsData] = useState([]);

  const generateBanditsData = () => {
    let initBanditsData = [];

    for (let i = 0; i < 4; i++) {
      let banditData = {
        id: i,
        clicks: 0,
        q: 0,
        Q: 0,
        distribution: new Distribution(),
        lastDrawnNumber: null,
        best: false,
      };

      banditData.q = banditData.distribution.q;
      
      initBanditsData.push(banditData);
    }

    const expectedValues = initBanditsData.map(bandit => bandit.q)
    const bestAction = findMaxValueIndex(expectedValues)
    initBanditsData[bestAction]["best"] = true;

    setBanditsData(initBanditsData);
  };

  useEffect(() => {
    generateBanditsData();
  }, []);

	const banditButtonClickHandler = (id) => {
    setBanditsData((prevBanditsData) => {
      return prevBanditsData.map((bandit) => {
        if (bandit.id === id) {
          const target = bandit.distribution.drawNumber();
          const old_estimate = bandit.Q;
          const step_size = bandit.clicks !== 0 ? 1 / bandit.clicks : 1;

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
    <BanditContext.Provider value={{ banditsData, banditButtonClickHandler, generateBanditsData }}>
      {children}
    </BanditContext.Provider>
  );
};
