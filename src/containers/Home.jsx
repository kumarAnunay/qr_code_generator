import React, { useState } from "react";
import "../styles/Home.css";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [isQrGenerated, setIsQrGenerated] = useState(false);
  const [showDownloadAnimation, setShowDownloadAnimation] = useState(false);

  const fetchQRCode = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userInput}`
      );
      const qrImageBlob = await response.blob();
      const qrImageUrl = URL.createObjectURL(qrImageBlob);
      setQrImageUrl(qrImageUrl);
      setIsQrGenerated(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const userInputHandler = (event) => {
    setUserInput(event.target.value.trim());
    setIsQrGenerated(false);
  };

  const saveHandler = () => {
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "qr_code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowDownloadAnimation(true);
    setTimeout(() => {
      setShowDownloadAnimation(false);
    }, 1000);
  };

  const qrGeneratorHandler = () => {
    if (userInput != "") {
      fetchQRCode();
    }
  };

  return (
    <div className="container">
      <div className="qr-generator-container">
        <p>QR Code Generator</p>
        <div className="sub-container">
          <textarea
            type="text"
            name="input"
            value={userInput}
            onChange={(event) => userInputHandler(event)}
            placeholder="Paste your website link"
          ></textarea>

          <div className="qr-container">
            {isQrGenerated && <img src={qrImageUrl} alt="QR Code" />}
          </div>

          <div className="bttn-container">
            <div>
              {isQrGenerated && (
                <button className="save-img-bttn" onClick={saveHandler}>
                  <span
                    className={
                      showDownloadAnimation ? "downloading-animation" : ""
                    }
                  >
                    {showDownloadAnimation ? "Saved" : "Save"}
                  </span>
                </button>
              )}
            </div>

            <div>
              <button className="generate-bttn" onClick={qrGeneratorHandler}>
                Generate QR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
