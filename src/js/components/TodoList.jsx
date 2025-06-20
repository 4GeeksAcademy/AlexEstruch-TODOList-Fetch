import React from "react";
//importo el TodoItem para usarlo para representar individualmente cada tarea
import TodoItem from "./TodoItem";

//recibe array de tareas -> tasks, y la funcion que elimina una tarea segun el indice
const TodoList = ({ tasks, onDeleteTask }) => {
  //verifico que el array no esté vacío, si lo estar retorna null, porque ya tengo el mensaje en el Home de tareas pendientes
    if (tasks.length === 0) {
    return null; 
  };

  //mostramos la lista con <ul> y añado estilos de bootstrap
  //.map para renderizar la lista que depende de la task y su propio indice para generar TodoItem
  //en TodoItem añadimos cada campo del Item
  return (
    <ul className="list-group mt-3">
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          index={index}
          taskText={task}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;