export const Privacy = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-300 bg-background-dark min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidad</h1>
      <div className="space-y-6 prose prose-invert max-w-none text-sm leading-relaxed">
        <p>Última actualización: Junio 2026</p>
        
        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Responsable del Tratamiento</h3>
        <p>Los datos de carácter personal que se recaben directamente del usuario serán tratados de forma confidencial y quedarán incorporados a la actividad de tratamiento de la que es responsable:</p>
        <ul className="list-none pl-0 space-y-2 text-slate-400">
          <li><strong>Razón Social:</strong> [PENDIENTE: razón social]</li>
          <li><strong>NIF/CIF:</strong> [PENDIENTE: NIF/CIF]</li>
          <li><strong>Domicilio Fiscal:</strong> [PENDIENTE: domicilio fiscal]</li>
          <li><strong>Email de Contacto:</strong> [PENDIENTE: email de contacto]</li>
          <li><strong>Responsable del Tratamiento:</strong> [PENDIENTE: responsable del tratamiento]</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Finalidad del Tratamiento</h3>
        <p>Tratamos tus datos personales para las siguientes finalidades:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li>Gestionar tu registro de usuario, el alta de la empresa en la plataforma y la configuración de tus credenciales de acceso.</li>
          <li>Prestar el servicio SaaS de control horario, fichajes de empleados, vacaciones y ausencias solicitado.</li>
          <li>Atender las solicitudes de información, dudas o comentarios que realices a través de nuestro soporte técnico en español.</li>
          <li>Cumplir con las obligaciones legales aplicables en materia tributaria, mercantil y laboral.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Legitimación del Tratamiento</h3>
        <p>La base legal para el tratamiento de tus datos es la ejecución del contrato de prestación de servicios (términos de uso) y el consentimiento explícito otorgado al crear una cuenta o enviar consultas.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Destinatarios de los Datos</h3>
        <p>No cederemos tus datos a terceros, salvo obligación legal expresa o a proveedores tecnológicos necesarios para la prestación del servicio SaaS (hosting, pasarela de pago Stripe, base de datos encriptada) bajo estrictos contratos de confidencialidad.</p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">5. Tus Derechos</h3>
        <p>Puedes acceder, rectificar, limitar y suprimir tus datos de carácter personal en cualquier momento, así como retirar tu consentimiento o formular una queja ante la Agencia Española de Protección de Datos (AEPD). Para ejercer tus derechos, puedes ponerte en contacto con nosotros en el email de contacto facilitado en el apartado 1.</p>
      </div>
    </div>
  );
};
