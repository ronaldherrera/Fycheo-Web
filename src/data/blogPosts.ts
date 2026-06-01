export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  imageFilename: string;
  imagePath: string;
  imageDesc: string;
  imageAlt: string;
  content: string;
  faqs: { q: string; a: string }[];
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    slug: "control-horario-obligatorio-espana",
    title: "Control horario obligatorio en España: qué debe saber una empresa",
    excerpt: "Guía clara y sin rodeos sobre la normativa de registro de jornada laboral. Conoce los requisitos y evita multas administrativas.",
    category: "Normativa",
    date: "25 May 2026",
    author: "Equipo Fycheo",
    readTime: "5 min",
    imageFilename: "blog-control-horario-obligatorio-espana.webp",
    imagePath: "/public/images/blog/blog-control-horario-obligatorio-espana.webp",
    imageDesc: "Responsable de empresa revisando registros de jornada laboral en una pantalla.",
    imageAlt: "Control horario obligatorio en España para empresas.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Llevar el registro de jornada ya no es una opción ni un acuerdo interno de confianza. Desde mayo de 2019, la ley española obliga a todas las empresas a registrar la jornada laboral de sus trabajadores.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">¿Cuáles son las obligaciones básicas ante una inspección?</h2>
      <p class="mb-4">Para que tu registro de jornada sea legalmente válido, no basta con tener un cuadrante de turnos previstos o una plantilla en Excel firmada al final del mes. La Inspección de Trabajo exige que el registro sea:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Diario:</strong> Debe registrarse la hora de inicio y de fin de la jornada de cada empleado en tiempo real.</li>
        <li><strong>Invariable:</strong> Los datos deben ser fiables y no manipulables de forma retroactiva.</li>
        <li><strong>Accesible:</strong> Los registros deben estar disponibles inmediatamente en el centro de trabajo para los empleados, sus representantes y los inspectores.</li>
        <li><strong>Archivable:</strong> Es obligatorio guardar estos registros durante al menos 4 años.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Riesgos y multas por no llevar el registro correctamente</h2>
      <p class="mb-4">Las sanciones por el incumplimiento de la normativa de registro de jornada pueden oscilar entre los 750 euros (infracciones leves) y llegar hasta los 225.000 euros en casos muy graves de vulneraciones sistemáticas.</p>
      <p class="mb-4">Para la gran mayoría de pymes, una inspección de trabajo rutinaria que detecta la ausencia de control horario suele saldarse con una sanción grave de entre 7.500 y 10.000 euros. Evitar esto es tan sencillo como digitalizar el proceso.</p>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Cómo te ayuda un sistema digital como Fycheo</h2>
      <p class="mb-4">El papel es fácil de perder y muy laborioso de consolidar. Fycheo te ayuda a automatizar el cumplimiento normativo. A través de nuestro <a href="/software-control-horario" class="text-primary hover:underline font-semibold">software de control horario</a>, tus trabajadores fichan con facilidad y tú descargas informes oficiales al instante ante cualquier requerimiento legal.</p>
    `,
    faqs: [
      { q: "¿Es obligatorio el registro horario para trabajadores con teletrabajo?", a: "Sí, la ley de trabajo a distancia no exime del control horario. De hecho, exige un sistema fiable de registro diario de inicio y fin de jornada." },
      { q: "¿Durante cuánto tiempo hay que conservar los registros?", a: "Debes guardar los informes de fichaje durante un mínimo de 4 años, manteniéndolos a disposición de inspección y de los propios empleados." }
    ]
  },
  {
    slug: "como-llevar-control-horario-trabajadores",
    title: "Cómo llevar el control horario de los trabajadores sin volverte loco",
    excerpt: "Consejos prácticos para coordinar los fichajes diarios de tu equipo sin perder horas revisando hojas de firmas o hilos de WhatsApp.",
    category: "Gestión RRHH",
    date: "20 May 2026",
    author: "Equipo Fycheo",
    readTime: "4 min",
    imageFilename: "blog-como-llevar-control-horario-trabajadores.webp",
    imagePath: "/public/images/blog/blog-como-llevar-control-horario-trabajadores.webp",
    imageDesc: "Comparativa visual entre fichajes desordenados y panel organizado de Fycheo.",
    imageAlt: "Cómo llevar el control horario de los trabajadores.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Si tienes un equipo de 5, 15 o 30 personas, sabes lo difícil que es recordar quién llegó tarde, quién olvidó fichar al salir a comer o quién está de vacaciones esta semana.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Los tres errores que más tiempo te hacen perder</h2>
      <p class="mb-4">En el día a día de una pequeña empresa, el tiempo es oro. Sin embargo, muchas pymes cometen fallos organizativos evitables:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>El papel y el bolígrafo:</strong> Rellenar hojas de firmas físicas requiere estar detrás del empleado para que no olvide firmar y pasar luego esos datos a mano a final de mes.</li>
        <li><strong>Fichar por WhatsApp o llamadas:</strong> Enviar 'ya he entrado' por mensaje no tiene trazabilidad legal y dispersa la información.</li>
        <li><strong>No centralizar la gestión de vacaciones:</strong> Tener las ausencias en un calendario y las horas trabajadas en otro genera errores inevitables en las nóminas.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Un método sencillo en tres pasos</h2>
      <p class="mb-4">La solución pasa por implantar un flujo claro donde el empleado sea autónomo:</p>
      <p class="mb-4">1. <strong>Usa una sola herramienta:</strong> Centraliza el fichaje y las ausencias para no duplicar datos.</p>
      <p class="mb-4">2. <strong>Facilita el fichaje multi-dispositivo:</strong> Si están en la oficina, que fichen en una tablet. Si están fuera, desde una <a href="/app-fichar-trabajo" class="text-primary hover:underline font-semibold">app para fichar en el trabajo</a>.</p>
      <p class="mb-4">3. <strong>Define un día de revisión mensual:</strong> Revisa el panel una vez al mes para aprobar incidencias pendientes, en lugar de hacerlo día a día.</p>
    `,
    faqs: [
      { q: "¿Cómo corrijo un fichaje si un empleado se olvida?", a: "Con un sistema como Fycheo, el propio empleado puede solicitar una corrección de su entrada o salida desde su cuenta y tú la apruebas en un segundo desde tu panel de administrador." },
      { q: "¿Sirve para empleados que viajan o están fuera?", a: "Sí, al habilitar el fichaje móvil los empleados en ruta pueden registrar su jornada en el momento exacto estés donde estés." }
    ]
  },
  {
    slug: "excel-control-horario-problemas",
    title: "Usar Excel para el control horario: cuándo sirve y cuándo empieza a ser un problema",
    excerpt: "Descubre los riesgos de seguridad, la falta de validez legal y el tiempo oculto que se pierde al gestionar hojas de cálculo manuales.",
    category: "Tecnología",
    date: "15 May 2026",
    author: "Equipo Fycheo",
    readTime: "6 min",
    imageFilename: "blog-excel-control-horario-problemas.webp",
    imagePath: "/public/images/blog/blog-excel-control-horario-problemas.webp",
    imageDesc: "Hoja Excel con registros horarios confusos frente a una interfaz limpia de control horario.",
    imageAlt: "Problemas de usar Excel para control horario.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Empezar a registrar la jornada laboral con una plantilla de Excel es una reacción habitual. Al fin y al cabo, es una herramienta gratuita y que casi todos sabemos usar de forma básica.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">¿Cuándo empieza a quedarse corto el Excel?</h2>
      <p class="mb-4">El problema real surge cuando la empresa crece o cuando te enfrentas a una inspección de trabajo minuciosa. El Excel presenta tres fallos insalvables:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Es fácilmente modificable:</strong> Un inspector de trabajo puede rechazar un archivo Excel argumentando que los datos se pueden alterar a conveniencia del administrador sin dejar rastro (trazabilidad de auditoría).</li>
        <li><strong>Falta de control en tiempo real:</strong> No sabes quién ha fichado hoy hasta que te envían la hoja a final de mes.</li>
        <li><strong>Pérdida de tiempo manual:</strong> Sumar horas extras, restar pausas no retribuidas y corregir fallos te obliga a dedicar horas extras de oficina a tareas administrativas poco productivas.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">La alternativa inteligente</h2>
      <p class="mb-4">Para solucionar esto, usar una <a href="/alternativa-excel-control-horario" class="text-primary hover:underline font-semibold">alternativa a Excel para control horario</a> digital te permite ahorrar tiempo y estar completamente tranquilo ante la ley. Toda la información de jornadas, horas ordinarias y extraordinarias se computa y guarda automáticamente en un formato inalterable.</p>
    `,
    faqs: [
      { q: "¿Por qué un inspector de trabajo desconfía del Excel?", a: "Porque no garantiza la fiabilidad del registro. Cualquiera puede entrar al archivo de Excel y cambiar las horas de entrada y salida de un empleado de la semana pasada sin que quede constancia del cambio." },
      { q: "¿Es caro dar el salto a un programa especializado?", a: "No. En pymes el coste de un software es mínimo comparado con el tiempo de administración que ahorras y el blindaje ante posibles multas." }
    ]
  },
  {
    slug: "app-fichar-trabajo",
    title: "App para fichar en el trabajo: qué debería tener una buena solución",
    excerpt: "Analizamos las características indispensables en una aplicación móvil para registrar la jornada laboral de equipos en oficina o movilidad.",
    category: "Tecnología",
    date: "10 May 2026",
    author: "Equipo Fycheo",
    readTime: "5 min",
    imageFilename: "blog-app-fichar-trabajo.webp",
    imagePath: "/public/images/blog/blog-app-fichar-trabajo.webp",
    imageDesc: "Empleado fichando desde el móvil al entrar al trabajo.",
    imageAlt: "App para fichar en el trabajo desde el móvil.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Con el auge del trabajo híbrido y la movilidad geográfica de muchos puestos de trabajo, registrar la jornada desde la pared de la oficina ya no es suficiente.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Funcionalidades críticas para tu app de fichaje</h2>
      <p class="mb-4">Si estás buscando la mejor solución móvil para tu empresa, asegúrate de que cumpla con los siguientes estándares de utilidad:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Facilidad de uso extrema:</strong> Tus trabajadores deben poder registrar su entrada, salida o pausa en un par de toques sin curva de aprendizaje.</li>
        <li><strong>Geolocalización opcional:</strong> Muy útil para certificar que el inicio de jornada se realiza en el punto de trabajo correspondiente cuando son operarios o comerciales en ruta.</li>
        <li><strong>Modo sin conexión a Internet (Offline):</strong> Fundamental para no perder registros si el empleado se encuentra en un sótano, almacén o zona sin cobertura.</li>
        <li><strong>Integración con vacaciones:</strong> Permitir al empleado ver sus días solicitados y festivos directamente en la misma app móvil.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Fycheo: tu app de fichajes móvil</h2>
      <p class="mb-4">Nuestra aplicación está pensada para responder a estas necesidades reales. Visita nuestra página dedicada sobre la <a href="/app-fichar-trabajo" class="text-primary hover:underline font-semibold">app para fichar en el trabajo</a> para ver cómo tus empleados pueden gestionar su registro diario con comodidad y transparencia.</p>
    `,
    faqs: [
      { q: "¿La app de fichaje consume muchos datos de móvil?", a: "Prácticamente nada. Solo envía una pequeña cadena de texto con la hora y, si se activa, las coordenadas GPS del fichaje." },
      { q: "¿Se puede obligar a usar la geolocalización?", a: "Sí, pero debe justificarse por necesidades operativas o de seguridad y los empleados deben estar informados según la LOPD." }
    ]
  },
  {
    slug: "registro-jornada-laboral-pymes",
    title: "Registro de jornada laboral en pymes: guía clara para empezar",
    excerpt: "Cómo implementar el control de fichajes en pequeñas empresas de forma rápida, económica y sin obstaculizar la rutina laboral diaria.",
    category: "Normativa",
    date: "05 May 2026",
    author: "Equipo Fycheo",
    readTime: "4 min",
    imageFilename: "blog-registro-jornada-laboral-pymes.webp",
    imagePath: "/public/images/blog/blog-registro-jornada-laboral-pymes.webp",
    imageDesc: "Pequeña empresa organizando fichajes y jornadas laborales.",
    imageAlt: "Registro de jornada laboral en pymes.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Las pequeñas empresas no suelen tener un departamento de recursos humanos dedicado para encargarse de cuadrar horarios y fichajes a diario.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Simplifica el cumplimiento normativo en tu negocio</h2>
      <p class="mb-4">Para una pyme de hostelería, comercio, un pequeño taller o una oficina de servicios, el control horario puede parecer un estorbo administrativo molesto. Sin embargo, no tiene por qué ser complicado si sigues estos pasos:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Foco en la sencillez:</strong> No busques un ERP de recursos humanos carísimo e hipercomplejo. Necesitas que tu equipo fiche de forma intuitiva.</li>
        <li><strong>Fomenta la corresponsabilidad:</strong> Explica a la plantilla que registrar sus horas asegura el cobro de horas extra y protege a la empresa ante multas de inspección.</li>
        <li><strong>Ahorra costes:</strong> Opta por soluciones flexibles y baratas con planes diseñados específicamente para el tamaño de tu plantilla.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Nuestra solución adaptada a pymes</h2>
      <p class="mb-4">En Fycheo sabemos cómo funciona una pequeña empresa y por eso ofrecemos planes escalables y sin complicaciones de implementación. Descubre todas las ventajas de Fycheo en nuestra sección de <a href="/control-horario-pymes" class="text-primary hover:underline font-semibold">control horario para pymes</a>.</p>
    `,
    faqs: [
      { q: "¿Qué pasa si solo tengo 2 o 3 empleados?", a: "La ley no establece un mínimo de trabajadores. Aunque tengas un solo empleado contratado por horas, estás obligado a registrar su jornada diariamente." },
      { q: "¿Se tarda mucho tiempo en configurar Fycheo?", a: "Menos de 15 minutos. Introduces los empleados, asignas su horario laboral teórico y ya pueden empezar a fichar." }
    ]
  },
  {
    slug: "fichaje-digital-empleados",
    title: "Fichaje digital de empleados: ventajas frente al papel",
    excerpt: "Por qué digitalizar el control horario mejora la productividad de la empresa, la transparencia con los empleados y blinda tu negocio ante inspecciones.",
    category: "Gestión RRHH",
    date: "01 May 2026",
    author: "Equipo Fycheo",
    readTime: "5 min",
    imageFilename: "blog-fichaje-digital-empleados.webp",
    imagePath: "/public/images/blog/blog-fichaje-digital-empleados.webp",
    imageDesc: "Empleados registrando su jornada con un sistema digital.",
    imageAlt: "Fichaje digital de empleados frente al papel.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">El registro de jornada en papel sigue viéndose en muchas carpetas de oficina. Pero más allá de cumplir la ley, este formato es ineficiente y problemático.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">¿Por qué cambiar el papel por el fichaje digital?</h2>
      <p class="mb-4">Dar el paso de digitalizar los fichajes de tus empleados aporta beneficios directos e inmediatos en la gestión de personal de tu pyme:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Cero pérdidas de hojas:</strong> El papel se ensucia, se rompe, se pierde o se firma con bolígrafos diferentes en el último minuto antes de una inspección. El registro digital queda guardado en la nube de forma segura.</li>
        <li><strong>Cálculo automático de horas extraordinarias:</strong> Olvídate de la calculadora. El sistema cruza las horas teóricas del cuadrante del empleado con los fichajes reales y te da el saldo neto de horas extra al momento.</li>
        <li><strong>Fichajes geolocalizados para teletrabajadores:</strong> Conoce desde dónde inicia la jornada tu equipo de ventas o soporte remoto.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Centraliza el control de presencia</h2>
      <p class="mb-4">El paso al fichaje digital es sencillo. A través de nuestro panel de control puedes centralizar todas las entradas y salidas de la plantilla. Consulta más detalles en la página dedicada de <a href="/fichaje-empleados" class="text-primary hover:underline font-semibold">fichaje de empleados</a>.</p>
    `,
    faqs: [
      { q: "¿El fichaje digital es válido ante la Inspección de Trabajo?", a: "No solo es válido, sino que es el formato recomendado por la Inspección, ya que cumple de forma nativa con los principios de inalterabilidad y fiabilidad de los registros." },
      { q: "¿Qué ocurre si hay un corte de luz o internet?", a: "Los datos se guardan de manera local en el navegador o dispositivo móvil y se envían a la nube automáticamente en cuanto se recupera la conexión." }
    ]
  },
  {
    slug: "gestion-vacaciones-empleados",
    title: "Cómo gestionar vacaciones de empleados sin cadenas eternas de mensajes",
    excerpt: "Di adiós a los líos de cuadrar las ausencias por WhatsApp o emails perdidos. Consejos para organizar los descansos de tu plantilla sin fricciones.",
    category: "Gestión RRHH",
    date: "25 Apr 2026",
    author: "Equipo Fycheo",
    readTime: "4 min",
    imageFilename: "blog-gestion-vacaciones-empleados.webp",
    imagePath: "/public/images/blog/blog-gestion-vacaciones-empleados.webp",
    imageDesc: "Calendario de vacaciones de empleados ordenado en una pantalla.",
    imageAlt: "Gestión de vacaciones de empleados en empresas.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Se acerca el verano o las navidades y empiezan las peticiones de días de descanso: mensajes en hilos de WhatsApp del grupo de trabajo, emails los domingos por la noche y notas adhesivas en la pantalla.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Los peligros de la mala gestión de ausencias</h2>
      <p class="mb-4">Una gestión desorganizada de las vacaciones de tus empleados puede acarrear problemas graves de operatividad para tu empresa:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Solapamientos críticos:</strong> Aprobar días libres a dos personas clave del mismo departamento que dejan el servicio desatendido.</li>
        <li><strong>Errores en los días consumidos:</strong> Llevar la cuenta de días disfrutados de manera manual suele derivar en empleados que disfrutan de más días de los que les corresponden por convenio.</li>
        <li><strong>Falta de planificación de descansos:</strong> Falta de visibilidad de las ausencias futuras de cara a la planificación de los turnos de trabajo.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">La importancia de un calendario único de ausencias</h2>
      <p class="mb-4">Con Fycheo, cada empleado puede ver su saldo de vacaciones disponible y enviar una solicitud con fechas concretas. Los mánagers reciben un aviso y pueden aprobarlas o rechazarlas visualizando de un vistazo quién más falta ese mismo día. Conoce más sobre esta funcionalidad en <a href="/gestion-vacaciones-empleados" class="text-primary hover:underline font-semibold">gestión de vacaciones de empleados</a>.</p>
    `,
    faqs: [
      { q: "¿Se puede limitar el número de personas que pueden irse de vacaciones a la vez?", a: "Sí, a través del calendario de ausencias cruzadas del panel de empresa el manager puede denegar solicitudes si detecta falta de cobertura." },
      { q: "¿El sistema calcula las vacaciones devengadas automáticamente?", a: "Sí, puedes configurar el saldo anual que corresponde a cada trabajador y el sistema computará los días consumidos y pendientes de forma automática." }
    ]
  },
  {
    slug: "kiosko-fichaje-empleados",
    title: "Kiosko de fichaje: cuándo tiene sentido usarlo en tu empresa",
    excerpt: "El modo Kiosko permite a tus trabajadores presenciales fichar la entrada y salida desde un único dispositivo común de forma rápida y segura.",
    category: "Tecnología",
    date: "20 Apr 2026",
    author: "Equipo Fycheo",
    readTime: "5 min",
    imageFilename: "blog-kiosko-fichaje-empleados.webp",
    imagePath: "/public/images/blog/blog-kiosko-fichaje-empleados.webp",
    imageDesc: "Tablet compartida en una entrada de empresa para fichaje de empleados.",
    imageAlt: "Kiosko de fichaje para empleados.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">No todos los empleados de una pyme trabajan sentados delante de un ordenador o llevan un smartphone de empresa en el bolsillo durante su jornada laboral.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">¿Qué es el modo Kiosko y cómo funciona?</h2>
      <p class="mb-4">En comercios locales, cafeterías, almacenes, talleres y centros de producción física, el fichaje por móvil no siempre es cómodo o idóneo. Para estos casos, el modo Kiosko de fichaje es la solución ideal.</p>
      <p class="mb-4">Consiste en colocar una tablet común (ya sea un iPad o dispositivo Android económico) o un portátil en la entrada del centro de trabajo. Los empleados pueden fichar tecleando su DNI, pulsando sobre su nombre o mediante un código QR rápido.</p>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Ventajas operativas de un kiosko de fichaje común</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Menos costes:</strong> No necesitas comprar un terminal de fichaje hardware carísimo. Sirve cualquier tablet económica conectada a internet.</li>
        <li><strong>Fichajes ágiles:</strong> Los trabajadores entran, teclean su DNI y en 2 segundos están fichados. Ideal para cambios de turno con muchos empleados simultáneos.</li>
        <li><strong>Control de presencia físico:</strong> Sabes con seguridad que el fichaje se ha hecho físicamente en las instalaciones de la empresa.</li>
      </ul>
      
      <p class="mb-4">Puedes ampliar la información en nuestra sección dedicada del <a href="/kiosko-fichaje" class="text-primary hover:underline font-semibold">kiosko de fichaje</a>.</p>
    `,
    faqs: [
      { q: "¿Se necesita comprar hardware especial?", a: "No. Puedes usar cualquier tablet o portátil corriente de cualquier marca con conexión a Internet." },
      { q: "¿Cómo se identifica a cada empleado en el kiosko?", a: "El fichaje se realiza introduciendo el DNI del trabajador, que es único para cada persona de la plantilla. Además, el panel de control del mánager registra todas las entradas y salidas de forma auditada." }
    ]
  },
  {
    slug: "informes-jornada-laboral",
    title: "Informes de jornada laboral: qué revisar y cómo tenerlos ordenados",
    excerpt: "Aprende a generar, exportar e interpretar los informes oficiales de fichaje requeridos ante una inspección de trabajo o auditorías laborales.",
    category: "Normativa",
    date: "15 Apr 2026",
    author: "Equipo Fycheo",
    readTime: "4 min",
    imageFilename: "blog-informes-jornada-laboral.webp",
    imagePath: "/public/images/blog/blog-informes-jornada-laboral.webp",
    imageDesc: "Informe de jornada laboral con horas trabajadas, entradas, salidas e incidencias.",
    imageAlt: "Informes de jornada laboral para empresas.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">El principal motivo por el que las empresas implementan el control horario no es vigilar a la plantilla, sino disponer de los informes obligatorios ante la Inspección de Trabajo.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Requisitos que debe cumplir un informe oficial de jornada</h2>
      <p class="mb-4">Si un inspector acude a tus instalaciones, te exigirá los informes mensuales de fichajes de forma inmediata. Para cumplir la normativa, estos reportes deben reflejar claramente:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Identificación de la empresa y del trabajador:</strong> Nombre, NIF/CIF, centro de trabajo y convenio.</li>
        <li><strong>Detalle diario:</strong> Día a día, indicando la hora exacta de entrada, salida y el desglose de pausas o descansos no computables.</li>
        <li><strong>Total de horas netas:</strong> Suma de las horas trabajadas en el mes natural, distinguiendo las horas ordinarias de las horas extraordinarias o complementarias.</li>
        <li><strong>Firma o validez de auditoría:</strong> Trazabilidad digital que demuestre que el registro no ha sido alterado a conveniencia.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Exportación limpia en un clic</h2>
      <p class="mb-4">Con Fycheo, los datos diarios de fichajes se organizan y formatean de manera automática para cumplir con el formato oficial estándar. Puedes descargar los reportes de toda la plantilla en Excel o PDF al instante. Conoce todos los detalles en <a href="/informes-jornada-laboral" class="text-primary hover:underline font-semibold">informes de jornada laboral</a>.</p>
    `,
    faqs: [
      { q: "¿Es obligatorio que el empleado firme el informe en papel cada mes?", a: "No. Si usas un sistema digital fiable que garantice la identidad de cada fichaje mediante usuario y contraseña, la firma en papel no es obligatoria." },
      { q: "¿Qué ocurre si no puedo entregar los informes en el momento de la visita del inspector?", a: "Se considera una infracción grave por obstrucción de la labor inspectora. Contar con un software en la nube evita este problema." }
    ]
  },
  {
    slug: "software-control-horario-pymes",
    title: "Qué debe tener un software de control horario para pymes",
    excerpt: "Los requisitos indispensables en una herramienta digital de fichajes para pequeñas empresas: sencillez, precio claro y soporte en español.",
    category: "Tecnología",
    date: "10 Apr 2026",
    author: "Equipo Fycheo",
    readTime: "5 min",
    imageFilename: "blog-software-control-horario-pymes.webp",
    imagePath: "/public/images/blog/blog-software-control-horario-pymes.webp",
    imageDesc: "Pyme gestionando fichajes y empleados desde un software sencillo.",
    imageAlt: "Software de control horario para pymes.",
    content: `
      <p class="mb-6 font-semibold text-lg text-white leading-relaxed">Muchas soluciones de recursos humanos del mercado están diseñadas para multinacionales con miles de empleados, resultando complejas e inaccesibles para una pequeña empresa.</p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Características esenciales para el control horario en pymes</h2>
      <p class="mb-4">Si diriges una pyme o eres responsable de su gestión laboral, prioriza estas características al elegir tu software de fichajes:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2 text-slate-300">
        <li><strong>Fácil de usar para la plantilla:</strong> Si la herramienta requiere manuales de instrucciones de 50 páginas, los empleados olvidarán fichar a diario y se multiplicarán los errores.</li>
        <li><strong>Sin permanencia y precios transparentes:</strong> Evita los contratos de permanencia abusivos y las comisiones ocultas por configuración inicial.</li>
        <li><strong>Soporte al cliente humano y en español:</strong> Muy útil si tienes dudas sobre la configuración inicial o necesitas ayuda para exportar los informes.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Fycheo: pensado por y para pymes</h2>
      <p class="mb-4">Nuestra misión es poner a disposición de los pequeños negocios las mejores herramientas de gestión horaria sin complicaciones. Puedes revisar nuestros precios transparentes en la sección de <a href="/precios" class="text-primary hover:underline font-semibold">precios de control horario</a> y probar la solución gratis durante 14 días.</p>
    `,
    faqs: [
      { q: "¿Hay un número mínimo de empleados para contratar Fycheo?", a: "No. Nos adaptamos a pymes de cualquier tamaño, desde trabajadores autónomos con un empleado contratado hasta plantillas medianas de 100 personas." },
      { q: "¿Incluye actualizaciones de ley gratuitas?", a: "Sí. Toda modificación de la normativa española en materia de control horario se integra en la plataforma sin ningún coste adicional para tu cuenta." }
    ]
  }
];
