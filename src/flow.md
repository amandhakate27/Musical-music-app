
## register page 
- adding role based registration form using react-hook-form
- roles are - listener and artist
- hidden input field for role is added to the form
- common input fields are - Full Name, username, email, password
- for password field there is a seperate useState to toggle the visibility of password
- when user add their details and click on register button then details are stored in localstorage it will reflect in useState arr in context api. 
- if user is already registered then there is a link to login page.


## Registration Steps:
1. src/pages/Register.jsx:15 form defaultValues: {role:"listener"} se start
2. User radio listener/artist select -> watch("role") src/pages/Register.jsx:20 se active color
3. Create Account click -> handleSubmit(handleRegister) src/pages/Register.jsx:59
4. handleRegister(data) src/pages/Register.jsx:27 -> registerUser(data) src/context/AuthContext.jsx:22 call
5. register() me registeredUser.find(email || username) check - exist toh alert return
6. Nahi toh setRegisteredUser(prev=>[...prev, data]) src/context/AuthContext.jsx:25 - RAM update
7. useEffect src/context/AuthContext.jsx:17 auto localStorage.setItem("registeredUsers", JSON.stringify(...)) - disk save
8. navigate("/login") src/pages/Register.jsx:32

## Login Steps:
1. Reload pe src/context/AuthContext.jsx:7 JSON.parse(localStorage.getItem('registeredUsers')||"[]") se RAM load
2. src/pages/Login.jsx:66 email/pass fill -> handleSubmit(handleLogin)
3. handleLogin src/pages/Login.jsx:12 -> login(email,pass) src/context/AuthContext.jsx:30 call
4. login() me registeredUser.find(email && password) - nahi mila toh null -> alert Invalid
5. Mila toh setLoggedInUser(user) src/context/AuthContext.jsx:33 + return user
6. useEffect src/context/AuthContext.jsx:20 auto localStorage.setItem("loggedInUser", JSON.stringify(user))
7. src/pages/Login.jsx:18 returned user.role==="artist" ? navigate("/main/artist-dashboard") : navigate("/main")
8. src/router/Protected.jsx:6 / Public.jsx:6 loggedInUser check se guard pass