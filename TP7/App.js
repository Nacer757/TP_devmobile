import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator, Button } from "react-native";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import TodolistOfflineScreen from "./screens/TodolistOfflineScreen";
import TodolistFetchScreen from "./screens/TodolistFetchScreen";

function MainApp() {
    const [screen, setScreen] = useState("offline"); // "offline" or "api"
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#FFFFFF" }]}>
            <View style={[styles.nav, { borderBottomColor: isDarkMode ? "#444" : "#ccc" }]}>
                <Button
                    title="Mode Offline"
                    onPress={() => setScreen("offline")}
                    color={screen === "offline" ? (isDarkMode ? "#bb86fc" : "blue") : "gray"}
                />
                <Button
                    title="Mode API"
                    onPress={() => setScreen("api")}
                    color={screen === "api" ? (isDarkMode ? "#bb86fc" : "blue") : "gray"}
                />
            </View>
            {screen === "offline" ? <TodolistOfflineScreen /> : <TodolistFetchScreen />}
        </View>
    );
}

export default function App() {
    const [dbReady, setDbReady] = useState(false);

    useEffect(() => {
        const prepareDb = async () => {
            await initDB();
            setDbReady(true);
        };
        prepareDb();
    }, []);

    if (!dbReady) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <ThemeProvider>
            <MainApp />
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: 10,
        borderBottomWidth: 1,
        marginBottom: 10,
    }
});