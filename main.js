
let userAccount;
const tokenAddress = "0x32880ed747bc5bbe4a2712682004398f32a16e0c";
const tokenABI = [
    {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
    }
];

async function connectWallet() {
    if (window.ethereum) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        userAccount = accounts[0];
        document.getElementById("status").textContent = `✅ Connected: ${userAccount}`;
        getBalance();
    } else {
        alert("Please install MetaMask or Bitget Wallet!");
    }
}

async function getBalance() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(tokenABI, tokenAddress);
    const balance = await contract.methods.balanceOf(userAccount).call();
    const decimals = await contract.methods.decimals().call();
    const formattedBalance = balance / Math.pow(10, decimals);
    document.getElementById("balance").textContent = formattedBalance.toFixed(4);
}

document.getElementById("connectBtn").addEventListener("click", connectWallet);
