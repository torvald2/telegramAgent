import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import {createHandler} from "./agent"
  import Filter from "./filter"
  import {IChecker} from "./checker"

  
  
  describe("agent", () => {
    
    const createChecker = (res:boolean):IChecker =>{
      let mock:IChecker
      mock = (address:string):Promise<boolean> => {
        return new Promise((resolve,reject)=>{
          resolve(res)
        })
      }
      return mock

    }
    const createTx = () => createTransactionEvent({
      transaction:{
        hash:"0x",
        to:"0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
        from:"0xd8beef91f884b9fa5e8c6cb83df08f53bb3dfe1e",
        nonce:1,
        gas:"",
        gasPrice:"",
        value:"",
        data:"",
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {
        status:true,
        root:"",
        gasUsed:"",
        cumulativeGasUsed:"",
        logsBloom:"",
        logs:[
          {
            address:"0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
            topics:[
              "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9",
              "0x0000000000000000000000008aa621be2c5f3672303c309bfb0dd4018979b970",
              "0x000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56"
            ],
            data:"0x0000000000000000000000009ba2cf43330b9147c54f3300ea9cd2c146bd42f3000000000000000000000000000000000000000000000000000000000008c252",
            logIndex:1656,
            blockHash:"",
            blockNumber:1,
            transactionHash:"",
            transactionIndex:1,
            removed:false

        
         }
        ],
        contractAddress:"0xca143ce32fe78f1f7019d7d551a6402fc5350c73",
        blockHash:"",
        blockNumber:1,
        transactionHash:"",
        transactionIndex:1

      },
      block:{}as any


    })
  
   
    describe("scam detector", () => {
      it("not scam", async () => {
        const checker = createChecker(false)
        const agent = createHandler(checker, Filter)
        const txEvent = createTx()
  
        const findings = await agent(txEvent)
  
        expect(findings.length).toEqual(0)
      })

      it("scam", async () => {
        const checker = createChecker(true)
        const agent = createHandler(checker, Filter)
        const txEvent = createTx()
  
        const findings = await agent(txEvent)
  
        expect(findings.length).toEqual(1)
      })
  
    })
  })