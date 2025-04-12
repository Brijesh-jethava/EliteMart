import ProductImageUpload from '@/components/admin-view/image-upload';
import { Button } from '@/components/ui/button';
import { addFeatureImages, getFeatureImages } from '@/store/common-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImagesList } = useSelector(state => state.commonFeature);



  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImages(uploadedImageUrl)).then(data => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl('');
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

 
  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button
        className='mt-5 w-full text-white bg-black'
        onClick={handleUploadFeatureImage}
      >
        Upload
      </Button>

      <div className='flex flex-col gap-5 mt-5'>
{featureImagesList && featureImagesList.length > 0 ? (
  featureImagesList.map((featureImgItem, index) => {
    
    return featureImgItem?.image ? (
      <div key={index} className='relative'>
       
        <img
          src={featureImgItem.image}
         
          className='w-full h-[300px] object-cover rounded-t-lg'
          onError={() => console.log("Image failed to load:", featureImgItem.image)}
        />
      </div>
    ) : (
      <p key={index}>No image found at index {index}</p>
    );
  })
) : (
  <p>No images found</p>
)}

</div>

    </div>
  );
};

export default AdminDashboard;
