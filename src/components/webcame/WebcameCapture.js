import React from "react";
import Webcam from "react-webcam";


function WebcameCapture (props)  {
 
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      //console.log(imageSrc)
      setImgSrc(imageSrc);
      
fetch(imageSrc)
  .then(res => res.blob())
  .then(blob => {
    const file = new File([blob], "File name",{ type: "image/png" })
    console.log(file)

  })
    }, [webcamRef, setImgSrc]);

    
    return (
      <>
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/png"
          width={200}
          //videoConstraints={videoConstraints}
        />
         <button onClick={capture}>Capture photo</button> 
         {imgSrc && (
        <img
          src={imgSrc}
          
        />

        

      )}
      
      </>
    );



  };
  
  export default WebcameCapture;