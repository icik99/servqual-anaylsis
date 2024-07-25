import React, { useState } from 'react';
import RadioButton from '../RadioButton';

const Question = ({ questionText, name, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    console.log(selectedOption)

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const options = [
        { value: 1, label: 'Sangat Tidak Setuju' },
        { value: 2, label: 'Tidak Setuju' },
        { value: 3, label: 'Kurang Setuju' },
        { value: 4, label: 'Netral' },
        { value: 5, label: 'Agak Setuju' },
        { value: 6, label: 'Setuju' },
        { value: 7, label: 'Sangat Setuju' },
    ];

    return (
        <div>
            <h1>{questionText}</h1>
            {options.map(option => (
                <RadioButton
                    key={option.value}
                    name={name}
                    value={option.value}
                    checked={selectedOption === option.value.toString()}
                    onChange={handleChange}
                    label={option.label}
                />
            ))}
        </div>
    );
};

export default Question;
