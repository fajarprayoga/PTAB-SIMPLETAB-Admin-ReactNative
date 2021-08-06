import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../utils'

const Dropdown =(props)=>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    
    return(
        <DropDownPicker
            placeholder={props.placeholder}
            style={{borderColor : '#087CDB'}}
            open={open}
            value={value}
            items={props.items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={props.setItems}
            onChangeValue={props.onChangeValue}
       />
    )
}

export default Dropdown