import { View, Text, FlatList, Button, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import { loadTodos, addTodoOffline, updateTodoOffline, deleteTodoOffline } from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodolistOfflineScreen() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
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
        },
        input: {
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            borderColor: isDarkMode ? "#FFFFFF" : "#000000",
            color: isDarkMode ? "#FFFFFF" : "#000000",
            backgroundColor: isDarkMode ? "#333333" : "#F9F9F9",
        },
        itemContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
        }
    };

    const refreshTodos = () => {
        setTodos(loadTodos());
    };

    const handleAddOrUpdate = () => {
        if (!title.trim()) return;

        if (editingId) {
            updateTodoOffline(editingId, title);
            setEditingId(null);
        } else {
            addTodoOffline(title);
        }

        setTitle("");
        refreshTodos();
    };

    useEffect(() => {
        refreshTodos();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
                onPress={toggleTheme}
            />

            <View style={{ padding: 10 }}>
                <TextInput
                    placeholder="Tâche offline"
                    placeholderTextColor={isDarkMode ? "#bbbbbb" : "#888888"}
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />

                <Button
                    title={editingId ? "Mettre à jour" : "Ajouter hors ligne"}
                    onPress={handleAddOrUpdate}
                />
            </View>

            {todos.length === 0 ? (
                <Text style={[styles.text, { textAlign: "center", marginTop: 20 }]}>
                    Aucune tâche disponible hors ligne
                </Text>
            ) : (
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={[styles.text, { flex: 1, marginLeft: 10 }]}>{item.title}</Text>
                            <Button
                                title="✏️"
                                onPress={() => {
                                    setTitle(item.title);
                                    setEditingId(item.id);
                                }}
                            />
                            <Button
                                title="🗑"
                                onPress={() => {
                                    deleteTodoOffline(item.id);
                                    refreshTodos();
                                }}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
}