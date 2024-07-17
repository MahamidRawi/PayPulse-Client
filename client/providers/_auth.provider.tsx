import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { validate } from '../auth/_auth.actions';

type User = string | null 

interface AuthContextProps {
    user: User,
    login: (token: string) => void,
    logout: () => void,
    validate: () => void
}

export const AuthContext = React.createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {},
    validate: () => {}
});

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [user, setUser] = useState<User>(null);
    
    return (
        <AuthContext.Provider value={{
            user,
            login: (token) => {
                setUser(token);
                SecureStore.setItem('token', token);
            },
            logout: () => {
                setUser(null);
                return SecureStore.deleteItemAsync('token');
            },
            validate: async () => {
                try {
                    const status = await validate();
                    if (status.success) {
                        return setUser(SecureStore.getItem('token'));
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

