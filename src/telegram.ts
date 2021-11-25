import TelegramBot from 'node-telegram-bot-api'

const token = "2092004026:AAGZ4lMpr5XQ7sJb2ztHUZVxP06AD0SC7Y0"
const chatId = "-1001768885982"

const bot = new TelegramBot(token)

export function sendMessage(token0:string, token1:string, tokenid:string){
    bot.sendMessage(chatId, `New Pool Detected. ${token0}/${token1}. Contract https://bscscan.com/address/${tokenid}`)
}