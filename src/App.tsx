import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col items-center justify-center relative overflow-hidden font-display">
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
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Fycheo revolucionará la forma en que tu empresa controla horarios y proyectos. 
            Potencia tu productividad con nuestra plataforma todo en uno.
          </p>


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
