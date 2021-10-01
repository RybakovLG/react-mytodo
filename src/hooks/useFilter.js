import {useContext, useRef, useState} from "react";
import {ContextApp} from "../contextApp";

const useFilter = () => {
	const {rmCompletedTodos, rmActiveTodos, rmAllTodos} = useContext(ContextApp)

	const [visualFilter] = useState([
		{type: 'All', active: true},
		{type: 'Active', active: false},
		{type: 'Completed', active: false}
	])

	const [currFilterType, setCurrFilterType] = useState('');

	const toggleActive = (type) => {
		visualFilter.forEach(filter => {
			filter.active = (filter.type === type)
			if (filter.active)
				setCurrFilterType(type)
		})
	}
	const filterTodos = (currFilterType, todos) => {
		return (currFilterType === 'Active')
				? [...todos].filter(todo => todo.isComplete === false)
				: (currFilterType === 'Completed')
						? [...todos].filter(todo => todo.isComplete === true)
						: todos;
	};
	const [animate, setAnimate] = useState(false)

	const addAnimate = (ev) => {
		setAnimate(true)
		const type = ev.target.innerText.toLowerCase();
		const todos = document.getElementsByClassName(
				`todo-list__item ${type === 'all'
						? '' : type === 'active'
								? 'completed' : type === 'completed' ?
										'active' : ''
				}`)
		if (!todos.length) return
			for (let todo of todos) {
				todo.classList.add('animate')
			}
	}

	const rmAnimate = (ev) => {
		if (!animate) return;
			const type = ev.target.innerText.toLowerCase();
			const todos = document.getElementsByClassName(
					`todo-list__item ${type === 'all'
							? '' : type === 'active'
									? 'completed' : type === 'completed' ?
											'active' : ''
					}`)
			if (!todos.length) return;
				for (let todo of todos) {
					todo.classList.remove('animate')
				}
			setAnimate(false)
	}

	const timeoutId = useRef();

	const onMouseDown = (ev) => {
		timeoutId.current = setTimeout(() => {
			addAnimate(ev)
			const type = ev.target.innerText.toLowerCase();
			timeoutId.current = setTimeout(() => {
				if (type === 'active') rmCompletedTodos()
				if (type === 'completed') rmActiveTodos()
				if (type === 'all') rmAllTodos()
				setCurrFilterType('All')
			}, 2500)
		}, 500)
	};

	const onMouseUp = (ev) => {
		clearInterval(timeoutId.current)
		rmAnimate(ev)
	};

	const onMouseLeave = (ev) => {
		clearInterval(timeoutId.current)
		rmAnimate(ev)
	};

	return {
		rmTodos: {onMouseUp, onMouseDown, onMouseLeave},
		toggleActive, visualFilter, currFilterType, filterTodos
	}
};

export default useFilter;