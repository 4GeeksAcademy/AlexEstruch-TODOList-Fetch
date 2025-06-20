import React, {useState} from "react";


//declaro el componente TodoInput con prop la funcion onaddTask del Home.jsx
const TodoInput = ({onAddTask}) => {
    //almacena inputValor con funcion de actualizacion setInputValor, inicializo "" vacio
    const [inputValor, setInputValor] = useState("");

    //funcion para añadir la tarea escrita después de presionar Enter
    const handleKeyDown = (tecla) => {
        if (tecla.key === "Enter") {
            onAddTask(inputValor);
            setInputValor("");
        }
    };

    return (
        <input type="text" className="form-control" placeholder="Añadir nueva tarea" value={inputValor} 
        onChange={(tecla) => setInputValor(tecla.target.value)} onKeyDown={handleKeyDown} />
    );
};

export default TodoInput;