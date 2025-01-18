import { ContractAbi, Web3 } from "web3";
import { bookABI } from "./abi/bookABI";

const RPC_URL = "https://eth-sepolia.public.blastapi.io";

const contractAddress = "0x427aa41d859accb70d25181c6a01662aabdcf563";

export class TokenManagement {
  connection: Web3;

  constructor() {
    this.connection = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  }

  async claimToken(params: {
    amount: number;
    signature: string;
    userAddress: string;
  }) {
    const { amount, signature, userAddress } = params;
    const { contract } = this.genContract();

    const rawData = contract.methods.claim_token(amount, signature).encodeABI();

    const txParams = {
      from: userAddress,
      to: contractAddress,
      data: rawData,
    };

    // const hash = sendTx(txParams);
    return "hash";
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
