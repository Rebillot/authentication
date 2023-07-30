import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome!!</h1>
			<p>
				<img src= "https://i.kym-cdn.com/entries/icons/original/000/021/290/bounsa.png" />
			</p>
		</div>
	);
};
