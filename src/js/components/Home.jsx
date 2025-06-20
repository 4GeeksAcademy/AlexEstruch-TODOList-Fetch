import React, { useState } from "react";
//componentes
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";


//create your first component
const Home = () => {
	//tasks -> array de tareas, setTasks -> funcion que actualiza el array
	const [tasks, setTasks] = useState([]);

	//primero funcion de addTask; recibe taskText que si esta vacío o con espacio no hace nada, sino agrega a la lista
	const addTask = (taskText) => {
		if (taskText.trim() === "") return;
		setTasks([...tasks, taskText]);
	}

	//segundo funcion deleteTask
	const deleteTask = (index) => {
		const newTasks = tasks.filter((_, i) => i !== index);
		setTasks(newTasks);
	}

	//añado una funcion para poder eliminar todas las tareas solo clicando un boton, si no hay tareas el boton se ve apagado
	const deleteAllTasks = () => {
		setTasks([]);
	}


	return (
		<div className="container my-5">
			<div className="card shadow">
				<div className="card-body">
					<h2 className="text-center mb-4">Lista de Tareas</h2>

					<TodoInput onAddTask={addTask} />

					<TodoList tasks={tasks} onDeleteTask={deleteTask} />

					<p className="text-muted mt-3 text-end">
						{tasks.length > 0 ? `${tasks.length} tareas pendientes` : "No hay tareas, para añadir escribe tu tarea y pulsa enter"}
					</p>

					<div className="text-end mt-3">
						<button type="button" className={`btn ${tasks.length === 0 ? "btn-secondary" : "btn-danger"}`}
							disabled={tasks.length === 0}
							onClick={deleteAllTasks}
						>
							Eliminar todas las tareas
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;