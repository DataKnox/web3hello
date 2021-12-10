const {
    getHashedName,
    getNameAccountKey,
    NameRegistryState,
} = require("@solana/spl-name-service");
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");
// Address of the SOL TLD
const SOL_TLD_AUTHORITY = new PublicKey(
    "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
);


const getInputKey = async (input) => {
    let hashed_input_name = await getHashedName(input);
    let inputDomainKey = await getNameAccountKey(
        hashed_input_name,
        undefined,
        SOL_TLD_AUTHORITY
    );
    return { inputDomainKey: inputDomainKey, hashedInputName: hashed_input_name };
};


// ...
const main = async () => {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const { inputDomainKey } = await getInputKey("knoxtrades");
    const registry = await NameRegistryState.retrieve(
        connection,
        inputDomainKey
    );
    console.log(registry.owner.toBase58())
}

main()

