// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistration {
    struct Student {
        string name;
        uint256 id;
        bool registered;
    }

    mapping(uint256 => Student) public students;
    uint256 public studentCount;

    function registerStudent(string memory _name) public {
        studentCount++;
        students[studentCount] = Student(_name, studentCount, true);
    }

    function getStudent(uint256 _id) public view returns (string memory, uint256, bool) {
        Student memory student = students[_id];
        return (student.name, student.id, student.registered);
    }
}