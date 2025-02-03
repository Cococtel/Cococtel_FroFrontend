import React from "react";
import Webcam from "react-webcam";
import { Camera, Check, X, Upload } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';

const videoConstraints: MediaTrackConstraints = {
  width: 720,
  height: 480,
  facingMode: "environment",
};

interface WebcamCaptureProps {
  liquor: Liquor | null;
  handleSendImage: (image: string) => Promise<void>;
  loading: {
    loading: boolean;
    text: string;
  };
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ handleSendImage, liquor, loading }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = React.useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Toma una foto o sube una imagen</h2>

      {cameraOpen || image ? (
        <div className="relative border-2 border-dashed border-orange-300 rounded-lg overflow-hidden w-full h-64 flex items-center justify-center">
          {image ? (
            liquor?.Name  ? (
              <div className="flex flex-col items-center justify-center text-orange-500">
                <Check size={48} className="mb-2" />
                <p className="text-lg font-bold">Listo! Estamos preparando tu coctel...</p>
              </div>
            ) : (
              loading.loading ? (
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
                  <LoaderCircle className="animate-spin text-orange-500" size={48} />
                  <p className="mt-4 text-gray-600">{loading.text}</p>
                </div>
                
              ) : (
                <img src={image} alt="Scanned" className="w-full h-full object-cover rounded-lg" />
              )
            )
          ) : (
            <Webcam
              audio={false}
              height={480}
              width={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg"
            />
          )}
        </div>
      ) : (
        <button
          onClick={() => setCameraOpen(true)}
          className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
        >
          <Camera size={48} className="mb-2" />
          <p className="text-lg font-bold">Open Camera</p>
        </button>
      )}

      {cameraOpen && !image && (
        <button
          onClick={handleCapture}
          className="w-full mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-orange-600 transition-colors"
        >
          <Camera size={20} /> Capture Photo
        </button>
      )}

      {image && !liquor?.Name  && (
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={() => setImage(null)}
            className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={() => image && handleSendImage(image)}
            className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition-colors"
          >
            <Check size={20} />
          </button>
        </div>
      )}

      {!liquor?.Name && (
        <div className="mt-4">
          <label className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-gray-200 transition-colors cursor-pointer">
            <Upload size={20} /> Upload Image
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;