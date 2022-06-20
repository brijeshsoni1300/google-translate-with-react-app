import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Translation component
 * When the conserend array is translated to respective language, it will be displayed here
 * @returns {JSX.Element}
 */

function TranslationScreen() {
  var navigate = useNavigate();
  // this use effect is used here to check if the user is logged in or not
  // if he is not logged in, he will be redirected to login page
  const [dataTranslated, setDataTranslated] = useState();

  useEffect(() => {
    if (localStorage.getItem("isUserLoggedIn") === "false") {
      navigate("/login");
    }
  });

  useEffect(() => {
    var translatedDataFromLocalStorage = JSON.parse(
      localStorage.getItem("dataTranslated")
    );
    for (
      let translatedDataIterator = 0;
      translatedDataIterator < translatedDataFromLocalStorage.length();
      translatedDataIterator++
    ) {
      setDataTranslated([
        ...dataTranslated,
        translatedDataFromLocalStorage[translatedDataIterator],
      ]);
    }
	console.log("dataTranslated");
  }, [dataTranslated]);

  return (
    <div>
      <h1>TranslationScreen</h1>
      <p>{dataTranslated}</p>
    </div>
  );
}

export default TranslationScreen;
