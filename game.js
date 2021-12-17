const web3 = require("@solana/web3.js")

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
// console.log(connection);

const fromWallet = new web3.Keypair();
const fromPubKey = new web3.PublicKey(fromWallet._keypair.publicKey);
const fromPrivKey = fromWallet._keypair.secretKey;


const toWallet = new web3.Keypair();
const toPubKey = new web3.PublicKey(toWallet._keypair.publicKey);
const toPrivKey = toWallet._keypair.secretKey;

const airDropSol = async () => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed")
        const walletKeyPair = await web3.Keypair.fromSecretKey(fromPrivKey)
        const fromAirDropSignature = await connection.requestAirdrop(new web3.PublicKey(walletKeyPair.publicKey), 5 * web3.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature)
    } catch (err) {
        console.log(err)
    }
};

const transferSOL = async (from, to, amount) => {
    try {
        const connection = new web3.Connection(clusterApiUrl("devnet"), "confirmed")
        const txn = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: new web3.PublicKey(from),
                toPubkey: new web3.PublicKey(to),
                lamports: amount * web3.LAMPORTS_PER_SOL
            })
        )
        const sig = await web3.sendAndConfirmRawTransaction(
            connection,
            txn,
            [from]
        );
        console.log(sig)
        return sig
    } catch (err) {
        console.log(err)
    }
}

const getWalletBalance = async (publickey) => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed")
        const balance = await connection.getBalance(publickey)
        console.log(balance)
        return balance / web3.LAMPORTS_PER_SOL

    } catch (err) {
        console.log(err)
    }
}

const main = async () => {
    // console.log(fromPubKey)
    await getWalletBalance(fromPubKey)
    await airDropSol(fromPubKey)
    await getWalletBalance(fromPubKey)
}
main()