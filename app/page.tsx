'use client';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl">zipcodes on things in my room</h1>
          <p>i kept seeing addresses on things. they mostly looked like this:</p>
          <div className="text-center w-full">
            <p>Corporation Products Inc.</p>
            <p>123 Example Drive</p>
            <p>Exampleton, ST 12345</p>
          </div>
          <p>i decided to map out where all these addresses were on just the items in my room at home. (i chose this limitation to avoid getting overwhelmed with stuff to look at, but this created a major bias against food items and for stuff like books and random sticks of chapstick.)</p>
          <p>the map looks like this:</p>

          <DynamicMap />

          <p className="text-sm"><a href="https://github.com/milesjaffee/zip-codes-in-my-room">github</a></p>
          
        </div>
      </main>
    </div>
  );
}
