const btnDelete = document.getElementById("btnDeleteProduct");
const inputID = document.getElementById("idProduct");

btnDelete.addEventListener("click", async (e) => {
	e.preventDefault();
	const idProduct=inputID.value
	try {
		const response = await fetch(
			`http://localhost:8080/api/products/${idProduct}`,
			{
				method: "DELETE",
			}
		);
		console.log("producto eliminado");
	} catch (error) {
		console.log(error);
	}
});
