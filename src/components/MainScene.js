import React, { useCallback, useState, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import Task from "./Task";
import { FontAwesome } from "@expo/vector-icons";

const MainScene = () => {
  const tailwind = useTailwind();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);

  const handleAddTask = () => {
    if (task !== null && task.trim().length > 0) {
      Keyboard.dismiss();
      setTaskItems((prev) => {
        return [
          {
            task: task,
            check: false,
          },
          ...prev,
        ];
      });
      setTask(null);
    }
  };

  const toggleChecked = (item, index) => {
    const indexTaskItems = index;

    if (item.check === false) {
      item.check = true;
      taskItems[indexTaskItems] = item;
      setDeleteItems([...deleteItems, item]);
    } else {
      item.check = false;
      taskItems[indexTaskItems] = item;
      if (deleteItems.includes(item)) {
        //find index of item in deleteItems array
        const indexDeleteItems = deleteItems.findIndex(
          (object) => object.task === item.task
        );

        deleteItems.splice(indexDeleteItems, 1);
        setDeleteItems([...deleteItems]);
      }
    }
  };

  const completeTask = () => {
    Alert.alert(
      "Delete",
      `Are you sure want to delete ${deleteItems.length} ${
        deleteItems.length > 1 ? "tasks" : "task"
      } `,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setTaskItems(
              taskItems.filter((item) => !deleteItems.includes(item))
            );
            setDeleteItems([]);
          },
        },
      ]
    );
  };

  return (
    <View style={tailwind("flex flex-1 bg-bgColor")}>
      <View style={tailwind("pt-8 px-5")}>
        <View style={tailwind("flex flex-row justify-between mt-8")}>
          <Text style={tailwind("text-3xl font-bold")}>Today's tasks</Text>
          {deleteItems.length > 0 ? (
            <FontAwesome
              name="trash-o"
              size={30}
              color="red"
              onPress={completeTask}
            />
          ) : (
            <></>
          )}
        </View>
        <Text style={tailwind("text-gray")}>
          {taskItems.length} {taskItems.length > 1 ? "tasks" : "task"}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={true}
          style={tailwind("grow h-4/6 mt-24")}
        >
          <View>
            {taskItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleChecked(item, index)}
              >
                <Task text={item} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tailwind(
          "absolute top-32 w-full flex-row justify-around items-center"
        )}
      >
        <TextInput
          style={tailwind(
            "py-3.5 px-5 w-64 bg-white rounded-full border border-itemBorderColor"
          )}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View
            style={tailwind(
              "w-16 h-16 bg-white rounded-full justify-center items-center border border-addButtonColor"
            )}
          >
            <Text style={tailwind("text-2xl")}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MainScene;
