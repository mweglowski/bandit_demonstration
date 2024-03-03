import React, { createContext, useContext, useState, useEffect } from 'react';
import { Distribution } from '../objects/Distribution';
import { findMaxValueIndex } from '../utils/findMaxValueIndex';

const BanditContext = createContext();

export const useBanditContext = () => useContext(BanditContext);

export const BanditProvider = ({ children }) => {
  const [banditsData, setBanditsData] = useState([]);
  const [bestAction, setBestAction] = useState(-1);

  const generateBanditsData = () => {
    const initBanditsData = [];

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

    setBanditsData(initBanditsData);
		setBestAction(findMaxValueIndex(initBanditsData.map(bandit => bandit.q)));
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
    <BanditContext.Provider value={{ banditsData, bestAction, banditButtonClickHandler, generateBanditsData }}>
      {children}
    </BanditContext.Provider>
  );
};
