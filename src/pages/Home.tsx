import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)){
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    }
    setTasks(tasks => [...tasks, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks => tasks.map(task => ({
      ...task,
      done: task.id === id ? !task.done : task.done
    })));
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={(id: number) => Alert.alert(
            "Remover item",
            "Tem certeza que você deseja remover esse item?",
            [{
              text: 'Não',
              onPress: () => console.log(`cancel: remover a taks:${id}`),
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () => handleRemoveTask(id)
            }])}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})