import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [registeredUser, setRegisteredUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('registeredUsers') || "[]");
        } catch {
            return [];
        }
    });
    const [loggedInUser, setLoggedInUser] = useState(() => {
        try {
            const val = localStorage.getItem('loggedInUser');
            return val ? JSON.parse(val) : null;
        } catch {
            return null;
        }
    });


    useEffect(() => {
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUser));
    }, [registeredUser]);

    useEffect(() => {
        if (loggedInUser) localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        else localStorage.removeItem("loggedInUser");
    }, [loggedInUser]);

    const registerUser = (data) => {
        console.log("Register attempt:", data);
        const exists = registeredUser.find((u) => u.email === data.email || u.username === data.username);
        if (exists) {
            console.log("Register failed - already exists:", exists);
            alert("User with this email or username already exists!");
            return false;
        }
        console.log("Register success:", data);
        setRegisteredUser((prev) => [...prev, data]);
        alert("Registration successful!");
        return true;
    };

    const login = (email, password) => {
        console.log("Login attempt:", email);
        const user = registeredUser.find((u) => u.email === email && u.password === password);
        if (!user) {
            console.log("Login failed for:", email);
            alert("User Not Found! Invalid Credentials");
            return null;
        }
        console.log("Login success:", user);
        setLoggedInUser(user);
        alert("Login Successful !");
        return user;
    };

    return (
        <AuthContext.Provider value={{ registeredUser, setRegisteredUser, loggedInUser, setLoggedInUser, login, registerUser }} >
            {children}
        </AuthContext.Provider>
    )
}
