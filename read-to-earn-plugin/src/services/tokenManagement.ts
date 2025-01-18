import { ContractAbi, Web3 } from "web3";
import { bookABI } from "./abi/bookABI";

const RPC_URL = "https://1rpc.io/sepolia";

export const contractAddress = "0xaa2e626ade421411347894ee1ad39ede20e5430e";

export class TokenManagement {
  connection: Web3;

  constructor() {
    this.connection = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  }

  async claimToken(params: {
    amount: number;
    // signature: string;
    userAddress: string;
    onSendTx: (tx: any) => Promise<string>;
  }) {
    const { amount
      // , signature
      , userAddress, onSendTx } = params;
    const { contract } = this.genContract();

    const rawData = contract.methods.claim_token(amount).encodeABI();

    const txParams = {
      from: userAddress,
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
