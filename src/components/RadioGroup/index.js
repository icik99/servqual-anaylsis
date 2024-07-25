const RadioGroup = ({ dimensionIndex, questionIndex, questionText, handleChange }) => {
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
            {options.map((option) => (
                <div key={option.value} className='flex gap-2 pl-4'>
                    <input
                        type="radio"
                        name={`question${questionIndex}`}
                        value={option.value}
                        onChange={() => handleChange(dimensionIndex, questionIndex, option.value)}
                    />
                    <h1>{option.label}</h1>
                </div>
            ))}
        </div>
    );
};