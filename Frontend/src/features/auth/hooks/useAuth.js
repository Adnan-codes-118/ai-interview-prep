import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
    login,
    register,
    logout,
    getMe
} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({ email, password });

            setUser(data.user);

            // Important: send the response back to Login.jsx
            return data;
        } catch (err) {
            // Important: don't silently hide the error
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);

            // Important: send the response back to Register.jsx
            return data;
        } catch (err) {
            // Important: don't silently hide the error
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);

        try {
            await logout();

            setUser(null);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();

                setUser(data.user);
            } catch (err) {
                // User is simply not logged in
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, [setUser, setLoading]);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};