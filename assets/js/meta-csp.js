// Script para adicionar Content-Security-Policy programaticamente
document.addEventListener('DOMContentLoaded', function() {
  // Remove a meta tag CSP existente para substituí-la
  const existingCspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (existingCspMeta) {
    existingCspMeta.remove();
  }
  
  // Cria uma nova meta tag CSP com as configurações corretas
  const metaTag = document.createElement('meta');
  metaTag.setAttribute('http-equiv', 'Content-Security-Policy');
  
  // Define uma política CSP que permite:
  // - Estilos inline e de fontes externas
  // - Scripts inline e do mesmo domínio
  // - Fontes do Google
  // - Imagens do mesmo domínio e GitHub
  // - Conexões com APIs externas necessárias
  metaTag.setAttribute('content', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' https://raw.githubusercontent.com data:; " +
    "connect-src 'self' https://nominatim.openstreetmap.org https://discord.com https://api.whatsapp.com"
  );
  
  // Adiciona a nova meta tag ao head
  document.head.prepend(metaTag);
}); 