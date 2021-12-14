const {
    Connection,
    PublicKey,
    clusterApiUrl,
} = require("@solana/web3.js");
const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

const getTokens = async () => {
    try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        const tokenAccts = await connection.getParsedTokenAccountsByOwner(new PublicKey("DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo"),
            {
                programId: new PublicKey(TOKEN_PROGRAM),
            }
        );

        let nonZeroAccounts = tokenAccts?.value?.filter(
            (obj) => obj.account.data.parsed.info.tokenAmount.uiAmount > 0
        );
        for (let acct of nonZeroAccounts) {
            console.log(`Token account ${acct.pubkey.toBase58()} has balance ${acct.account.data.parsed.info.tokenAmount.amount}`)
        }
        // let mapAcctsKey = nonZeroAccounts.map((obj) => obj.pubkey.toBase58());
        // let mapAcctsInfo = nonZeroAccounts.map((obj) => obj.account.data.parsed.info);


    } catch (err) {
        console.log(err)
    }
}

getTokens();