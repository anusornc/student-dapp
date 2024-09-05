import { expect } from "chai";
import { ethers } from "hardhat";


describe("StudentRegistry", function () {
  let StudentRegistry, studentRegistry, owner, addr1;

  beforeEach(async function () {
    // Get the contract factory and signers
    StudentRegistry = await ethers.getContractFactory("StudentRegistry");
    [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    studentRegistry = await StudentRegistry.deploy();
    await studentRegistry.deployed();
  });

  it("Should allow the owner to add a student", async function () {
    // Call the addStudent function as the owner
    await studentRegistry.addStudent("Alice", "Female", 90);

    // Fetch the student details
    const student = await studentRegistry.getStudent(1);
    expect(student.student_name).to.equal("Alice");
    expect(student.student_sex).to.equal("Female");
    expect(student.student_grade).to.equal(90);
  });

  it("Should not allow non-owners to add students", async function () {
    // Try to add a student from a non-owner address (addr1)
    await expect(
      studentRegistry.connect(addr1).addStudent("Bob", "Male", 85)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should correctly retrieve a student's details by ID", async function () {
    // Add a student
    await studentRegistry.addStudent("Charlie", "Male", 80);

    // Retrieve the student data
    const student = await studentRegistry.getStudent(1);
    expect(student.student_name).to.equal("Charlie");
    expect(student.student_sex).to.equal("Male");
    expect(student.student_grade).to.equal(80);
  });
});
