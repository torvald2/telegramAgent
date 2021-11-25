import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  getJsonRpcUrl


} from 'forta-agent'
import Checker, {IChecker} from "./checker"
import Filter, {IFilter} from './filter'
import {sendMessage} from "./telegram"

import Web3 from 'web3'

const web3 = new Web3(getJsonRpcUrl())
const abi = require('erc-20-abi')


export const createHandler = (checker:IChecker, filter:IFilter): HandleTransaction => {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];

    const transactions = filter(txEvent)
    for (let tx of transactions){
      if (!await checker(tx.args.token0)){
        const contract0 = new web3.eth.Contract(abi,tx.args.token0)
        const contract1 = new web3.eth.Contract(abi,tx.args.token1)
        try{
          const symbol0 = await contract0.methods.symbol().call()
          const symbol1 = await contract1.methods.symbol().call()
          sendMessage(symbol0,symbol1, tx.args.token0)
        }
        catch {
          console.log("error")
        }

        
        
      }
    }
  return findings;
  }}



export default {
  handleTransaction:createHandler(Checker,Filter)
}