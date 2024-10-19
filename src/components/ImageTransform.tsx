interface ImageTransformProps {
  originalUrl: string | null;
  transformedUrl: string | null;
}

const ImageTransform: React.FC<ImageTransformProps> = ({
  originalUrl,
  transformedUrl,
}) => {
  return (
    <div className="flex gap-x-10">
      {originalUrl && (
        <div>
          <h3>Imagen Original</h3>
          <img src={originalUrl} alt="Original" style={{ width: "300px" }} />
        </div>
      )}
      {transformedUrl && (
        <div>
          <h3>Imagen Transformada</h3>
          <img
            src={transformedUrl}
            alt="Transformada"
            style={{ width: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageTransform;
