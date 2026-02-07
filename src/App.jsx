import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Maximize, ShieldCheck, Waves, Dumbbell, Trees, Phone, Download, 
  CheckCircle2, Building2, Wifi, Play, Pause, Volume2, VolumeX, X, Mail, 
  User, ArrowRight, MessageCircle, TrendingUp, Zap, Star, Loader2
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formStep, setFormStep] = useState('input');
  const videoRef = useRef(null);

  const advisor = {
    name: "Aurelio Robles Pichardo",
    phone: "5546539933",
    countryCode: "52",
    get waLink() {
      const msg = encodeURIComponent(`Hola Aurelio, vi tu web de Gran Quinta. Me interesa el Lote 1. ¿Podemos agendar visita?`);
      return `https://wa.me/${this.countryCode}${this.phone}?text=${msg}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // BASE URL PARA TUS IMÁGENES EN GITHUB (RAÍZ)
  const baseUrl = "https://raw.githubusercontent.com/superyeyo8482/Ficha-tecnica-Terreno-1-Gran-Quinta-Metepec--/main/";
  
  const assets = {
    hero: `${baseUrl}Entrada%20Principal.jpeg`,
    video: `${baseUrl}video%20del%20fraccionamiento%20y%20terreno.mp4`,
    gallery: [
      { url: `${baseUrl}areas%20verdes.jpeg`, title: "Plusvalía Natural" },
      { url: `${baseUrl}area%20de%20usos%20multiples.jpeg`, title: "Club House" },
      { url: `${baseUrl}areas%20verdes%20(2).jpeg`, title: "Seguridad 24/7" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => { setShowModal(false); setFormStep('input'); }} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} className="text-slate-400" /></button>
            <div className="p-12 text-left">
              {formStep === 'input' && (
                <>
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8"><Download size={32} /></div>
                  <h3 className="text-3xl font-black mb-3 tracking-tight">Expediente Digital</h3>
                  <p className="text-slate-500 mb-10 leading-relaxed font-light">Reciba planos y costos del Lote 1 directamente.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setFormStep('submitting'); setTimeout(() => setFormStep('success'), 2000); }} className="space-y-4">
                    <div className="relative"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} /><input required type="text" placeholder="Nombre" className="w-full pl-14 pr-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                    <div className="relative"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} /><input required type="email" placeholder="Correo" className="w-full pl-14 pr-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
                    <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl mt-6 uppercase italic">Enviar <ArrowRight size={20} /></button>
                  </form>
                </>
              )}
              {formStep === 'submitting' && <div className="py-24 flex flex-col items-center text-center"><Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" /><p className="text-2xl font-black text-slate-800 italic">Procesando...</p></div>}
              {formStep === 'success' && <div className="py-10 text-center"><div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"><CheckCircle2 size={48} /></div><h3 className="text-3xl font-black mb-4 italic uppercase">¡Enviado!</h3><p className="text-slate-500 mb-10">Aurelio te contactará pronto.</p><button onClick={() => setShowModal(false)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase italic tracking-widest">Cerrar</button></div>}
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-950 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl italic">GQ</div>
            <div className="hidden sm:flex flex-col text-left">
              <span className={`font-black text-xl tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-white'}`}>Gran Quinta</span>
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mt-1 ${scrolled ? 'text-indigo-600' : 'text-indigo-300'}`}>Metepec Luxury</span>
            </div>
          </div>
          <a href={advisor.waLink} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl text-sm flex items-center gap-2 group tracking-tighter uppercase italic">
            <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" /> AGENDAR CIERRE
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img src={assets.hero} alt="Hero" className="w-full h-full object-cover opacity-80" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=1600&q=80" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/20 to-[#FDFDFD] z-10"></div>
        </div>
        <div className="relative z-20 text-center text-white px-6 max-w-6xl">
          <h1 className="text-7xl md:text-[11rem] font-black mb-6 tracking-tighter leading-[0.8] drop-shadow-2xl italic uppercase">METEPEC</h1>
          <p className="text-xl md:text-3xl font-light opacity-90 tracking-[0.25em] uppercase mb-16 italic font-bold">Lote 1: Oportunidad Residencial</p>
          <div className="flex justify-center gap-6">
            <button onClick={() => setShowModal(true)} className="px-12 py-6 bg-white text-indigo-950 rounded-[2rem] font-black hover:bg-indigo-50 transition-all shadow-2xl text-lg italic uppercase">Ficha PDF</button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 text-left">
            <h2 className="text-5xl font-black mb-12 flex items-center gap-6 text-slate-900 tracking-tighter italic uppercase">
              <span className="w-20 h-3 bg-indigo-600 rounded-full"></span> Lote 1 - Privada
            </h2>
            <div className="relative aspect-video rounded-[4rem] overflow-hidden bg-slate-900 group shadow-2xl border-[12px] border-white ring-1 ring-slate-100 mb-20">
              <video ref={videoRef} src={assets.video} className="w-full h-full object-cover" loop muted={isMuted} playsInline />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={togglePlay} className="p-10 bg-white/20 backdrop-blur-3xl rounded-full text-white border border-white/30 hover:scale-110 transition-transform shadow-2xl">
                  {isPlaying ? <Pause size={56} fill="white" /> : <Play size={56} fill="white" />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {assets.gallery.map((img, i) => (
                <div key={i} className={`rounded-[3.5rem] overflow-hidden shadow-2xl h-[450px] group relative ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col justify-end p-10 text-left">
                    <p className="text-white font-black text-2xl mb-2 italic uppercase tracking-tighter">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 text-left">
            <div className="sticky top-40 space-y-10 text-left">
              <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100 text-left">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-left">Inversión</h3>
                <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-12 text-left">$3.85M <span className="text-lg font-light text-slate-400">MXN</span></p>
                <a href={advisor.waLink} target="_blank" rel="noreferrer" className="w-full bg-emerald-600 text-white py-7 rounded-[2.5rem] font-black hover:bg-emerald-700 transition-all shadow-xl flex items-center justify-center gap-4 text-xl italic uppercase tracking-tighter shadow-emerald-200">
                   Contactar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-950 text-white py-20 text-center rounded-t-[4rem]">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest italic font-bold">© 2026 Robles Ecosystem.</p>
      </footer>
    </div>
  );
};

export default App;
