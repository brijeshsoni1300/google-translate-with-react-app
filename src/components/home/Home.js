import React, { useEffect, useState } from "react";
import Modal from "../popup/Modal";
import { useNavigate } from "react-router";
import ReactPlayer from "react-player";
function Home() {
  var navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [godField, setGodField] = useState("");
  const [dimension11Field, setDimension11Field] = useState("");
  const [dataToTranslate, setDataToTranslate] = useState([]);
  const [dataTranslated, setDataTranslated] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("isUserLoggedIn") === "false") {
      navigate("/login");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isApiCalled) {
      setCounter(counter + 1);
    } else {
      console.log(godField, dimension11Field);

    //   setTimeout(() => {
        dataToTranslate.push(godField);
        dataToTranslate.push(dimension11Field);
        await translate(dataToTranslate);
        navigate("/translation");
		setDataToTranslate([]);
        setDataTranslated([]);
        setCounter(0);
        setIsApiCalled(false);
    //   }, 5000);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}> Open Modal </button>
      {showModal && counter}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <form
              onSubmit={(e) => {
                setIsApiCalled(true);
                handleSubmit(e);
              }}
            >
              Discussing about GOD in interview was a mistake(In interview
              Context). Do you agree
              <input
                value={godField}
                onChange={(e) => {
                  setGodField(e.target.value);
                }}
                type="text"
                name="godfield"
              />
              <br />
              	Write something about Dimension 11
              <input
                value={dimension11Field}
                onChange={(e) => {
                  setDimension11Field(e.target.value);
                }}
                type="text"
                name="dimension11field"
              />
              <br />
              <button
                onClick={() => {
                  setCounter(0);
                  setShowModal(false);
                }}
              >
                Cancle
              </button>
              <input type="submit" value="Translate"></input>
            </form>
          </div>
        </Modal>
      )}
      <div >
        <ReactPlayer url="https://www.youtube.com/watch?v=ug50zmP9I7s" />
      </div>
	  
    </div>
  );


  async function translate(dataToTranslate) {
	try {
	  var myHeaders = new Headers();
	  myHeaders.append("Authorization", "Bearer "+ process.env.REACT_APP_TRANSLATE_API_KEY);
	  myHeaders.append("Content-Type", "application/json");
  
	  var raw = JSON.stringify({
		model:
		  "projects/altus-group-maps/locations/us-central1/models/general/nmt",
		sourceLanguageCode: "en",
		targetLanguageCode: "fr",
		contents: dataToTranslate,
	  });
  
	  var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	  };
  
	  var response = await fetch(
		"https://translation.googleapis.com/v3/projects/altus-group-maps/locations/us-central1:translateText",
		requestOptions
	  );
	  var res = await response.json();
	  console.log("res: ", res.translations);
	  setDataTranslated(res.translations);
		var translatedText = []; 
		res.translations.forEach(ele => {
			translatedText.push(ele.translatedText)
		});
	  localStorage.setItem("dataTranslated", JSON.stringify(translatedText));
	  return res["translations"];
	} catch (error) {
	  console.log("error");
	  console.log(error);
	  return [];
	}
  }
}

export default Home;


