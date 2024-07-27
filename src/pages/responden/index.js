import { Button } from 'antd';
import { data } from 'autoprefixer';
import moment from 'moment';
import Link from 'next/link';
import React from 'react'

export default function Responden({dataResponden}) {
    console.log(dataResponden)

    const dataRes = dataResponden.data
  return (
    <div className='min-h-screen w-full py-10 md:px-20 px-6 bg-white'>
        <div className="flex gap-10 justify-between mb-10">
        <h1 className='text-3xl  font-bold'>Daftar Responden</h1>
        </div>
        <div>
          <div className=''>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">No.</th>
                    <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                    <th className="border border-gray-300 px-4 py-2">Nama</th>
                    <th className="border border-gray-300 px-4 py-2">Jenis Kelamin</th>
                    <th className="border border-gray-300 px-4 py-2">Pendidikan</th>
                    <th className="border border-gray-300 px-4 py-2">Usia</th>
                    <th className="border border-gray-300 px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(dataRes).map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-4 py-1">{idx + 1}</td>
                      <td className="border border-gray-300 px-4 py-1">{moment(item?.tanggal).format('DD MMMM YYYY - [Pukul] HH:mm')}</td>
                      <td className="border border-gray-300 px-4 py-1">{item?.respondent?.nama}</td>
                      <td className="border border-gray-300 px-4 py-1">{item?.respondent?.jenisKelamin === 'MALE' ? 'Laki-Laki' : 'Perempuan'}</td>
                      <td className="border border-gray-300 px-4 py-1">{item?.respondent?.pendidikan}</td>
                      <td className="border border-gray-300 px-4 py-1">{item?.respondent?.usia}</td>
                      <div className='flex items-center justify-center border border-gray-300 px-4 py-1 '>
                        <Link href={`/form/hasil/${item.id}`} className="rounded-md border border-gray-300 px-2 py-1 bg-blue-500 text-white font-semibold">Detail</Link>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex gap-10 justify-end mt-10">
        <Button style={{ height: '50px' }} className="text-lg font-semibold border-blue-500 text-blue-500">
          <Link href={'/'}>Kembali</Link>
        </Button>
        </div>
    </div>
  )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/survey`);
    const dataResponden = await res.json();
  
    // Mengembalikan data sebagai props ke komponen
    return {
      props: {
        dataResponden,
      },
    };
  }