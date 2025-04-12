import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const initialFormData = {
  image : null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:"",
  salePrice:'',
  totalStock:''
}

const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData,setFormData] = useState(initialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl,setUploadedImageUrl] = useState('');
  const [imageLoadingState,setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const {productList} = useSelector(state => state.adminProducts)
  const {toast} = useToast();``
  const dispatch = useDispatch()

  function onSubmit()
 {
   event.preventDefault();

   currentEditedId !== null 
   ?
   dispatch(editProduct({
    id : currentEditedId,
    formData
   })).then((data) =>{
  

    if(data?.payload?.success)
      dispatch(fetchAllProducts());
      setFormData(initialFormData);
      setOpenCreateProductsDialog(false)
      setCurrentEditedId(null)
   })
   
   : 
   dispatch(addNewProduct({
    ...formData,
    image:uploadedImageUrl,
   })
  ).then((data)=>{
   
    if(data?.payload?.success){
      dispatch(fetchAllProducts())
      setOpenCreateProductsDialog(false)
      setImageFile(null);
      setFormData(initialFormData)
      toast({
        title:'Product added successfuly...'
      })
    }
  })
 }

function handleDelete(getCurrentProductId)
{
 
  dispatch(deleteProduct(getCurrentProductId)).then(data => {
    if(data?.payload?.success)
    {
      dispatch(fetchAllProducts());
    }
  })
} 

function isFormValid(){
  return Object.keys(formData)
    .map(key=> formData[key] !== '')
    .every((item)=>item);
} 

 useEffect(()=>{
  dispatch(fetchAllProducts())
 },[dispatch])



  return <Fragment>
      <div className='mb-5 h-10 rounded-lg flex justify-end w-full text-black'>
          <Button onClick={()=>setOpenCreateProductsDialog(true)} className='bg-black text-white'>Add New Product</Button>
      </div>
      
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'> 
        {
          productList && productList.length > 0 
          ?
          productList.map((productItem) => (
              <AdminProductTile 
              key={productItem._id}
              setFormData={setFormData} 
              setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
              setCurrentEditedId={setCurrentEditedId} 
              product={productItem}
              handleDelete = {handleDelete}
              />
              
            )) 
          : null
        }
      </div>

        <Sheet 
        open={openCreateProductsDialog} 
        onOpenChange={()=>{
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          }} >
          <SheetContent side='right' className='overflow-auto bg-white '>
              <SheetHeader className='border-b'>
                <SheetTitle>
                  {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
                  
                </SheetTitle>
              </SheetHeader>

              <ProductImageUpload 
              imageFile={imageFile}
              setImageFile = {setImageFile} 
              uploadedImageUrl = {uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode = {currentEditedId !== null}
              />

              <div className='py-6 '>
                 <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={ currentEditedId !== null ? 'Edit' : 'Add'} isBtnDisabled ={!isFormValid()}/>
             </div>
          </SheetContent>
        </Sheet>
     
  </Fragment>
}

export default AdminProducts
