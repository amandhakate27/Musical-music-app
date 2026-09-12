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
        const exists = registeredUser.find((u) => u.email === data.email || u.username === data.username);
        if (exists) return { ok: false, message: "User with this email or username already exists!" };
        setRegisteredUser((prev) => [...prev, data]);
        return { ok: true };
    };

    const login = (email, password) => {
        const user = registeredUser.find((u) => u.email === email && u.password === password);
        if (!user) return null;
        setLoggedInUser(user);
        return user;
    };

    return (
        <AuthContext.Provider value={{ registeredUser, setRegisteredUser, loggedInUser, setLoggedInUser, login, registerUser }} >
            {children}
        </AuthContext.Provider>
    )
}
