// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
//   margin: 20px;
// `;

// const ImageBox = styled.div`
//   width: 200px;
//   height: 250px;
//   background-image: url(${(props) => props.src});
//   background-size: cover;
//   background-position: center;
//   border: 3px dashed #ccc;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   color: #ccc;
//   cursor: pointer;
// `;

// const PlusSign = styled.div`
//   margin: 10px 0;
//   font-size: 24px;
// `;

// const ImageUploader = () => {
//   const [images, setImages] = useState(Array(6).fill(null));

//   const handleImageChange = (index) => (event) => {
//     if (event.target.files && event.target.files[0]) {
//       const fileReader = new FileReader();
//       fileReader.onload = (e) => {
//         const newImages = [...images];
//         newImages[index] = e.target.result;
//         setImages(newImages);
//       };
//       fileReader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   return (
//     <Container>
//       {images.map((src, index) => (
//         <>
//           {index > 0 && <PlusSign>+</PlusSign>}
//           <ImageBox
//             src={src}
//             onClick={() =>
//               document.getElementById(`file-input-${index}`).click()
//             }
//           >
//             {!src && <span>+</span>}
//             <input
//               type="file"
//               id={`file-input-${index}`}
//               style={{ display: 'none' }}
//               accept="image/*"
//               onChange={handleImageChange(index)}
//             />
//           </ImageBox>
//         </>
//       ))}
//     </Container>
//   );
// };

// export default ImageUploader;
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; // Adds space between boxes both horizontally and vertically
  margin: 20px;
  width: 50vw;
`;

const ImageBox = styled.div`
  width: 200px;
  height: 250px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border: 3px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
`;

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (index) => (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Container>
      {images.map((src, index) => (
        <ImageBox
          key={index} // Always include keys when rendering lists of React components for performance optimization
          src={src}
          onClick={() => document.getElementById(`file-input-${index}`).click()}
        >
          {!src && <span>+</span>}
          <input
            type="file"
            id={`file-input-${index}`}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange(index)}
          />
        </ImageBox>
      ))}
    </Container>
  );
};

export default ImageUploader;
