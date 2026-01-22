import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-cyan-500/20 rounded-full blur-[80px]" />
      </div>

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-sm mb-6">
            Próximamente
          </span>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200 mb-6 tracking-tight">
            Gestión de tiempo <br />
            <span className="text-purple-400">inteligente y simple.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fycheo revolucionará la forma en que tu empresa controla horarios y proyectos. 
            Potencia tu productividad con nuestra plataforma todo en uno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://app.fycheo.es" 
              className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95"
            >
              Ir a la App
            </a>
            <a 
              href="https://manager.fycheo.es"
              className="px-8 py-3.5 rounded-xl bg-slate-800/50 text-white font-medium border border-slate-700/50 hover:bg-slate-800 transition-all hover:border-slate-600 backdrop-blur-sm active:scale-95"
            >
              Acceso Manager
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-slate-500 text-sm z-10">
        © {new Date().getFullYear()} Fycheo. Todos los derechos reservados.
      </div>
    </div>
  )
}

export default App
