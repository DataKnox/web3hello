const {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKey,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL } = require("@solana/web3.js")
const fromWallet = new Keypair();
const toWallet = new Keypair();


const airDropSol = async (fromWalletParam) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
        const fromPubKey = new PublicKey(fromWalletParam._keypair.publicKey);
        const fromAirDropSignature = await connection.requestAirdrop(fromPubKey, 1 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature)
    } catch (err) {
        console.log(err)
    }
};

const transferSOL = async (fromWalletParam, toWalletParam, amount) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
        const fromPubKey = new PublicKey(fromWalletParam._keypair.publicKey);
        // const fromPrivKey = fromWalletParam._keypair.secretKey;
        //const fromWalletKeyPair = await Keypair.fromSecretKey(fromPrivKey)

        const toPubKey = new PublicKey(toWalletParam._keypair.publicKey);
        // const toPrivKey = toWalletParam._keypair.secretKey;
        console.log("create txn")
        const txn = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: fromPubKey,
                toPubkey: toPubKey,
                lamports: amount * LAMPORTS_PER_SOL
            })
        )

        console.log("enter send and confirm Txn")
        console.log(`conn: ${connection}`)
        console.log(`txn: ${txn}`)
        console.log(`sign wallet: ${fromWalletParam}`)
        const sig = await sendAndConfirmTransaction(
            connection,
            txn,
            [fromWalletParam]
        );
        console.log(sig)
        return sig
    } catch (err) {
        console.log(err)
    }
}

const getWalletBalance = async (fromWalletParam) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
        const fromPubKey = new PublicKey(fromWalletParam._keypair.publicKey);
        const balance = await connection.getBalance(fromPubKey)
        console.log(balance)
        return balance / LAMPORTS_PER_SOL

    } catch (err) {
        console.log(err)
    }
}

const main = async (fromWalletParam, toWalletParam, amount) => {

    await getWalletBalance(fromWalletParam)
    await airDropSol(fromWalletParam)
    await getWalletBalance(fromWalletParam)
    await transferSOL(fromWalletParam, toWalletParam, amount)
    await getWalletBalance(fromWalletParam)
}
main(fromWallet, toWallet, 0.5)
