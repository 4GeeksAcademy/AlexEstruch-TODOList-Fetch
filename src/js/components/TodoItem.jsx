import React, { useState } from "react";

//el componente recibe 3 props, index=posicion en el array, taskText=tarea, onDeleteTask=funcion para eliminar la tarea
const TodoItem = ({ task, onDeleteTask, onToggleDone }) => {
  //hover para indicar si el raton está sobre el item, setHover para actualizar y pongo false porque el raton no empieza encima
  const [hover, setHover] = useState(false);

  return (
    //<li> list item para implementar el hover y el eliminar la tarea
    //evento onMouseEnter cuando el raton esta encima el hover es true y aparece la papelera que después implemento
    //evento onMouseLeave cuando quitamos el raton hover es false y no muestro la papelera
    <li
      className="list-group-item d-flex align-items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Checkbox y texto juntos */}
      <div className="d-flex align-items-center flex-grow-1">
        <input
          type="checkbox"
          checked={task.is_done}
          onChange={() => onToggleDone(task.id, !task.is_done)}
          style={{ marginRight: "10px" }}
        />
        <span style={{ textDecoration: task.is_done ? "line-through" : "none" }}>
          {task.label}
        </span>
      </div>

      {/* Botón eliminar a la derecha */}
      {hover && (
        <button onClick={() => onDeleteTask(task.id)} className="btn btn-sm">
          🗑️
        </button>
      )}
    </li>
  );
};

export default TodoItem;