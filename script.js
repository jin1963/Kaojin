let web3;
let contract;
let user;

// ✅ ที่อยู่ของ G3X24 Token (ต้องตรงกับของจริง)
const tokenAddress = "0x6cfD8Fe423F20F94825b5edB1E94068fBea19dC9";

// ✅ ดึง ABI จากไฟล์แยก (abi.json)
async function loadABI() {
    const response = await fetch("abi.json");
    return await response.json();
}

// ✅ เรียกเมื่อโหลดหน้าเว็บ
window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];

        // โหลด ABI แล้วสร้างสัญญา
        const abi = await loadABI();
        contract = new web3.eth.Contract(abi, tokenAddress);

        document.getElementById("status").innerText = "✅ Connected: " + user;

        // แสดงยอด G3X24
        const balance = await contract.methods.balanceOf(user).call();
        const decimals = await contract.methods.decimals().call();
        const formattedBalance = balance / (10 ** decimals);

        document.getElementById("g3xBalance").innerText = "G3X24 Balance: " + formattedBalance;
    } else {
        alert("⚠️ โปรดติดตั้ง MetaMask หรือ Bitget Wallet ก่อนใช้งาน");
    }
});
