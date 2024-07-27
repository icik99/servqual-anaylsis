import { useRouter } from 'next/router'
import React from 'react'

export default function HasilPerhitungan({hasil}) {
    const router = useRouter()
    const responden = hasil.data?.respondent
    const result = hasil.data?.result

  return (
    <div className='min-h-screen w-full py-10 md:px-20 px-6 bg-white'>
          <h1 className='text-3xl mb-4 font-bold'>Identitas Responden</h1>
        <div className='border-2 p-5 shadow-lg rounded-xl mb-10'>
          <div className='space-y-4'>
              <div className='w-full'>
                  <h1 className='mb-2'>Nama: </h1>
                  <div className='py-2 px-5 border-2 shadow rounded-lg w-full'>{responden.nama || '-'}</div>
              </div>
              <div className='w-full'>
                  <h1 className='mb-2'>Jenis Kelamin: </h1>
                  <div className='py-2 px-5 border-2 shadow rounded-lg w-full'>{responden.jenisKelamin === 'MALE' ? 'Laki-Laki' : 'Perempuan'}</div>

              </div>
              <div className='w-full'>
                  <h1 className='mb-2'>Pendidikan: </h1>
                  <div className='py-2 px-5 border-2 shadow rounded-lg w-full'>{responden.pendidikan || '-'}</div>

              </div>
              <div className='w-full'>
                  <h1 className='mb-2'>Usia: </h1>
                  <div className='py-2 px-5 border-2 shadow rounded-lg w-full'>{responden.usia || '-'} Tahun</div>

              </div>
          </div>
        </div>
        <h1 className='text-3xl mb-4 font-bold'>Hasil Analisis</h1>
        <div>
          <div className='border-2 p-5 shadow-lg rounded-xl space-y-10'>
            <div className="overflow-x-auto">
              <h1 className='text-lg mb-4 font-semibold'>Rata-Rata Tiap Dimensi</h1>
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Dimensi</th>
                    <th className="border border-gray-300 px-4 py-2">Harapan</th>
                    <th className="border border-gray-300 px-4 py-2">Persepsi</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(result).map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-4 py-2 ">{item?.dimension}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item?.average?.expectation || '-'}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item?.average?.perception || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <h1 className='text-lg mb-4 font-semibold'>Gap Score</h1>
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Dimensi</th>
                    <th className="border border-gray-300 px-4 py-2">Harapan</th>
                    <th className="border border-gray-300 px-4 py-2">Persepsi</th>
                    <th className="border border-gray-300 px-4 py-2">Nilai Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(result).map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-4 py-2">{item?.dimension || '-'}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item?.average?.expectation || '-'}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item?.average?.perception || '-'}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item?.gap || '0'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <h1 className='text-lg mb-4 font-semibold'>Interpretasi Hasil</h1>
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Dimensi</th>
                    <th className="border border-gray-300 px-4 py-2">Hasil</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(result).map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-4 py-2">{item?.dimension || '-'}</td>
                      <td className="border border-gray-300 px-4 py-2 text-start">{item?.interpretation || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/survey/${id}`);
  const hasil = await res.json();
  return {
    props: {
      hasil,
    },
  };
}