import { Wrench } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
              <div className="relative liner bg-[#3498DB] p-8 rounded-full shadow-lg">
                <Wrench className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              The Site is Under Maintenance
            </h1>
            <p className="text-base md:text-md lg:text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;ll be back soon. Thank you for your patience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
