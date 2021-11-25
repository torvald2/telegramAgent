# IS Honeyspot token

## Description
Detects new pool created events on PancakeSwap Router v2 and return finding when pool created with scam token. 
Token check method similar to honeyspot.is
## Supported Chains

 BSC

## Alerts


- FSCAM-PANCAKESWAP-01
  - Fired when a new pool created
  - Severity is always set to "hight" 
  - metadata.address - token address


