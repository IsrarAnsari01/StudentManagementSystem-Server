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
* **Teacher Can**
  - edit their profile
  - list their students
  - list courses to which they are assigned
  - Add/update/delete meta information
* **Student Can**
  - enroll themselves in courses
  - edit their profile
  - list their courses 
  - list all active Course
  - list all Open courses along with teachers
  - Add/update/delete meta information
### Feature
* Authorization In APIs
* Form validation
* JWT Token for Authentication
* Pagination and Sorting 
### Tools
* express js
* jsonwebtoken
* mysql2
* sequelize


