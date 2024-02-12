const areaRender = document.getElementById("renderAdminUsers");

const URL = `http://localhost:8080/api/users/allUsers`;
const URLdeleteUser = `http://localhost:8080/api/users/delete/`;

// router.delete("/delete/:email", deleteUserEmail);

const renderData = async () => {
	try {
		const response = await fetch(URL);
		const { users } = await response.json();
		const htmlString = users
			.map(
				(user) =>
					`
                   <tr>
                        <td>${user.first_name}</td>
                        <td>${user.email}</td>
                        <td>
                            <select name="role" class="role-select" data-original-role="${
															user.role
														}">
                                <option value="${user.role}">${
						user.role
					}</option>
                                ${generateRoleOptions(user.role)}
                            </select>
                        </td>
                        <td>
                            <button class="btnEdit" data-user-id="${
															user._id
														}">SAVE</button>
                        </td>
                        <td><button class="btnDelete" data-user-email=${
													user.email
												} >DELETE</button></td>
                    </tr>
       `
			)
			.join("");
		if (areaRender) {
			areaRender.innerHTML += htmlString;
		}
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
};

const generateRoleOptions = (currentRole) => {
	const allRoles = ["Admin", "user", "userPremium"];
	const filteredRoles = allRoles.filter((role) => role !== currentRole);

	return filteredRoles
		.map((role) => `<option value="${role}">${role}</option>`)
		.join("");
};


renderData();

areaRender.addEventListener("click", async (e) => {
	const target = e.target;

	if (target.classList.contains("btnEdit")) {
		handleEditButtonClick(target);
	}

	if (target.classList.contains("btnDelete")) {
		await handleDeleteButtonClick(target);
	}
});

const handleEditButtonClick = async (button) => {
	// e.preventDefault();
	const idUser = button.dataset.userId;
	
	const selectElement = button.closest("tr").querySelector(".role-select");

	const selectedRole = selectElement.value;
  console.log(idUser, selectedRole);
// router.post("/updateUsers/:idUser", updateUsers);
  try {
		const response = await fetch(
			`http://localhost:8080/api/users/updateUsers/${idUser}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json", 
				},
				body: JSON.stringify({ role: selectedRole }),
			}
		);

	} catch (error) {
		console.error("Error:", error.message);
	}
};

const handleDeleteButtonClick = async (button) => {
	e.preventDefault();
	const userEmail = button.dataset.userEmail;

	try {
		const response = await fetch(
			`http://localhost:8080/api/users/delete/${userEmail}`,
			{
				method: "DELETE",
			}
		);

		console.log(`Usuario con email ${userEmail} eliminado correctamente.`);
	} catch (error) {
		console.error("Error:", error.message);
	}
};
