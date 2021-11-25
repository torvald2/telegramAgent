import { LogDescription } from "@ethersproject/abi"
import { TransactionEvent} from "forta-agent"
const router = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
const abi = "event PairCreated(address indexed token0, address indexed token1, address pair, uint)"

export interface IFilter{
    (event:TransactionEvent):LogDescription[]
}

export default function(event:TransactionEvent):LogDescription[]{
    return event.filterLog(abi, router)
}