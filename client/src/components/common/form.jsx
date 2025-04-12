import React from 'react'
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"; 
import {Input} from '@/components/ui/input'


const types = {
    Input : 'input',
    Select : 'select',
    Textarea : 'textarea',
    Label : 'label'
}
const CommonForm = ({formControls,formData, setFormData, onSubmit , buttonText, isBtnDisabled}) => {

    function renderInputByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || ''
       

        switch(getControlItem.componentType){
            case types.Input:
                element = (
                    <Input
                    name = {getControlItem.name}
                    placeholder = {getControlItem.placeholder}
                    id = {getControlItem.name}
                    type = {getControlItem.type}
                    value = {value}
                    onChange = {(event) => setFormData({...formData, [getControlItem.name]: event.target.value,})}
                    />
                );
                break;

                case types.Select:
                    element = (
                        <Select onValueChange={(value)=>setFormData({
                            ...formData, 
                            [getControlItem.name]: value
                            })} value={value}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder={getControlItem.label}/>
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                {
                                    getControlItem.options && 
                                    getControlItem.options.length >0 ?
                                    getControlItem.options.map((optionItem) => (<SelectItem key={optionItem.id} value={optionItem.id} className=' hover:bg-gray-200 cursor-pointer'>{optionItem.label}</SelectItem>)) : null
                                }
                            </SelectContent>
                        </Select>
                    );
                    break;

            case 'textarea':
                element = (
                    <Textarea
                    name = {getControlItem.name}
                    placeholder = {getControlItem.placeholder}
                    id = {getControlItem.name} 
                    value={value}
                    onChange = {(event) => setFormData({...formData, [getControlItem.name]: event.target.value,})}
                    />
                );
                break;

            default:
                element = (
                    <Input
                    name = {getControlItem.name}
                    placeholder = {getControlItem.placeholder}
                    id = {getControlItem.name}
                    type = {getControlItem.type}
                    value = {value}
                    onChange = {(event) => setFormData({...formData, [getControlItem.name]: event.target.value,})}
                    />
                );
                break;    
        }

        return element;
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-3">
            {
             formControls.map(controlItem => <div className='grid w-full gap-1.5' key={controlItem.name}>
                <Label className='mb-1 '>{controlItem.label}</Label>
                {
                    renderInputByComponentType(controlItem)
                }
             </div>)
            }
            
          </div>
          <Button disabled ={isBtnDisabled} type ='submit' className='mt-2 w-full bg-black text-white'>{buttonText || 'submit'}</Button>
      </form>
    </div>
  )
}

export default CommonForm 
