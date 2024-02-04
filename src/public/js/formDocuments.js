document
	.getElementById("documentsForm")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData(event.target);
			formData.append("category", "documents"); 

			const response = await fetch(event.target.action, {
				method: "POST",
				body: formData,
			});
		} catch (error) {
			console.error("Error:", error.message);
		}
	});
