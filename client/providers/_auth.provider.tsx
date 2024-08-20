import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { validate } from '../auth/_auth.actions';

type User = string | null 

interface AuthContextProps {
    user: User,
    login: (token: string) => void,
    logout: () => void,
    validate: () => Promise<any>
}

export const AuthContext = React.createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {},
    validate: async () => {}
});

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    return (
        <AuthContext.Provider value={{
            user,
            login: (token) => {
                setUser(token);
                console.log('User after login:', token);  // Add this log
                SecureStore.setItem('token', token);
                return console.log(SecureStore.getItem('token'));
            },
            logout: async () => {
                setUser(null);
                return await SecureStore.deleteItemAsync('token');
            },
            validate: async (): Promise<any> => {
                try {
                    const status = await validate();
                    if (status) {
                        const token = await SecureStore.getItemAsync('token'); // Fetch token properly
                        return setUser(token); // Set the user state with the actual token
                    }
                } catch (err) {
                    setUser(null);
                    return SecureStore.deleteItemAsync('token');
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}

