import aggregatorV3InterfaceABI from '@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const usePriceFeed = (contractAddress: string, rpcUrl: string) => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const aggregatorV3Interface = new ethers.Contract(contractAddress, aggregatorV3InterfaceABI, provider);

      const result = await aggregatorV3Interface.latestRoundData();
      const answer = result[1];
      const decimals = await aggregatorV3Interface.decimals();
      const price = parseFloat(ethers.utils.formatUnits(answer, decimals));

      setPrice(price);
      setLoading(false);
    };

    fetchPrice();
  }, [contractAddress, rpcUrl]);

  return { price, loading };
};
