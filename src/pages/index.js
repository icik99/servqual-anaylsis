import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl mb-6">Website Perhitungan SERVQUAL</h1>
        <Button type="primary" value='large'>
          <Link href={'/form'}>Mulai Perhitungan</Link>
        </Button>
      </div>
    </div>
  )
}
