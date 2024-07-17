import { View } from "react-native";
import { Routes } from "../routes/_routes";
import { AuthProvider } from "./_auth.provider";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = () => {
    return (
        <AuthProvider>
                <Routes />
            </AuthProvider>
    )
}