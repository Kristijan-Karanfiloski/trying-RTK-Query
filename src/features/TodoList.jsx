import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./TodoList.module.css";

////////////////////////////////
import {
	useGetTodosQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodoMutation,
} from "./api/apiSlice";

const TodoList = () => {
	const [newTodo, setNewTodo] = useState("");

	const {
		data: todos,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTodosQuery();

	const [addTodo] = useAddTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = (e) => {
		e.preventDefault();

		//addTodo
		addTodo({ userId: 1, title: newTodo, completed: false });
		setNewTodo("");
	};

	const newItemSection = (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="new-todo">Enter a new todo item</label>
				<div className=" new-todo">
					<input
						type="text"
						id="new-todo"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						placeholder="Enter a new todo item"
					/>
					<button className="submit">
						<FontAwesomeIcon icon={faUpload} />
					</button>
				</div>
			</form>
			<hr />
		</>
	);
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	let content;
	//Define conditional content
	if (isLoading) {
		content = <p>Loading...</p>; //we can add a spinner here
	} else if (isSuccess) {
		content = todos.map((todo) => {
			return (
				<div className={`row  ${styles.todo}`} key={todo.id}>
					<div className="col-1">
						<input
							type="checkbox"
							checked={todo.completed ? true : false}
							id={todo.id}
							onChange={() =>
								updateTodo({ ...todo, completed: !todo.completed })
							}
						/>
					</div>
					<div className={`col-10 ${styles.todoTitle}`}>
						<label htmlFor={todo.id}>{todo.title}</label>
					</div>
					<div className="col-1">
						<button
							className={`btn btn-outline-danger ${styles.trash}`}
							onClick={() => deleteTodo({ id: todo.id })}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				</div>
			);
		});
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return (
		<div className={`container ${styles.container}`}>
			<h1>Todo List</h1>
			<div className={styles.newItemSection}>{newItemSection}</div>
			<div className={styles.todoList}>{content}</div>
		</div>
	);
};

export default TodoList;
