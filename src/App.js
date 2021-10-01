import React, {useEffect, useState} from "react";

import MyTodoList from "./components/todo/MyTodoList";
import {ContextApp} from "./contextApp";

function App() {
	const [todos, setTodos] = useState(localStorage.myToDo
					? JSON.parse(localStorage.myToDo)
					: [{id: 1, isComplete: false, title: 'edit ✍ ur todo with doubleClick / hold'},
						{id: 2, isComplete: false, title: 'complete and delete ur stuff 👉'},
						{id: 3, isComplete: false, title: 'enjoy 😉'},
						{id: 4, isComplete: false, title: 'hold down filter buttons to delete 😎'},
						{id: 5, isComplete: true, title: 'use smart filter buttons 👇'},
					]);

	const setSortTodos = (arr) => {
		setTodos(arr.sort((a, b) => a.isComplete - b.isComplete))
	}

	useEffect(() => {
		localStorage.setItem('myToDo', JSON.stringify(todos))
	}, [todos])

	const swComplete = (id) => {
		setSortTodos(todos.map(todo => {
			if (todo.id === id) todo.isComplete = !todo.isComplete
			return todo;
		}))
	}

	const rmItemTodo = (id) => {
		setSortTodos(todos.filter(todo => todo.id !== id))
	}

	const rmCompletedTodos = () => {
		setTodos(todos.filter(todo => todo.isComplete === false))
	};

	const rmActiveTodos = () => {
		setTodos(todos.filter(todo => todo.isComplete === true))
	};

	const rmAllTodos = () => setTodos([])

	const provValue = {
		swComplete,
		rmItemTodo,
		setSortTodos,
		rmCompletedTodos,
		rmActiveTodos,
		rmAllTodos,
		setTodos,
		todos,
	}

	return (
			<ContextApp.Provider value={provValue}>

				<div className="App">
					<MyTodoList todos={todos}/>
				</div>

			</ContextApp.Provider>
	);
}

export default App;
