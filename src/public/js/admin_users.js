const areaRender = document.getElementById("renderAdminUsers");

const URL = `http://localhost:8080/api/users`;

const renderData = async () => {
	try {
		const response = await fetch(URL);
		const { users } = await response.json();
		const htmlString = users
			.map(
				(user) =>
					`
                    <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button>EDIT</button></td>
         <td><button>DELETE</button></td>
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

 renderData();