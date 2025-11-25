import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 bg-white border-b border-gray-200 flex justify-center">
      <div className="max-w-7xl mx-auto">
        <Image
          src="/Logo.svg"
          alt="Assurifii Logo"
          width={179}
          height={40}
          priority
        />
      </div>
    </nav>
  );
}

