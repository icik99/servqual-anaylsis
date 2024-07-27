import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-sm md:text-4xl mb-6 font-bold">PENERAPAN METODE SERVQUAL DALAM MENGANALISIS <br/> TINGKAT KEPUASAN PELANGGAN INDIHOME <br/> PT. TELKOM AKSES KOTA GORONTALO </h1>
        <div className='space-y-4 mb-7 px-4'>
            <h1>Isilah jawaban Bapak/Ibu/Saudara dengan cara checlist (√) dikolom yang telah tersedia. Setiap pernyataan diikuti oleh 7 pilihan. <br/> Bapak/Ibu/Saudara cukup memilih salah satu dari 7 jawaban yang tersedia dengan ketentuan sebagai berikut: </h1>
            <div>
                STS	: Sangat Tidak Setuju <br/>
                TS	: Tidak Setuju <br/>
                KS	: Kurang setuju <br/>
                N	: Netral <br/>
                AS	: Agak Setuju <br/>
                S	: Setuju <br/>
                SS	: Sangat Setuju
            </div>
        </div>
        <div className="flex gap-10 justify-center">
        <Button type="primary" style={{ height: '50px' }} className="text-lg font-semibold">
        <Link href={'/form'}>Isi Kuesioner</Link>
        </Button>
        <Button style={{ height: '50px' }} className="text-lg font-semibold border-blue-500 text-blue-500">
          <Link href={'/responden'}>Daftar Responden</Link>
        </Button>
        </div>
      </div>
    </div>
  )
}
