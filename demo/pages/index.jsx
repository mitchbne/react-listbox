import Head from 'next/head'
import  { SelectMenu } from "../components/SelectMenu"
export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="bg-white min-h-screen w-full antialiased py-20">
        <div className="mx-auto max-w-xs">
          <SelectMenu />
        </div>
      </div>
    </>
  )
}
