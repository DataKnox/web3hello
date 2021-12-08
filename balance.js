const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

const pubKey = new PublicKey("DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo");

console.log(pubKey);
const getWalletBalance = async () => {
    try {
        console.log("hello world")
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const walletBalance = await connection.getBalance(pubKey);
        console.log('Wallet address is ${pubKey}');
        console.log(walletBalance);
    } catch (err) {
        console.log(err)
    }
};


const main = async () => {
    await getWalletBalance();
}
main();