import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function TranslationScreen() {
	
	var navigate = useNavigate();
	useEffect(()=>{
		if(localStorage.getItem("isUserLoggedIn")==="false"){
			navigate("/login");
		}
	})

	const [dataTranslated, setDataTranslated] = useState();

	useEffect(  ()  => {
		var dt = (localStorage.getItem("dataTranslated"));
		setDataTranslated(dt);
	}, [])
	
	//TODO: we need to convert this string to json object and then display it
	return (
	<div>
	  <h1>TranslationScreen</h1>
	  <p>{
		dataTranslated
	  }</p>
	</div>
  )
}

export default TranslationScreen;