const { ethers } = require("hardhat");

async function main() {
    const StudentRegistration = await ethers.getContractFactory("StudentRegistration");
    const studentRegistration = await StudentRegistration.deploy();
    await studentRegistration.deployed();
    console.log("StudentRegistration deployed to:", studentRegistration.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });