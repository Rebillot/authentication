const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			id:[],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


			getid: () => {
				const store = getStore();
				return store.id
			},

			login: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ authToken: data.authToken });
					}
				} catch (error) {
					console.error(error)
				}
				return false;
			},
			signup: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (response.ok) {
						const data = await response.json();
						return true; 
					} else {
						console.error("Signup failed");
					}
				} catch (error) {
					console.error(error);
				}
				return false;
			},


			
			login3: async (email, pass) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email,
						"password": pass
					})
				}
				try {
					const resp = await fetch('https://rebillot-scaling-goldfish-7q65pr4jq973x77v-3001.preview.app.github.dev/login', options)
					if (resp.status != 200) {
						setStore({ loginResp: true })
						return false
					}

					const data = await resp.json()
					sessionStorage.setItem("auth_token", data.auth_token)
					sessionStorage.setItem("id", data.id)
					sessionStorage.setItem("isLoggedIn", "true")

					return true

				}
				catch (error) {
					console.error("error en login")
				}
			},













			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
