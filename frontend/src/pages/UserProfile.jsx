import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { ChevronLeft } from 'lucide-react';

const UserProfile = () => {


  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">

      <header
        className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 sticky top-0 z-50"
        data-aos="fade-down"
      >
        <a href="/">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <ChevronLeft
               Back to Dashboard
            />
            <h1 className="text-xl font-bold text-slate-900">Profile Settings</h1>
          </div>
          
        </div>
        </a>
      </header>
      
    </div>
  );
}

export default UserProfile;