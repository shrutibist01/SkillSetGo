import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

// Data for filters
const filterData = [
    {
        filterType: "Location",
        options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        options: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        options: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

// Individual Filter Option Component
const FilterOption = ({ value, id }) => (
    <div className='flex items-center space-x-2 my-2'>
        <RadioGroupItem value={value} id={id} />
        <Label htmlFor={id}>{value}</Label>
    </div>
);

// Filter Category Component
const FilterCategory = ({ category, options }) => (
    <div>
        <h1 className='font-bold text-lg'>{category}</h1>
        {options.map((option, idx) => (
            <FilterOption key={`${category}-${idx}`} value={option} id={`id-${category}-${idx}`} />
        ))}
    </div>
);

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => setSelectedValue(value);

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map(({ filterType, options }, index) => (
                    <FilterCategory key={index} category={filterType} options={options} />
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
