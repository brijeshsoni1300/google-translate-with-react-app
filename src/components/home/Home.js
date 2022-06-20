import React, { useEffect, useState } from "react";

import Modal from "../popup/Modal";
import { useNavigate } from "react-router";
import ReactPlayer from "react-player";


/**
 * Home component
 * @returns {JSX.Element}
 * it is the home page of the application
 * it displays the video 
 * it also handles the modal 
 */
function Home() {
  var navigate = useNavigate();

  /** A flag to show if we want to show modal or not */
  const [showModal, setShowModal] = useState(false);
	/**A field to take user input about god's quesiton */
  const [godField, setGodField] = useState("");
  /** input about the general info on dimension11 */
  const [dimension11Field, setDimension11Field] = useState("");
  /** this will contain array of string which are supposed to be translated */
  const [dataToTranslate, setDataToTranslate] = useState([]);
  /** A flag to check if api is already in progress or not */
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [numberOfTranslationClick, setnumberOfTranslationClick] = useState(0);

  // this use effect is used here to check if the user is logged in or not
  // if he is not logged in, he will be redirected to login page
  useEffect(() => {
    if (localStorage.getItem("isUserLoggedIn") === "false") {
      navigate("/login");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if api is already called and is in request then we will increament
    // the numberOfTranslationClick only else we will call the api
    if (isApiCalled) {
      setnumberOfTranslationClick(numberOfTranslationClick + 1);
    } else {
      //   setTimeout(() => {
      dataToTranslate.push(godField);
      dataToTranslate.push(dimension11Field);
      await translate(dataToTranslate);
      setDataToTranslate([]); // to empty the translation feed array  
      setnumberOfTranslationClick(0);  // to reset the numberOfTranslationClick
      setIsApiCalled(false); // to reset the api call flag
      navigate("/translation"); 
      //   }, 5000);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}> Open Modal </button>
      {showModal && numberOfTranslationClick}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <form
              onSubmit={(e) => {
                // this flag will be set to true as we are calling the api.
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
			  {/* when this cancle buttons is clicked it means we need to close the pop up  */}
			  {/* here i cant figure out the way to dissable this cancle button 
			  i.e what if it is clicked after translation button is clicked????? */}
              <button
                onClick={() => {
                  setnumberOfTranslationClick(0);
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

      {/* here is a normal react player which will play video whose link is given */}
      {/* <div style={{margin: "5rem"}}> 
        <ReactPlayer  url="https://www.youtube.com/watch?v=HhIl_XJ-OGA" />
      </div> */}
    </div>
  );

  //   this function will be used to call the api to translate the data
  //  this function will be called when the user clicks on the translate button for the first time
  async function translate(dataToTranslate) {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + process.env.REACT_APP_TRANSLATE_API_KEY
      );
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
      var translatedText = [];
	  // filtering the array to extract only translated text from it
      res.translations.forEach((ele) => {
        translatedText.push(ele.translatedText);
      });

      // once data is translated, we will store it in local storage
      localStorage.setItem("dataTranslated", JSON.stringify(translatedText));
    } catch (error) {
      console.log(error);
    }
  }
}

export default Home;
