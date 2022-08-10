import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { Entypo, AntDesign } from "@expo/vector-icons";
const Task = (props) => {
  // console.log("re-render");
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        "bg-white p-4 rounded-md flex-row items-center justify-between mb-5"
      )}
    >
      <View style={tailwind("flex-row items-center flex-wrap")}>
        {props.text.check === true ? (
          <AntDesign
            style={tailwind("mr-4")}
            name="checkcircle"
            size={24}
            color="orange"
          />
        ) : (
          <Entypo
            style={tailwind("mr-4")}
            name="circle"
            size={24}
            color="black"
          />
        )}
        <Text style={tailwind("max-w-4/5")}>{props.text.task}</Text>
      </View>
    </View>
  );
};

export default Task;
