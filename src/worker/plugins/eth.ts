import {ethers} from "ethers";

export const getProvider = async (): Promise<ethers.providers.Provider> => {
  const provider = new ethers.getDefaultProvider("mainnet")
  return provider
}
