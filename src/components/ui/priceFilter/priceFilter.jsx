import * as React from 'react';
import "../../../assets/css/priceFilter.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useEffect} from "react";

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider({ setPriceFilter, getMaxAndMinPrices }) {
    const [value, setValue] = React.useState([20, 37]);

    let [min, max] = getMaxAndMinPrices()

    useEffect(() => {
        setValue([min, max])
    }, [])
    let maxValue = max + 100
    /* let minValue = min - 100 */

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPriceFilter(newValue)
    };

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={maxValue}
            />
        </Box>
    );
}