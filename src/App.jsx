import "./App.css";
import Data from "./features/Data";
import TodoList from "./features/TodoList";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApiSlice } from "./features/api/productsApiSlice";
import { apiSlice } from "./features/api/apiSlice";

function App() {
	return (
		<>
			<ApiProvider api={apiSlice}>
				<TodoList />
			</ApiProvider>
			<hr />
			<ApiProvider api={productsApiSlice}>
				<Data />
			</ApiProvider>
		</>
	);
}

export default App;
