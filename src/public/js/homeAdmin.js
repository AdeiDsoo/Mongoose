const renderAllUsers = document.getElementById("renderAllUsers");
const renderUserTwoDays = document.getElementById("renderTwoDaysUsers");

const URL = `http://localhost:8080/api/users`;
const URLtwoDays = `http://localhost:8080/api/users/usersTwoDays`;

const fetchData = async () => {
	try {
		const response = await fetch(URL);
		const { users } = await response.json();
		const htmlString = users
			.map(
				(user) =>
					`
        <li>${user.name}</li>
       `
			)
			.join("");
		if (renderAllUsers) {
			renderAllUsers.innerHTML += htmlString;
		}
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
};
const twoDaysData = async () => {
	try {
		const response = await fetch(URLtwoDays);
		const { users } = await response.json();

		const htmlString = users
			.map(
				(user) =>
					`
        <li>${
					user.last_name
						? `${user.first_name} ${user.last_name}`
						: user.first_name
				}</li>
     
       `
			)
			.join("");
		if (renderUserTwoDays) {
			renderUserTwoDays.innerHTML += htmlString;
		}
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
};
fetchData();
twoDaysData();
