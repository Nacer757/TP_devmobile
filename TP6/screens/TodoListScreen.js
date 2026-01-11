// src/screens/TodoListScreen.js
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux"; // Redux imports - replace with Zustand
import AppBar from "../components/AppBar";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoListScreen({ navigation }) {
  // Redux parts commented out
  // const todos = useSelector(state => state.todos);
  // const dispatch = useDispatch();


  const { todos, addTodo } = useTodoStore();

 
  useEffect(() => {
    addTodo({ id: 1, title: "Faire les courses" });
    addTodo({ id: 2, title: "Sortir le chien" });
    addTodo({ id: 3, title: "Coder une app RN" });
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <AppBar title="Mes tâches" />
      <FlatList
        data={todos}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
            <Text style={{ padding: 10, fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}