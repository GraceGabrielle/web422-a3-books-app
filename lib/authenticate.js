import { jwtDecode } from "jwt-decode";

const setToken = (token) => {
    if (typeof window !== "undefined")
        localStorage.setItem("access_token", token);
};

const getToken = () => {
    if (typeof window !== "undefined")
        return localStorage.getItem("access_token");
    return null;
};

const removeToken = () => {
    if (typeof window !== "undefined")
        localStorage.removeItem("access_token");
};

const readToken = () => {
    if (typeof window !== "undefined") {
        const token = getToken();
        if (token) {
            return jwtDecode(token);
        }
    }
    return null;
};

const isAuthenticated = () => {
    const token = readToken();
    return token ? true : false;
};

const authenticateUser = async (user, password) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: user, password: password })
    });

    if (res.status === 200) {
        const data = await res.json();
        setToken(data.token);
        return true;
    } else {
        const data = await res.json();
        throw new Error(data.message);
    }
};

const registerUser = async (user, password, password2) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: user, password: password, password2: password2 })
    });

    if (res.status === 200) {
        return true;
    } else {
        const data = await res.json();
        throw new Error(data.message);
    }
};

export { setToken, getToken, removeToken, readToken, isAuthenticated, authenticateUser, registerUser };