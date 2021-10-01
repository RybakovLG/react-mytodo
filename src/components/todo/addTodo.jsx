import React, {useContext, useRef, useState} from 'react';
import {ContextApp} from "../../contextApp";
import {motion} from "framer-motion";

const AddTodo = () => {
	const [inputValue, setInputValue] = useState('')
	const {todos, setSortTodos} = useContext(ContextApp)
	const addInput = useRef()

	const submitAddTodo = ev => {
		ev.preventDefault()
		addInput.current.focus()

		if (!inputValue.trim()) return
		//ищет неповторяющийся индекс

		const rightId = n => {
			if (todos.findIndex(td => td.id === n) < 0) {
				return n
			} else {
				return rightId(++n)
			}
		};

		const newTodo =
				{id: rightId(todos.length + 1), isComplete: false, title: inputValue}

		setSortTodos([...todos, newTodo])
		setInputValue('')
	};

	return (
			<motion.form
					className={'todo-list__add'}
					layout
					onSubmit={submitAddTodo}>
				<label>
					<input
							maxLength={35}
							placeholder={'add...'}
							value={inputValue}
							onChange={ev => setInputValue(ev.target.value)}
							ref={addInput}
					/>
					<button>+</button>
				</label>
			</motion.form>);
};

export default AddTodo;