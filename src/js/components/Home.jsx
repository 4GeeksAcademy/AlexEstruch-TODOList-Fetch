import React, { useState, useEffect } from "react";
//componentes
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";


//create your first component
const Home = () => {
	//tasks -> array de tareas, setTasks -> funcion que actualiza el array
	const [tasks, setTasks] = useState([]);

	// Función para obtener tareas desde la API del usuario ya creado
	const fetchTasks = () => {
		fetch("https://playground.4geeks.com/todo/users/alexestruch")
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log("Tareas cargadas:", data);
				console.log("Array de tareas:", data.todos);
				data.todos.forEach((tarea, index) => {
					console.log(`Tarea ${index + 1}:`, tarea);
				});
				setTasks(data.todos);
			})
			.catch((error) => console.log("Error cargando tareas:", error));

	};

	// useEffect que solo carga las tareas cuando abrimos la pagina o la actualizamos
	useEffect(() => {
		fetch("https://playground.4geeks.com/todo/users/alexestruch")
			.then((res) => {
				if (res.ok) {
					// Usuario ya existe, solo cargar tareas
					return fetchTasks();
				} else if (res.status === 404) {
					// Usuario no existe, crearlo
					return fetch("https://playground.4geeks.com/todo/users/alexestruch", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name: "alexestruch", todos: [] }),
					}).then((postRes) => {
						if (postRes.ok) {
							return fetchTasks();
						} else {
							console.log("Error creando usuario");
						}
					});
				} else {
					console.log("Error inesperado al comprobar usuario");
				}
			})
			.catch((error) => console.log("Error inicial:", error));
	}, []);

	//funcion para marcar hecha una tarea
	const toggleTaskDone = (id, isDone) => {
		const taskToUpdate = tasks.find(task => task.id === id);
		if (!taskToUpdate) return;

		const updatedTask = {
			id: taskToUpdate.id,
			label: taskToUpdate.label,
			is_done: isDone,
		};

		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTask),
		})
			.then((response) => {
				if (response.ok) {
					fetchTasks(); // Recargar las tareas
				} else {
					console.error("Error al actualizar tarea");
				}
			})
			.catch((error) => console.error("Error en PUT:", error));
	};
	//primero funcion de addTask; recibe taskText que si esta vacío o con espacio no hace nada, sino agrega a la lista

	//const addTask = (taskText) => {
	//if (taskText.trim() === "") return;
	//setTasks([...tasks, taskText]);
	//}

	//modifico la funcion addTask para que use el metodo POST y luego GET  para actualizar la lista
	const addTask = (taskText) => {
		if (taskText.trim() === "") return;
		//creo objeto con el texto introducido y false porque la tarea no está completada
		const newTask = {
			label: taskText,
			done: false
		};

		fetch("https://playground.4geeks.com/todo/todos/alexestruch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		})
			.then((response) => {
				if (response.ok) {
					// Una vez agregada, recargamos la lista
					return fetchTasks();
				} else {
					console.log("Error al agregar tarea.");
				}
			})
			.catch((error) => console.log("Error en el POST:", error));
	};

	//segundo funcion deleteTask
	const deleteTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
			.then(res => {
				if (res.ok) {
					// Eliminar la tarea del estado local también:
					const newTasks = tasks.filter(task => task.id !== id);
					setTasks(newTasks);
				} else {
					throw new Error("No se pudo eliminar la tarea");
				}
			})
			.catch(err => console.error("Error al eliminar tarea:", err));
	};

	// Eliminar todas las tareas iterando y borrando una a una
	const deleteAllTasks = () => {
		const deleteRequests = tasks.map(task =>
			fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
				method: "DELETE"
			})
		);

		Promise.all(deleteRequests)
			.then(responses => {
				const allSuccessful = responses.every(res => res.ok);
				if (allSuccessful) {
					fetchTasks(); // Refrescar tareas después de borrar
				} else {
					console.error("Error al eliminar alguna tarea");
				}
			})
			.catch(error => {
				console.error("Error al eliminar todas las tareas", error);
			});
	};

	return (
		<div className="container my-5">
			<div className="card shadow">
				<div className="card-body">
					<h2 className="text-center mb-4">Lista de Tareas</h2>

					<TodoInput onAddTask={addTask} />

					<TodoList tasks={tasks} onDeleteTask={deleteTask} onToggleDone={toggleTaskDone}/>

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