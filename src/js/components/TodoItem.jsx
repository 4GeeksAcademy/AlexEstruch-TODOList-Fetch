import React, { useState } from "react";

//el componente recibe 3 props, index=posicion en el array, taskText=tarea, onDeleteTask=funcion para eliminar la tarea
const TodoItem = ({ index, taskText, onDeleteTask }) => {
    //hover para indicar si el raton está sobre el item, setHover para actualizar y pongo false porque el raton no empieza encima
    const [hover, setHover] = useState(false);

  return (
    //<li> list item para implementar el hover y el eliminar la tarea
    //evento onMouseEnter cuando el raton esta encima el hover es true y aparece la papelera que después implemento
    //evento onMouseLeave cuando quitamos el raton hover es false y no muestro la papelera
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
    
      <span>{taskText}</span>
      {hover && (
        <button
          onClick={() => onDeleteTask(index)}
          className="btn btn-sm"
        >
          🗑️
        </button>
      )}
    </li>
  );
};

export default TodoItem;