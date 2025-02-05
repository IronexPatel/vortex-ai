import Link from 'next/link';

export const LandingComponent = () => {        
    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
    
        
            {/* Conversational UI Card */}
            <div className="transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg shadow-2xl border border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-20"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Conversational AI</h2>
                <p className="text-lg text-white mb-8">Experience a truly immersive AI conversation. Connect now and see it live!</p>
                <Link
                href="/conversation">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 transform hover:scale-105">
                  Try Now
                </button>
                </Link>
              </div>
      
              {/* Animated Sparkles or Glowing Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-cover bg-center animate-pulse" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }}></div>
              </div>
            </div>
            <div className='w-full h-full text-xl'>
                Scroll to know kow it works
            </div>
          </div>
  
     
      
      

    )
}
export default LandingComponent;