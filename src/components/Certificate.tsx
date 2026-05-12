import { motion, AnimatePresence } from 'motion/react';
import { Award, Download, Share2, Sparkles, ArrowRight, Loader2, X, Instagram, Gift } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
import React, { useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

export default function Certificate(props: { key?: React.Key }) {
  const { completedModules } = useProgressStore();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(true);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [displayStudentName, setDisplayStudentName] = useState('Seu Nome Aqui');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !whatsapp.trim()) return;
    
    setDisplayStudentName(studentName);
    setShowFormModal(false);
  };

  const generatePDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    
    try {
      const element = certificateRef.current;
      
      const dataUrl = await toJpeg(element, { 
        quality: 1.0, 
        backgroundColor: '#0a0a0c', 
        pixelRatio: 2,
        style: {
          transform: 'none',
        }
      });
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [element.offsetWidth, element.offsetHeight]
      });
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, element.offsetWidth, element.offsetHeight);
      pdf.save(`certificado-${displayStudentName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      
      // Show the reward instructions after download
      setShowRewardModal(true);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Ocorreu um erro ao gerar seu PDF. Tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-4 sm:p-8 w-full flex flex-col items-center justify-center min-h-[80vh] pb-24 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="text-center mb-10 w-full mt-10">
        <motion.div 
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-600/30 mb-6"
        >
          <Award size={40} />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">Parabéns!</h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto">
          Você concluiu todos os {completedModules.length} módulos da jornada e agora possui base para criar landing pages incríveis com IA e ferramentas modernas.
        </p>
      </div>

      {/* Scrollable Container for Mobile to keep certificate fixed-proportions */}
      <div className="w-full overflow-x-auto pb-4 flex justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Certificate Card */}
        <motion.div 
          ref={certificateRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-[800px] h-[570px] shrink-0 bg-[#0a0a0c] sm:bg-white/[0.03] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md flex flex-col p-12"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 col-span-1 rounded-bl-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-tr-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-base uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold flex items-center gap-4">
              <Sparkles size={16} className="text-indigo-400" />
              Certificado de Conclusão
              <Sparkles size={16} className="text-indigo-400" />
            </h2>
            
            <p className="text-base text-gray-400 mb-6">Certificamos que</p>
            <div className="border-b-2 border-white/20 w-3/4 pb-2 mb-10">
              <h3 className="text-5xl font-serif text-white italic capitalize">
                {displayStudentName}
              </h3>
            </div>
            
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Completou com sucesso o treinamento completo de <strong>Criação de Identidade e Landing Pages com IA</strong>, demonstrando domínio em ferramentas modernas e prompt engineering.
            </p>

            <div className="mt-auto w-full flex justify-between items-end pt-10 px-8">
               <div className="text-center text-white">
                 <div className="w-40 border-b border-white/20 mb-2 mx-auto flex flex-col items-center justify-end min-h-16 pb-2">
                   <img src="https://i.postimg.cc/kgmY092W/image-removebg-preview-(20).png" alt="DS Company Logo" className="h-12 sm:h-14 object-contain" />
                 </div>
                 <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold pl-1">DS Company</p>
               </div>
               
               <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 flex items-center justify-center relative bg-indigo-500/10 shrink-0">
                 <Award className="text-indigo-400 w-8 h-8" />
               </div>
               
               <div className="text-center text-white">
                 <div className="w-32 border-b border-white/20 mb-2 pb-1 text-sm font-medium mx-auto h-12 flex items-end justify-center">
                   {new Date().toLocaleDateString('pt-BR')}
                 </div>
                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold pl-1">Data</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 mt-8"
      >
        <button 
          onClick={generatePDF}
          disabled={isDownloading || showFormModal}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors flex justify-center items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {isDownloading ? 'Gerando PDF...' : 'Baixar PDF'}
        </button>
        <button className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors flex justify-center items-center gap-2">
          <Share2 size={18} /> Compartilhar
        </button>
      </motion.div>

      {/* Upgrade CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-16 w-full max-w-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl -z-10 rounded-full" />
        
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 shadow-lg shrink-0">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl sm:text-3xl font-bold text-white mb-3">Pronto para o próximo nível?</h3>
        <p className="text-gray-400 max-w-lg mb-8 text-sm sm:text-base">
          Você já domina a base. Chegou a hora de acelerar seus resultados e criar landing pages que convertem de verdade com nosso método avançado e packs exclusivos.
        </p>
        <a 
          href="https://seusite-ai-lp.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto justify-center group relative bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 hover:-translate-y-1 flex items-center gap-2 shadow-xl shadow-white/10 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="text-sm sm:text-base whitespace-nowrap">Evoluir Meus Conhecimentos</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
        </a>
      </motion.div>

      {/* Modal for User Details - MUST FILL TO SEE CERTIFICATE */}
      <AnimatePresence>
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                <Award size={24} />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Para acessar seu certificado...</h2>
              <p className="text-gray-400 text-sm mb-6">
                Por favor, preencha seus dados reais para que seu certificado seja gerado corretamente e possamos validar sua conclusão.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Como deseja que seu nome saia no certificado?
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nome Completo"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Seu melhor WhatsApp (com DDD)
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 mt-4 transition-colors"
                >
                  <Sparkles size={18} />
                  Acessar Meu Certificado
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Reward Modal after downloading PDF */}
        {showRewardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl pointer-events-none" />
              
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-pink-500/20">
                <Gift size={32} />
              </div>
              
              <h2 className="text-2xl font-extrabold text-white mb-4 tracking-tight">Presente Desbloqueado! 🎁</h2>
              
              <div className="text-gray-300 text-sm mb-8 space-y-4">
                <p>
                  O seu certificado foi gerado e baixado com sucesso!
                </p>
                <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <strong>Tire um PRINT</strong> do seu certificado (ou grave a tela do PC) e poste nos seus stories marcando <strong className="text-pink-400">@dscompany1_</strong>.
                </p>
                <p>
                  Ao fazer isso, nossa equipe vai te chamar no direct e enviar um <strong>Mini-Curso Gratuito</strong> exclusivo para você!
                </p>
              </div>
              
              <div className="w-full space-y-3">
                <a
                  href="https://instagram.com/dscompany1_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/20"
                >
                  <Instagram size={20} />
                  Postar no Instagram
                </a>
                
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl py-3 font-semibold transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
