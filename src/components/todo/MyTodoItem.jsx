import React, {useContext} from 'react';
import {ContextApp} from "../../contextApp";
import {useItemTodoInput} from "../../hooks/useItemTodoInput";
import {AnimatePresence, motion} from "framer-motion";

const MyTodoItem = ({ todo }) => {
	const { swComplete, rmItemTodo } = useContext(ContextApp)
	const { id, isComplete } = todo
	const input = useItemTodoInput(todo)

	return (
			<AnimatePresence>
				<motion.li
						layout
						initial={{ x: -300, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 300, opacity: 0 }}
						key={id}
						className={`todo-list__item ${isComplete ? 'completed' : 'active'}`}>
					<span>{id}. </span>
					<input
							maxLength={35}
							className='todo-text'
							disabled={isComplete}
							{...input}
					/>
					<motion.button
							layout
							onClick={() => isComplete ? rmItemTodo(id) : swComplete(id)}
							className={`simple-btn ${isComplete ? 'delete' : 'easy'}`}
					>
						{isComplete ? 'delete' : 'easy'}
					</motion.button>
				</motion.li>
			</AnimatePresence>
	);
};

export default MyTodoItem;