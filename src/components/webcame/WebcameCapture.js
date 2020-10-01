import React from "react";
import Webcam from "react-webcam";


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
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={200}
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={props.handleSubmitCameraPhoto}>save came photo</button>
      {imgSrc && (
        <img
          src={imgSrc}

        />



      )}

    </>
  );



};

export default WebcameCapture;