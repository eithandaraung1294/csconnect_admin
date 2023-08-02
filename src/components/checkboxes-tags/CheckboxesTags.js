import {React, useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({label, selectedCategory, setSelectedCategory}) {
  const axiosPrivate = useAxiosPrivate();
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState([]);
  const getAllCategoriesUrl = "/admin/categories/published-categories";

  useEffect( () => {
    let isMounted = true;
    const controller = new AbortController();
    const getCategories = async () => {
      try{
        const categories = await axiosPrivate.get(getAllCategoriesUrl, {
          signal: controller.signal
        })
        if(isMounted) setCategory(categories.data);
      }catch (err){
        console.log(err)
      }
    }
    getCategories();
    return () => {
      isMounted = false;
      controller.abort();
    }
  },[]) 

  // console.log(selectedCategory);
  return (
    <Autocomplete
      multiple
      value={selectedCategory}
      onChange={(event, newValue) => {
        setSelectedCategory(newValue);
      }}
      id="checkboxes-tags-demo"
      options={category}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
          <li {...props}>
              <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
              />
              {option.name}
          </li>
      )}
      fullWidth
      renderInput={(params) => (
          <TextField {...params} label={label} placeholder={label} />
      )}
    /> 
    
  );
}
