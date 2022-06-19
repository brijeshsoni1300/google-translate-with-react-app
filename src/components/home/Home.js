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
  // start with mock apis for translation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isApiCalled) {
      setCounter(counter + 1);
    } else {
      console.log(godField, dimension11Field);

      setTimeout(() => {
        dataToTranslate.push(godField);
        dataToTranslate.push(dimension11Field);
        //	var temp = await translate(dataToTranslate);
        setDataToTranslate([]);
        setDataTranslated([]);
        //	setDataTranslated(temp);
        console.log("dataTranslated: ", dataTranslated);
        localStorage.setItem("dataTranslated", JSON.stringify(dataTranslated));
        navigate("/translation");
        setCounter(0);
        setIsApiCalled(false);
      }, 5000);
    }
  };

  const CloseModal = () => {
    // RERENDERING STUFF SHOULD BE FIXED HERE
    return (
      <div>
        <form
          onSubmit={(e) => {
            setIsApiCalled(true);

            handleSubmit(e);
          }}
        >
          Discussing about GOD in interview was my worst mistake(In interview
          Context). Do you agree
          <input
            value={godField}
            onChange={(e) => {
              setGodField(e.target.value);
            }}
            type="text"
            name="godfield"
          />{" "}
          <br />
          Write something about Dimension 11{" "}
          <input
            value={dimension11Field}
            onChange={(e) => {
              setDimension11Field(e.target.value);
            }}
            type="text"
            name="dimension11field"
          />{" "}
          <br />
          <button onClick={() => {
			setCounter(0);
			setShowModal(false)}}> Cancle </button>
          <input type="submit" value="Translate"></input>
        </form>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}> Open Modal </button>
      {showModal && counter}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CloseModal key="form1" />
          {/* <Element /> */}
        </Modal>
      )}
	  <div style={{"height" : "30px", "width" : "30px"}} >
          <ReactPlayer  url="https://www.youtube.com/watch?v=ug50zmP9I7s" />
    </div>
    </div>
  );
}

export default Home;

async function translate(dataToTranslate) {
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer ya29.c.b0AXv0zTOUWABIRa4mpXtQx2oRlkfz_ofyJHFSFmGbjzS5zrq9b6T3IPg0FzzTigtwdVg3KNn7ijDuHGqajblA2CkU8qZ0hiokRqf_oTJF4AbYg65YjIPIpDgKzGn0xkfei3JAWNUbLUMgEiA9aSoG4YM5Q1957yu5BBFGg6_VqgLYHWiSn8yBVTlEZANcVmA1nWU38mhRCJXC0tWGpi0IG65d3QLVeN0n6YP4cGHP"
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
    //   redirect: "follow",
    };

    var response = await fetch(
      "https://translation.googleapis.com/v3/projects/altus-group-maps/locations/us-central1:translateText",
      requestOptions
    );
    var res = await response.json();
    console.log("res: ", res);
    return res["translations"];
  } catch (error) {
    console.log("error");
    console.log(error);
    return [];
  }
}
