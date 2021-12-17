const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
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
        // Lookup Mint public key https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json
        for (let acct of nonZeroAccounts) {
            if (acct.account.data.parsed.info.mint == "8o66EVAf4u2Hr21m2tuRrPtEXFPLr8G8aL1ETStP8fDu") {
                console.log(`VIBE token balance is ${acct.account.data.parsed.info.tokenAmount.amount / LAMPORTS_PER_SOL}`)
            }
        }
    } catch (err) {
        console.log(err)
    }
}

getTokens();