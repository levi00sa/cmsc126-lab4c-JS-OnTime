let students_list = [];

function time_now() { //get current date and time
    const currentDate = new Date();
    const dateFormat = { //format for date
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", dateFormat);
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let periodofDay = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12 //convert from 24-hr format to 12-hr
    minutes = minutes.toString().padStart(2, "0");
    const timeFormat = `${hours}:${minutes} ${periodofDay}`;
    document.getElementById("displayDate").innerHTML = `Today is: ${formattedDate}. <br>The current time is ${timeFormat}.`;
}

function generateStudentNum() {
    let newStudentNum;
    do {
        let randomDigits = Math.floor(10000 + Math.random() * 90000); // 
        newStudentNum = "2023" + randomDigits;
    } while (students_list.some(student => student.studentNum === newStudentNum));
    return newStudentNum;
}

function add_student(event) {
    event.preventDefault();

    const studentNum = generateStudentNum();
    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const upEmail = document.getElementById("upEmail").value.trim();
    const course = document.getElementById("course").value;

    // if (studentNum.length !== 9) {
    //     alert("Enter a valid student number.");
    //     return;
    // }
    const errorMessage1 = document.getElementById("nameError");
    const errorMessage2 = document.getElementById("ageError");
    const errorMessage3 = document.getElementById("emailError");
    errorMessage1.innerHTML = "";
    errorMessage2.innerHTML = "";
    errorMessage3.innerHTML = "";
    errorMessage1.className = "";
    errorMessage2.className = "";
    errorMessage3.className = "";

    let error = false;
    if (name.length < 5 || !name.includes(" ")) {
        errorMessage1.innerHTML = "Name must be at least 5 characters long and contain a space.";
        errorMessage1.className = "error";
        error = true;
    }
    //age is 17 and above 
    if (age < 17 || age > 99) {
        errorMessage2.innerHTML = "Age must be between 17 and 99.";
        errorMessage2.className = "error";
        error = true;
    }
    //email for up students always ends with @up.edu.ph
    if (!upEmail.endsWith("@up.edu.ph")) {
        errorMessage3.innerHTML = "Email must end with @up.edu.ph.";
        errorMessage3.className = "error";
        error = true;
    }

    if (error) {
        return;
    }
    
    //add student to the list
    //reset the student form every time a new student is added
    let student = { studentNum, name, age, upEmail, course };
    students_list.push(student);
    alert("Student added successfully to database!");
    document.getElementById("studentForm").reset();
}
function find_student() {
    const searchStudent = document.getElementById("searchStudentNum").value.trim().split('-').join('').split(' ').join('');
    const displayResults = document.getElementById("searchResults");
    const foundStudent = students_list.find(student => student.studentNum == searchStudent);
    if (foundStudent) {
        displayResults.className = "";
        displayResults.innerHTML = `
                <p>Student Found: <br><br>
                <strong>Student Number:</strong> ${foundStudent.studentNum} <br>
                <strong>Name:</strong> ${foundStudent.name} <br>
                <strong>Age:</strong> ${foundStudent.age} <br>
                <strong>UP Email:</strong> ${foundStudent.upEmail} <br>
                <strong>Course:</strong> ${foundStudent.course}</p>`;
    } else {
        displayResults.innerHTML = "Error: Student not found.";
        displayResults.className = "error";
    }
}
function display_list() {
    const studentList = document.getElementById("studentList");
    if (students_list.length == 0) {
        studentList.innerHTML = "No students found.";
        return;
    } else {
        let studentTable = `<table border='1'>
        <tr>
            <th>Student Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>UP Email</th>
            <th>Course</th>
        </tr>`;
        students_list.forEach(student => {
            studentTable += `
            <tr>
                <td>${student.studentNum}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.upEmail}</td>
                <td>${student.course}</td>
            </tr>`;
        });
        studentTable += `</table>`;
        studentList.innerHTML = studentTable;
    }
}
