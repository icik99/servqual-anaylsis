import React, { useState } from 'react'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Api from '@/utils/apiService';

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
        <div className=''>
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

export default function FormInputan() {

    const [stepper, setStepper] = useState(1)
    const formik = useFormik({
        initialValues: {
            nama: '',
            jenisKelamin: '',
            pendidikan: '',
            usia: '',
            surveyResult: [
                {
                    dimension: 'Tangible',
                    answer: {
                        expectation: [],
                        perception: []
                    }
                },
                {
                    dimension: 'Reliability',
                    answer: {
                        expectation: [],
                        perception: []
                    }
                },
                {
                    dimension: 'Responsiveness',
                    answer: {
                        expectation: [],
                        perception: []
                    }
                },
                {
                    dimension: 'Assurance',
                    answer: {
                        expectation: [],
                        perception: []
                    }
                },
                {
                    dimension: 'Emphaty',
                    answer: {
                        expectation: [],
                        perception: []
                    }
                },
            ],
        },
        onSubmit: async (values) => {
            try {
                await toast.promise (
                    Api.post('survey', values), {
                        loading: 'Processing...',
                        success: (res) => {
                            console.log(res)
                            return res.response.data || 'Sukses Menghitung Nilai Servqual'
                        },
                        error: (err) => {
                            console.log(err)
                            return err.response?.data || 'Something went wrong'
                        }
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }
    })

    console.log(formik.values)
    const handleExpectationChange = (dimensionIndex, questionIndex, value) => {
        const updatedSurveyResult = [...formik.values.surveyResult];
        updatedSurveyResult[dimensionIndex].answer.expectation[questionIndex] = value;
        formik.setFieldValue('surveyResult', updatedSurveyResult);
    };
    const handlePerceptionChange = (dimensionIndex, questionIndex, value) => {
        const updatedSurveyResult = [...formik.values.surveyResult];
        updatedSurveyResult[dimensionIndex].answer.perception[questionIndex] = value;
        formik.setFieldValue('surveyResult', updatedSurveyResult);
    };

    return (
        <div className='min-h-screen w-full py-10 px-20 bg-white'>
            {stepper === 1 ? (
                <div>
                    <h1 className='text-5xl mb-4 font-bold'>Identitas Responden</h1>
                    <div className='space-y-4'>
                        <div className='w-full'>
                            <h1 className='mb-2'>Nama: </h1>
                            <input type="text" name='nama' placeholder='Nama....' onChange={formik.handleChange} className='py-2 px-5 border-2 shadow rounded-lg w-full' />
                        </div>
                        <div className='w-full'>
                            <h1 className='mb-2'>Jenis Kelamin: </h1>
                            <input type="text" name='jenisKelamin' placeholder='Jenis Kelamin....' onChange={formik.handleChange} className='py-2 px-5 border-2 shadow rounded-lg w-full' />
                        </div>
                        <div className='w-full'>
                            <h1 className='mb-2'>Pendidikan: </h1>
                            <input type="text" name='pendidikan' placeholder='Pendidikan....' onChange={formik.handleChange} className='py-2 px-5 border-2 shadow rounded-lg w-full' />
                        </div>
                        <div className='w-full'>
                            <h1 className='mb-2'>Usia: </h1>
                            <input type="text" name='usia' placeholder='Usia....' onChange={formik.handleChange} className='py-2 px-5 border-2 shadow rounded-lg w-full' />
                        </div>
                    </div>
                    <div className='mt-4 flex items-center justify-end'>
                        <button onClick={() => setStepper(2)} className='py-2 px-5 bg-blue-500 text-white font-semibold rounded-lg'>Selanjutnya</button>
                    </div>
                </div>
            ) :  stepper === 2 ? (
                <div>
                    <h1 className='text-5xl mb-4 font-bold'>Harapan</h1>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Tangible (Bukti Fisik)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={0}
                                questionText="1. Lembaga layanan harus memiliki peralatan modern."
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={1}
                                questionText="2. Karyawan harus memberikan layanan cepat kepada pelanggan."
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={2}
                                questionText="3. Karyawan harus selalu siap membantu pelanggan. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={3}
                                questionText="4. Karyawan tidak boleh terlalu sibuk untuk merespons permintaan pelanggan.							"
                                handleChange={handleExpectationChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Reliability (Keandalan)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={0}
                                questionText="1. Lembaga harus mampu melaksanakan layanan yang dijanjikan secara andal"
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={1}
                                questionText="2. Lembaga harus menunjukkan kepedulian dalam menyelesaikan masalah pelanggan."
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={2}
                                questionText="3. Lembaga harus memberikan layanan yang benar pada kali pertama. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={3}
                                questionText="4. Lembaga harus memberikan layanan tepat waktu."
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={4}
                                questionText="5. Lembaga harus menyimpan catatan yang akurat."
                                handleChange={handleExpectationChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Responsiveness (Daya Tanggap)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={0}
                                questionText="1. Karyawan harus memberi tahu pelanggan kapan layanan akan dilakukan."
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={1}
                                questionText="2	. Karyawan harus memberikan layanan cepat kepada pelanggan. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={2}
                                questionText="3. Karyawan harus selalu siap membantu pelanggan. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={3}
                                questionText="4. Karyawan tidak boleh terlalu sibuk untuk merespons permintaan pelanggan."
                                handleChange={handleExpectationChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Assurance (Jaminan)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={0}
                                questionText="1. Karyawan harus dapat dipercaya. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={1}
                                questionText="2. Pelanggan harus merasa aman dalam transaksi mereka. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={2}
                                questionText="3. Karyawan harus sopan. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={3}
                                questionText="4. Karyawan harus memiliki pengetahuan untuk menjawab pertanyaan pelanggan."
                                handleChange={handleExpectationChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Emphaty (Empati)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={0}
                                questionText="1. Lembaga harus memberikan perhatian personal kepada pelanggan. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={1}
                                questionText="2. Karyawan harus memberi perhatian kepada pelanggan.  "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={2}
                                questionText="3. Karyawan harus memahami kebutuhan khusus pelanggan. "
                                handleChange={handleExpectationChange}
                            />
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={3}
                                questionText="4. Lembaga harus memiliki jam operasional yang nyaman bagi semua pelanggan."
                                handleChange={handleExpectationChange}
                            />
                        </div>
                    </div>
                    <div className='mt-4 flex items-center justify-end gap-4'>
                        <button onClick={() => setStepper(1)} className='py-2 px-5 text-blue-500 bg-white font-semibold border-2 border-blue-500 rounded-lg'>Kembali</button>
                        <button onClick={() => setStepper(3)} className='py-2 px-5 bg-blue-500 text-white font-semibold rounded-lg'>Selanjutnya</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className='text-5xl mb-4 font-bold'>Persepsi</h1>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Tangible (Bukti Fisik)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={0}
                                questionText="1. Lembaga layanan harus memiliki peralatan modern."
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={1}
                                questionText="2. Karyawan harus memberikan layanan cepat kepada pelanggan."
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={2}
                                questionText="3. Karyawan harus selalu siap membantu pelanggan. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={0}
                                questionIndex={3}
                                questionText="4. Karyawan tidak boleh terlalu sibuk untuk merespons permintaan pelanggan.							"
                                handleChange={handlePerceptionChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Reliability (Keandalan)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={0}
                                questionText="1. Lembaga harus mampu melaksanakan layanan yang dijanjikan secara andal"
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={1}
                                questionText="2. Lembaga harus menunjukkan kepedulian dalam menyelesaikan masalah pelanggan."
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={2}
                                questionText="3. Lembaga harus memberikan layanan yang benar pada kali pertama. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={3}
                                questionText="4. Lembaga harus memberikan layanan tepat waktu."
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={1}
                                questionIndex={4}
                                questionText="5. Lembaga harus menyimpan catatan yang akurat."
                                handleChange={handlePerceptionChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Responsiveness (Daya Tanggap)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={0}
                                questionText="1. Karyawan harus memberi tahu pelanggan kapan layanan akan dilakukan."
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={1}
                                questionText="2	. Karyawan harus memberikan layanan cepat kepada pelanggan. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={2}
                                questionText="3. Karyawan harus selalu siap membantu pelanggan. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={2}
                                questionIndex={3}
                                questionText="4. Karyawan tidak boleh terlalu sibuk untuk merespons permintaan pelanggan."
                                handleChange={handlePerceptionChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Assurance (Jaminan)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={0}
                                questionText="1. Karyawan harus dapat dipercaya. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={1}
                                questionText="2. Pelanggan harus merasa aman dalam transaksi mereka. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={2}
                                questionText="3. Karyawan harus sopan. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={3}
                                questionIndex={3}
                                questionText="4. Karyawan harus memiliki pengetahuan untuk menjawab pertanyaan pelanggan."
                                handleChange={handlePerceptionChange}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h1 className='text-lg mb-4'>Dimensi Emphaty (Empati)</h1>
                        <div className='rounded-lg border-2 shadow-lg p-5 space-y-4'>
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={0}
                                questionText="1. Lembaga harus memberikan perhatian personal kepada pelanggan. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={1}
                                questionText="2. Karyawan harus memberi perhatian kepada pelanggan.  "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={2}
                                questionText="3. Karyawan harus memahami kebutuhan khusus pelanggan. "
                                handleChange={handlePerceptionChange}
                            />
                            <RadioGroup
                                dimensionIndex={4}
                                questionIndex={3}
                                questionText="4. Lembaga harus memiliki jam operasional yang nyaman bagi semua pelanggan."
                                handleChange={handlePerceptionChange}
                            />
                        </div>
                    </div>
                    <div className='mt-4 flex items-center justify-end gap-4'>
                        <button onClick={() => setStepper(2)} className='py-2 px-5 text-blue-500 bg-white font-semibold border-2 border-blue-500 rounded-lg'>Kembali</button>
                        <button onClick={formik.handleSubmit} className='py-2 px-5 bg-blue-500 text-white font-semibold rounded-lg'>Lihat Hasil</button>
                    </div>
                </div>
            )}
        </div>
    )
}
