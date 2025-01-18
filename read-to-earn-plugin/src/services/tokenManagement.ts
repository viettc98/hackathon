import { ContractAbi, Web3 } from "web3";
import { bookABI } from "./abi/bookABI";

const RPC_URL = "https://1rpc.io/sepolia";

export const contractAddress = "0xde51c9cc6aa0850f9dd7a3e6e8dff2e967a506bc";

export class TokenManagement {
  connection: Web3;

  constructor() {
    this.connection = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  }

  async claimToken(params: {
    amount: number;
    signature: string;
    userAddress: string;
    onSendTx: (tx: any) => Promise<string>;
  }) {
    const { amount, signature, userAddress, onSendTx } = params;
    const { contract } = this.genContract();

    const rawData = contract.methods.claim_token(amount, signature).encodeABI();

    const txParams = {
      from: '0x9836fC884ed08Cf3a2e3D999D83D568DaC064141',
      to: contractAddress,
      data: rawData,
    };

    console.log('txParams', txParams)

    const hash = await onSendTx?.(txParams);
    return hash;
  }

  private genContract() {
    const contract = this.getContract<typeof bookABI>(bookABI, contractAddress);
    return { contract, contractAddress };
  }

  private getContract<TAbi extends ContractAbi>(
    abi: TAbi,
    contractAddress: string
  ) {
    const client = this.connection;
    const contract = new client.eth.Contract(abi, contractAddress);

    return contract;
  }
}
