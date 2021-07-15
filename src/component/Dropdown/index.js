import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../utils'

const Dropdown =(props)=>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(props.data);
    return(
        <DropDownPicker
            zIndex={props.zIndex ? props.zIndex:1}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={props.multiple}
            min={props.min}
            max={props.max}
            searchable={props.searchable}
            placeholder={props.placeholder}
            style={{
                borderColor:colors.border,

            }}
            textStyle={{
                color:colors.text
            }}
            containerStyle={{
                width: props.width ? props.width:'100%',
            }}

            onChangeValue={props.onChangeValue}

            schema={{
                selectable: props.selectable ? props.selectable : null,
              }}
            
        />
    )
}

export default Dropdown