import React from 'react';

import MyTodoItem from "./MyTodoItem";
import AddTodo from "./addTodo";
import useFilter from "../../hooks/useFilter";
import {AnimateSharedLayout, motion} from "framer-motion";

const MyTodoList = ({todos}) => {

	const {toggleActive, visualFilter, currFilterType, filterTodos, rmTodos} = useFilter()

	return (
			<AnimateSharedLayout>
				<motion.div layout className={'todo-list'}>

					<motion.h1 layout>My toDo</motion.h1>

					{todos.length
							? <motion.ul layout>
								{filterTodos(currFilterType, todos).map(todo =>
										<MyTodoItem
												todo={todo}
												key={todo.id}/>)}
							</motion.ul>
							: <h2>what next?..</h2>}

					<AddTodo/>

					<div className={'todo-list__footer'}>
						<ul className={'footer__btns'}>
							{visualFilter.map(({type, active}) =>
									<motion.li layout key={type}>
										<button
												className={`footer__btn ${active ? 'current' : ''} ${type.toLowerCase()}`}
												onClick={() => toggleActive(type)}
												{...rmTodos}
										>
											{type}
										</button>
									</motion.li>)}
						</ul>
					</div>
				</motion.div>
			</AnimateSharedLayout>
	);
};

export default MyTodoList;