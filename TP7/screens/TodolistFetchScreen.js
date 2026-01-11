import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import { useEffect, useState, useContext } from "react";
import { fetchTodosFetch } from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function TodolistFetchScreen() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDarkMode = theme === "dark";

    const styles = {
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? "#121212" : "#FFFFFF",
            paddingTop: 20,
        },
        text: {
            color: isDarkMode ? "#FFFFFF" : "#000000",
            padding: 10,
        }
    };

    useEffect(() => {
        fetchTodosFetch()
            .then(setTodos)
            .catch(() => setError("Impossible de charger les tâches"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <View style={styles.container}><ActivityIndicator size="large" /></View>;

    return (
        <View style={styles.container}>
            <Button
                title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
                onPress={toggleTheme}
            />

            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.text}>{item.title}</Text>
                )}
            />
        </View>
    );
}