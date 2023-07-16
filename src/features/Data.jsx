import { useGetAllProductsQuery } from "./api/productsApiSlice";

const Data = () => {
	const {
		data: response,
		isLoading,
		isError,
		error,
	} = useGetAllProductsQuery();
	// const { data: singlePRoductData } = useGetProductsQuery("iphone");

	// console.log(allProductsData);
	// console.log(singlePRoductData);

	if (isLoading) return <h1>Loading....</h1>;

	if (isError) return <p>Error: {error.message}</p>;

	if (!response || !response.products || response.products.length === 0)
		return <p>No data available.</p>;

	const { products } = response;

	console.log(products);

	if (isLoading) return <h1>Loading....</h1>;

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>Products</h1>
						<ul>
							{products.map((product) => (
								<li key={product.id}>{product.title}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Data;
