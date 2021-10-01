import {useEffect, useRef, useState} from "react";

export const useItemTodoInput = (todo) => {
	const [value, setValue] = useState('')
	const [readOnly, setReadOnly] = useState(true)
	const [td, setTodo] = useState(todo)
	let {title} = td

	useEffect(() => {
		setValue(title)
	}, [title])

	const addToDo = () => {
		title = value
		setTodo(td)
		setReadOnly(true)
	};

	const onChange = ev => setValue(ev.target.value);

	const onDoubleClick = ev => {
		setReadOnly(false)
		ev.target.selectionStart =
				ev.target.selectionEnd = ev.target.value.length;
	};

	const onBlur = addToDo

	const onKeyDown = ev => {
		if (ev.key !== 'Enter') return
			addToDo();
			ev.target.blur()
			setReadOnly(true)
	};

	//при удержании мыши - снимает ридонли
	const timeoutId = useRef()

	const onMouseDown = ev => {
		timeoutId.current = setTimeout(() => {
			setReadOnly(false)
		}, 1000)
	};

	const onMouseUp = () => {
		clearTimeout(timeoutId.current);
	};

	return {
		value, readOnly, onChange, onDoubleClick,
		onBlur, onKeyDown, onMouseDown, onMouseUp
	}
};