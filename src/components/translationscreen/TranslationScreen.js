import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function TranslationScreen() {
	
	var navigate = useNavigate();
	useEffect(()=>{
		if(localStorage.getItem("isUserLoggedIn")==="false"){
			navigate("/login");
		}
	})

	const [dataTranslated, setDataTranslated] = useState([]);

	useEffect(() => {
		var dt = JSON.parse(localStorage.getItem("dataTranslated"));	
		console.log("translation screen: ", dt);
		setDataTranslated(dt);
	}, [])
	
	
	return (
	<div>
	  <h1>TranslationScreen</h1>
	  {dataTranslated}
	</div>
  )
}

export default TranslationScreen;