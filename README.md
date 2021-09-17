## Intern Server 03 - Student Management System
### Roles
* Admin
* Student
* Teacher
### Functionality
* Signup
* Signin
* **Admin Can**
  - add/list/delete/update/singleList teachers
  - add/list/delete/update/singleList students
  - add/list/delete/update/singleList courses
  - add/list/delete/update/singleList Role
  - add other admins
  - assign courses to teachers (If its active)
  - enroll students into courses (if its open)
  - make courses available and assign open seats to the courses 
  - List of courses along with assigned Teachers
  - View Single course along with assigned Teacher
  - List of courses along with enrolled Students
  - Add Expertise of teacher
  - Add Intrested Subjects of student
* **Teacher Can**
  - edit their profile
  - list their students
  - list courses to which they are assigned
  - Add/update/delete meta information
  - Add Expertise
* **Student Can**
  - enroll themselves in courses
  - edit their profile
  - list their courses 
  - list all active Course
  - list all Open courses along with teachers
  - Add/update/delete meta information
  - Add Intrested Subjects
  - Filter Out treachers according to their intrested Subjects
### Feature
* Authorization In APIs
* When Student Add in our portal he/she will receive a mail which contain his/her password
* Form validation
* JWT Token for Authentication
* Pagination and Sorting 
* User can reset his/her password if he/she forget it
### Tools
* express js
* jsonwebtoken
* mysql2
* sequelize


