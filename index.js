const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

const newPair = new Keypair();
const pubKey = new PublicKey(newPair._keypair.publicKey).toString();
const privKey = newPair._keypair.secretKey;
console.log(pubKey);
const getWalletBalance = async () => {
    try {
        console.log("hello world")
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privKey);
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log('Wallet address is ${pubKey}');
        console.log(walletBalance);
    } catch (err) {
        console.log(err)
    }
};

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
        const walletKeyPair = await Keypair.fromSecretKey(privKey)
        const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(walletKeyPair.publicKey), 5 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature)
    } catch (err) {
        console.log(err)
    }
};

const main = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
main();