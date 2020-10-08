import React from "react";
import Webcam from "react-webcam";
import "../../index.css";
import { Button } from 'semantic-ui-react';


function WebcameCapture(props) {


  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    //console.log(imageSrc)
    setImgSrc(imageSrc);
    props.handlechangecamera(imageSrc)



  }, [webcamRef, setImgSrc]);


  return (
    <>
      <div className="webcam">
        
        <div>
       
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/png"
            width={200}
          />
<br />

        </div>

        <div>
        <Button color="red" onClick={capture}>Capture photo</Button>
        
        <Button color="blue" onClick={props.handleSubmitCameraPhoto}>Save camera photo</Button>
        </div>

        <div>
        {imgSrc && (
          <img
            src={imgSrc}

          />



        )}
        </div>
      </div>
    </>
  );



};

export default WebcameCapture;

// PM: Needs lots of formatting, need to stop camera after picture is taken