interface ImageData {
  url: string;
  publicId: string;
}

interface ImageExampleGalleryProps {
  setImageUrl: (url: string) => void;
  setCurrentPublicId: (publicId: string) => void;
}

const images: ImageData[] = [
  {
    url: "https://res.cloudinary.com/meju/image/upload/v1729496628/fa7dds8gna7dfwhqebil.jpg",
    publicId: "fa7dds8gna7dfwhqebil",
  },
  {
    url: "https://res.cloudinary.com/meju/image/upload/v1729499693/apymzk2mpgjdhjayjhpj.jpg",
    publicId: "apymzk2mpgjdhjayjhpj",
  },
];

const ImageExampleGallery: React.FC<ImageExampleGalleryProps> = ({
  setImageUrl,
  setCurrentPublicId,
}) => {
  const handleClick = (url: string, publicId: string) => {
    setImageUrl(url);
    setCurrentPublicId(publicId);
  };

  return (
    <section className="flex gap-4">
      {images.map((image) => (
        <div
          key={image.publicId}
          className="h-28 cursor-pointer"
          onClick={() => handleClick(image.url, image.publicId)}
        >
          <img
            src={image.url}
            className="w-full h-full object-cover"
            alt={`Imagen de prueba ${image.publicId}`}
          />
        </div>
      ))}
    </section>
  );
};

export default ImageExampleGallery;
