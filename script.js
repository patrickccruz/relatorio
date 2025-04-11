/**
 * Sistema de Registro de Chamados Técnicos
 * 
 * Este script gerencia o formulário de registro de chamados técnicos,
 * incluindo validação de dados, cálculos automáticos, busca de endereços
 * e envio de relatórios.
 * 
 * Versão: 1.0.0
 * Última atualização: 2023
 */

// Verificar ambiente (desenvolvimento ou produção)
if (typeof process === 'undefined') {
  window.process = { env: { NODE_ENV: 'production' } };
}

// Função para obter a URL do webhook de forma segura
function getWebhookUrl() {
  // Em produção, isso poderia ser carregado de:
  // 1. Uma variável de ambiente via servidor
  // 2. Um arquivo de configuração carregado pelo servidor
  // 3. Uma API segura que retorna a configuração após autenticação
  
  // Para este exemplo, usamos uma abordagem simples com localStorage
  // Em produção, deve-se usar um método mais seguro conforme mencionado acima
  let webhookUrl = localStorage.getItem('discord_webhook_url');
  
  // Se não estiver configurado, use a URL padrão (somente desenvolvimento)
  if (!webhookUrl && process.env.NODE_ENV !== 'production') {
    // URL padrão para desenvolvimento - NÃO USE EM PRODUÇÃO
    return 'https://discord.com/api/webhooks/1360296356144480266/FoS8X0j3cRQVknl5qJoxiFr4e6OojnQ7XhyscYwDAZFufyx1UYb7t216LKkR8ocpWaZm';
  }
  
  return webhookUrl;
}

// Função para enviar para o webhook do Discord
async function sendToDiscord(content) {
  try {
    // Configuração do webhook - em ambiente de produção, isso deve ser configurado via variáveis de ambiente ou servidor
    const webhookUrl = getWebhookUrl(); // Função que retorna a URL do webhook de forma segura
    
    if (!webhookUrl) {
      throw new Error("Configuração do webhook não encontrada");
    }

    // Extrair os dados diretamente dos campos do formulário
    const dados = {
      dataChamado: document.getElementById("dataChamado").value || 'Não informado',
      numeroChamado: document.getElementById("numeroChamado").value || 'Não informado',
      tipoChamado: document.getElementById("tipoChamado").value || 'Não informado',
      cliente: document.getElementById("cliente").value || 'Não informado',
      quantidadePatrimonios: document.getElementById("quantidadePatrimonios").value || 'Não informado',
      kmInicial: document.getElementById("kmInicial").value || 'Não informado',
      kmFinal: document.getElementById("kmFinal").value || 'Não informado',
      kmTotal: document.getElementById("kmTotal").value || 'Não informado',
      horaChegada: document.getElementById("horaChegada").value || 'Não informado',
      horaSaida: document.getElementById("horaSaida").value || 'Não informado',
      tempoTotal: document.getElementById("tempoTotal").value || 'Não informado',
      enderecoPartida: document.getElementById("enderecoPartida").value || 'Não informado',
      enderecoChegada: document.getElementById("enderecoChegada").value || 'Não informado',
      descricaoChamado: document.getElementById("descricaoChamado").value || 'Sem descrição',
      nomeInformante: document.getElementById("nomeInformante").value || 'Não informado',
      statusChamado: document.getElementById("statusChamado").value || 'Não informado'
    };

    // Criar o embed com os dados formatados
    const embed = {
      title: "📋 Novo Chamado Registrado",
      color: 0x00ff00, // Cor verde
      fields: [
        {
          name: "📅 Data e Número",
          value: `Data: ${dados.dataChamado}\nNº: ${dados.numeroChamado}`,
          inline: true
        },
        {
          name: "📋 Tipo e Status",
          value: `Tipo: ${dados.tipoChamado}\nStatus: ${dados.statusChamado}`,
          inline: true
        },
        {
          name: "👥 Cliente",
          value: dados.cliente,
          inline: true
        },
        {
          name: "🔧 Patrimônios",
          value: dados.quantidadePatrimonios,
          inline: true
        },
        {
          name: "🚗 Quilometragem",
          value: `Inicial: ${dados.kmInicial}\nFinal: ${dados.kmFinal}\nTotal: ${dados.kmTotal}`,
          inline: true
        },
        {
          name: "⏰ Horários",
          value: `Chegada: ${dados.horaChegada}\nSaída: ${dados.horaSaida}\nTempo Total: ${dados.tempoTotal}`,
          inline: true
        },
        {
          name: "📍 Endereço de Partida",
          value: dados.enderecoPartida,
          inline: false
        },
        {
          name: "📍 Endereço de Chegada",
          value: dados.enderecoChegada,
          inline: false
        },
        {
          name: "📝 Descrição do Chamado",
          value: dados.descricaoChamado,
          inline: false
        },
        {
          name: "👤 Informante",
          value: dados.nomeInformante,
          inline: true
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Sistema de Registro de Chamados • Hoje às " + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})
      }
    };

    // Criar o texto formatado para cópia fácil
    const textoFormatado = "\`\`\`" + 
      `=== INFORMAÇÕES BÁSICAS ===\n` +
      `Data do chamado: ${dados.dataChamado}\n` +
      `Nº do chamado: ${dados.numeroChamado}\n` +
      `Tipo de chamado: ${dados.tipoChamado}\n` +
      `Cliente: ${dados.cliente}\n` +
      `Informante: ${dados.nomeInformante}\n\n` +
      
      `=== DETALHES DO SERVIÇO ===\n` +
      `Quantidade de patrimônios: ${dados.quantidadePatrimonios}\n` +
      `Status: ${dados.statusChamado}\n` +
      `Descrição: ${dados.descricaoChamado}\n\n` +
      
      `=== DESLOCAMENTO ===\n` +
      `KM inicial: ${dados.kmInicial}\n` +
      `KM final: ${dados.kmFinal}\n` +
      `KM total percorrido: ${dados.kmTotal}\n` +
      `Endereço de partida: ${dados.enderecoPartida}\n` +
      `Endereço de chegada: ${dados.enderecoChegada}\n\n` +
      
      `=== TEMPO DE ATENDIMENTO ===\n` +
      `Horário de chegada: ${dados.horaChegada}\n` +
      `Horário de saída: ${dados.horaSaida}\n` +
      `Tempo total de atendimento: ${dados.tempoTotal}\n` +
      "\`\`\`";

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: "**Copie os dados abaixo:**\n" + textoFormatado,
        embeds: [embed],
        username: 'Relatório de Chamado',
        avatar_url: 'https://raw.githubusercontent.com/PatrickCP/assets/main/icon.png',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao enviar para o Discord: ${response.status}`);
    }

    // Se a resposta for 204 (No Content) ou estiver vazia, consideramos sucesso
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return true;
    }

    // Tenta fazer o parse do JSON apenas se houver conteúdo
    const responseText = await response.text();
    if (responseText) {
      try {
        const responseData = JSON.parse(responseText);
        return responseData;
      } catch (jsonError) {
        return true;
      }
    }

    return true;
  } catch (error) {
    throw new Error(`Falha no envio: ${error.message}`);
  }
}

// Função para inicializar o autocomplete de endereços usando Nominatim (OpenStreetMap)
function initAutocomplete() {
  try {
    // Elementos dos inputs de endereço
    const inputPartida = document.getElementById('enderecoPartida');
    const inputChegada = document.getElementById('enderecoChegada');
    
    if (!inputPartida || !inputChegada) {
      throw new Error("Elementos de input não encontrados");
    }
    
    // Lista de sugestões para endereços
    const sugestoesPartida = document.createElement('div');
    sugestoesPartida.className = 'sugestoes-endereco';
    const sugestoesChegada = document.createElement('div');
    sugestoesChegada.className = 'sugestoes-endereco';
    
    // Inserir as listas após os inputs
    inputPartida.parentNode.appendChild(sugestoesPartida);
    inputChegada.parentNode.appendChild(sugestoesChegada);
    
    // Função para extrair o número do endereço que o usuário digitou
    function extrairNumero(texto) {
      // Busca por padrões como "Rua ABC, 123" ou "123, Rua ABC"
      const padroesNumero = [
        /\b(\d+)\b\s*,/,    // Número seguido de vírgula
        /,\s*\b(\d+)\b/,    // Vírgula seguida de número
        /\bn[°º.]?\s*(\d+)\b/i, // Abreviação de número (n., nº, etc)
        /\bnumero\s*(\d+)\b/i,  // Palavra "numero" seguida de dígitos
        /\b(\d+)\b/         // Qualquer número no texto
      ];
      
      for (const padrao of padroesNumero) {
        const match = texto.match(padrao);
        if (match && match[1]) {
          return match[1];
        }
      }
      
      return null;
    }
    
    // Função para simplificar o endereço retornado pela API
    function simplificarEndereco(enderecoCompleto) {
      // Divide o endereço por vírgulas
      const partes = enderecoCompleto.split(',').map(parte => parte.trim());
      
      // Se tivermos menos de 3 partes, retornamos o endereço original
      if (partes.length < 3) return enderecoCompleto;
      
      // Arrays para armazenar as partes identificadas do endereço
      let rua = partes[0]; // A primeira parte normalmente é a rua
      let numero = '';
      let bairro = '';
      let cidade = '';
      let estado = '';
      let cep = '';
      
      // Set para controlar duplicações
      const partesUsadas = new Set();
      partesUsadas.add(0); // Já usamos a primeira parte (rua)
      
      // Verifica se a rua já contém um número
      const numeroNaRua = rua.match(/\b(\d+)\b/);
      if (numeroNaRua) {
        numero = numeroNaRua[1];
      }
      
      // Procura por CEP (Brasil formato: 00000-000 ou 00000000)
      const cepRegex = /\b\d{5}-?\d{3}\b/;
      for (let i = 0; i < partes.length; i++) {
        const cepMatch = partes[i].match(cepRegex);
        if (cepMatch) {
          cep = cepMatch[0];
          partesUsadas.add(i);
          break;
        }
      }
      
      // Procura por sigla de estado (UF com 2 letras maiúsculas)
      const estadoRegex = /\b[A-Z]{2}\b/;
      for (let i = 0; i < partes.length; i++) {
        if (!partesUsadas.has(i)) {
          const estadoMatch = partes[i].match(estadoRegex);
          if (estadoMatch) {
            estado = estadoMatch[0];
            partesUsadas.add(i);
            
            // Se o estado é a única coisa nesta parte, pode ser que a cidade esteja antes
            if (partes[i].trim() === estado && i > 0 && !partesUsadas.has(i-1)) {
              cidade = partes[i-1];
              partesUsadas.add(i-1);
            }
            break;
          }
        }
      }
      
      // Se não achou o estado pelo regex, tenta identificar pelos nomes comuns de estados brasileiros
      if (!estado) {
        const estadosBR = [
          'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 
          'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 
          'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 
          'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
          'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 
          'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
        ];
        
        for (let i = 0; i < partes.length; i++) {
          if (!partesUsadas.has(i)) {
            if (estadosBR.includes(partes[i])) {
              estado = partes[i];
              partesUsadas.add(i);
              break;
            }
          }
        }
      }
      
      // Identifica a cidade - normalmente vem antes do estado
      if (!cidade) {
        // Lista de cidades grandes para facilitar a identificação
        const cidadesComuns = [
          'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 
          'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre',
          'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís', 'Maceió',
          'Duque de Caxias', 'Natal', 'Campo Grande', 'Teresina',
          // Adicionar mais cidades de Minas Gerais
          'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros',
          'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga',
          'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas',
          'Patos de Minas', 'Pouso Alegre', 'Teófilo Otoni', 'Barbacena', 'Sabará',
          'Varginha', 'Conselheiro Lafaiete', 'Itabira', 'Araguari', 'Ubá',
          'Nova Lima', 'Coronel Fabriciano', 'Muriaé', 'Araxá', 'Lavras',
          'Nova Serrana', 'Passos', 'Itajubá', 'Ituiutaba', 'São João del Rei',
          'Itaúna', 'Caratinga', 'Patrocínio', 'Timóteo', 'Paracatu',
          'Três Corações', 'Viçosa', 'Cataguases', 'São Sebastião do Paraíso',
          'Leopoldina', 'Formiga'
        ];
        
        // Primeiro procura por cidades conhecidas
        for (let i = 0; i < partes.length; i++) {
          if (!partesUsadas.has(i)) {
            // Verifica se alguma cidade conhecida está contida na parte, ou vice-versa
            const parte = partes[i];
            const cidadeEncontrada = cidadesComuns.find(cidade => 
              parte.includes(cidade) || 
              parte.toLowerCase().includes(cidade.toLowerCase()) ||
              cidade.includes(parte) || 
              cidade.toLowerCase().includes(parte.toLowerCase())
            );
            
            if (cidadeEncontrada) {
              cidade = cidadeEncontrada; // Usa o nome correto da cidade da lista
              partesUsadas.add(i);
              break;
            }
          }
        }
        
        // Se não achou uma cidade conhecida, considera a parte antes do estado ou do CEP
        if (!cidade) {
          // Identifica onde está o estado ou o CEP
          let posCidadeProvavel = -1;
          
          // Se temos estado, a cidade provavelmente está antes
          for (let i = 0; i < partes.length; i++) {
            if (partes[i].includes(estado) && i > 0) {
              posCidadeProvavel = i - 1;
              break;
            }
          }
          
          // Se não identificamos pela posição do estado, tenta pelo CEP
          if (posCidadeProvavel === -1 && cep) {
            for (let i = 0; i < partes.length; i++) {
              if (partes[i].includes(cep) && i > 0) {
                posCidadeProvavel = i - 1;
                break;
              }
            }
          }
          
          // Se ainda não identificamos, consideramos que a cidade é a 3ª parte
          if (posCidadeProvavel === -1 && partes.length > 2) {
            posCidadeProvavel = 2;
          }
          
          // Se encontramos uma posição provável para a cidade
          if (posCidadeProvavel >= 0 && !partesUsadas.has(posCidadeProvavel)) {
            cidade = partes[posCidadeProvavel];
            partesUsadas.add(posCidadeProvavel);
          }
        }
      }
      
      // Identifica o bairro (normalmente é a segunda parte, após a rua)
      if (!bairro) {
        for (let i = 1; i < partes.length; i++) {
          if (!partesUsadas.has(i) && 
              partes[i] !== cidade && 
              partes[i] !== estado && 
              !partes[i].includes(cep)) {
            bairro = partes[i];
            partesUsadas.add(i);
            break;
          }
        }
      }
      
      // Remove duplicações (como bairro que se repete ou está contido na cidade)
      if (bairro && cidade && (bairro === cidade || cidade.includes(bairro))) {
        bairro = '';
      }
      
      // Constrói o endereço simplificado
      let resultado = rua;
      if (bairro) resultado += `, ${bairro}`;
      if (cidade) resultado += `, ${cidade}`;
      if (estado) resultado += ` - ${estado}`;
      if (cep) resultado += `, ${cep}`;
      
      // Aplica função para remover duplicações
      resultado = removerDuplicacoes(resultado);
      
      // Garantir que o estado seja exibido com o formato correto
      if (estado && !resultado.includes(` - ${estado}`)) {
        // Se o estado existe, mas não está formatado corretamente no resultado após remoção de duplicações
        const posUltimaVirgula = resultado.lastIndexOf(',');
        if (posUltimaVirgula !== -1) {
          // Insere o estado após a última vírgula
          resultado = resultado.substring(0, posUltimaVirgula) + 
                      `, ${cidade || ''} - ${estado}` + 
                      resultado.substring(posUltimaVirgula);
        } else {
          // Se não houver vírgula, adiciona no final
          resultado += ` - ${estado}`;
        }
      }
      
      return resultado;
    }
    
    // Função para buscar endereços na API Nominatim
    async function buscarEnderecos(query, listaSugestoes, input) {
      if (query.length < 3) {
        listaSugestoes.style.display = 'none';
        return;
      }
      
      // Extrair possível número digitado pelo usuário
      const numeroDigitado = extrairNumero(query);
      
      try {
        // Limitar requisições à API (1 por segundo) - importante para evitar bloqueios
        if (window.ultimaRequisicaoNominatim && 
            (Date.now() - window.ultimaRequisicaoNominatim) < 1000) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        window.ultimaRequisicaoNominatim = Date.now();
        
        // Adicionar país para melhorar os resultados e performance
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=br&limit=5`;
        
        // Adicionar User-Agent conforme solicitado pela API Nominatim
        const headers = new Headers({
          'User-Agent': 'Sistema-Chamados-Tecnicos/1.0'
        });
        
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
        
        listaSugestoes.innerHTML = '';
        
        if (data.length > 0) {
          listaSugestoes.style.display = 'block';
          
          data.forEach(lugar => {
            const item = document.createElement('div');
            item.className = 'sugestao-item';
            
            // Simplificar o endereço retornado pela API
            let textoEndereco = simplificarEndereco(lugar.display_name);
            
            // Adicionar explicitamente o número ao endereço (prioridade máxima)
            if (numeroDigitado) {
              // Verificar se o número já está no endereço simplificado
              if (!textoEndereco.includes(' ' + numeroDigitado + ',') && 
                  !textoEndereco.includes(' ' + numeroDigitado + ' ') && 
                  !textoEndereco.includes(',' + numeroDigitado + ' ')) {
                
                // Se o endereço começa com um nome de rua, adicionar o número após ele
                const partes = textoEndereco.split(',');
                if (partes.length > 0) {
                  if (partes[0].match(/^(R\.|Rua|Av\.|Avenida|Al\.|Alameda|Praça|Travessa)/i)) {
                    partes[0] = `${partes[0]}, ${numeroDigitado}`;
                    textoEndereco = partes.join(',');
                  } else {
                    // Se não identificamos claramente uma rua, adicionamos no início
                    textoEndereco = `${partes[0]} ${numeroDigitado}, ` + partes.slice(1).join(',');
                  }
                }
              }
            }
            
            item.textContent = textoEndereco;
            item.setAttribute('data-original', lugar.display_name);
            item.setAttribute('data-numero', numeroDigitado || '');
            
            item.addEventListener('click', () => {
              // Usa o endereço simplificado que inclui o número
              input.value = textoEndereco;
              listaSugestoes.style.display = 'none';
              infoGeral();
            });
            
            listaSugestoes.appendChild(item);
          });
        } else {
          listaSugestoes.style.display = 'none';
        }
      } catch (error) {
        // Silencia o erro para o usuário, mas registra para monitoramento
        listaSugestoes.style.display = 'none';
        
        // Em produção, aqui poderia enviar o erro para um sistema de monitoramento
        if (process.env.NODE_ENV !== 'production') {
          console.error('Erro ao buscar endereços:', error);
        }
      }
    }
    
    // Adicionar eventos de input para busca
    let timeoutPartida, timeoutChegada;
    
    inputPartida.addEventListener('input', () => {
      clearTimeout(timeoutPartida);
      timeoutPartida = setTimeout(() => {
        buscarEnderecos(inputPartida.value, sugestoesPartida, inputPartida);
      }, 500); // Atraso para não sobrecarregar a API
    });
    
    inputChegada.addEventListener('input', () => {
      clearTimeout(timeoutChegada);
      timeoutChegada = setTimeout(() => {
        buscarEnderecos(inputChegada.value, sugestoesChegada, inputChegada);
      }, 500); // Atraso para não sobrecarregar a API
    });
    
    // Esconder sugestões ao clicar fora
    document.addEventListener('click', (e) => {
      if (!inputPartida.contains(e.target) && !sugestoesPartida.contains(e.target)) {
        sugestoesPartida.style.display = 'none';
      }
      
      if (!inputChegada.contains(e.target) && !sugestoesChegada.contains(e.target)) {
        sugestoesChegada.style.display = 'none';
      }
    });
    
    // Prevenir envio do formulário ao pressionar Enter nos campos de endereço
    inputPartida.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });
    
    inputChegada.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });
  } catch (error) {
    // Em produção, silenciar erros para o usuário e registrar para monitoramento
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro ao inicializar autocomplete:', error);
    }
  }
}

// Função para definir a data atual no campo de data
function definirDataAtual() {
  try {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const dia = String(hoje.getDate()).padStart(2, '0');
    
    const dataFormatada = `${ano}-${mes}-${dia}`;
    const campoData = document.getElementById('dataChamado');
    
    if (campoData) {
      campoData.value = dataFormatada;
      
      // Atualizar barra de progresso e informações
      infoGeral();
    }
  } catch (error) {
    // Silencia o erro para o usuário em produção
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro ao definir data atual:', error);
    }
  }
}

// Função para calcular o km total percorrido
function calcularKmTotal() {
  try {
    const kmInicial = parseFloat(document.getElementById("kmInicial").value) || 0;
    const kmFinal = parseFloat(document.getElementById("kmFinal").value) || 0;
    const campoKmTotal = document.getElementById("kmTotal");
    
    if (!campoKmTotal) {
      return;
    }
    
    if (kmInicial > 0 && kmFinal > 0) {
      if (kmFinal >= kmInicial) {
        const kmTotal = kmFinal - kmInicial;
        campoKmTotal.value = kmTotal + " km";
      } else {
        campoKmTotal.value = "Erro: KM final menor que inicial";
        mostrarToast("KM final não pode ser menor que o KM inicial", "warning");
      }
    } else {
      campoKmTotal.value = "";
    }
    
    atualizarBarraProgresso();
  } catch (error) {
    // Silencia erros em produção
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro ao calcular KM total:', error);
    }
  }
}

// Função para calcular o tempo total de atendimento
function calcularTempoAtendimento() {
  try {
    const horaChegada = document.getElementById("horaChegada").value;
    const horaSaida = document.getElementById("horaSaida").value;
    const campoTempoTotal = document.getElementById("tempoTotal");
    
    if (!campoTempoTotal) {
      return;
    }
    
    if (horaChegada && horaSaida) {
      const [horaChegadaHora, horaChegadaMinuto] = horaChegada.split(':').map(Number);
      const [horaSaidaHora, horaSaidaMinuto] = horaSaida.split(':').map(Number);
      
      // Validar que as horas estão corretas
      if (isNaN(horaChegadaHora) || isNaN(horaChegadaMinuto) || 
          isNaN(horaSaidaHora) || isNaN(horaSaidaMinuto)) {
        campoTempoTotal.value = "Erro no formato de hora";
        return;
      }
      
      // Converter para minutos
      const chegadaEmMinutos = horaChegadaHora * 60 + horaChegadaMinuto;
      const saidaEmMinutos = horaSaidaHora * 60 + horaSaidaMinuto;
      
      // Calcular a diferença
      let diferencaMinutos = saidaEmMinutos - chegadaEmMinutos;
      
      // Se for um resultado negativo, assumimos que passou para o próximo dia
      if (diferencaMinutos < 0) {
        diferencaMinutos += 24 * 60; // Adiciona 24 horas em minutos
      }
      
      // Converter de volta para horas e minutos
      const horas = Math.floor(diferencaMinutos / 60);
      const minutos = diferencaMinutos % 60;
      
      campoTempoTotal.value = `${horas}h ${minutos}min`;
    } else {
      campoTempoTotal.value = "";
    }
    
    atualizarBarraProgresso();
  } catch (error) {
    // Silencia erros em produção
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro ao calcular o tempo de atendimento:', error);
    }
  }
}

// Função para atualizar a barra de progresso
function atualizarBarraProgresso() {
  try {
    const campos = [
      "dataChamado", "numeroChamado", "tipoChamado", "cliente", "nomeInformante",
      "quantidadePatrimonios", "kmInicial", "kmFinal", "horaChegada", "horaSaida", 
      "enderecoPartida", "enderecoChegada", "descricaoChamado", "statusChamado"
    ];
    
    let camposPreenchidos = 0;
    let totalCampos = 0;
    
    campos.forEach(campo => {
      const elemento = document.getElementById(campo);
      if (elemento) {
        totalCampos++;
        if (elemento.value !== "" && elemento.value !== null) {
          camposPreenchidos++;
        }
      }
    });
    
    if (totalCampos === 0) return; // Evita divisão por zero
    
    const percentual = Math.round((camposPreenchidos / totalCampos) * 100);
    
    const barraProgresso = document.getElementById("formProgress");
    const barraProgressoMobile = document.getElementById("formProgressMobile");
    const textoProgresso = document.getElementById("progressText");
    
    if (barraProgresso) {
      barraProgresso.style.width = percentual + "%";
      barraProgresso.setAttribute("aria-valuenow", percentual);
    }
    
    if (barraProgressoMobile) {
      barraProgressoMobile.style.width = percentual + "%";
      barraProgressoMobile.setAttribute("aria-valuenow", percentual);
    }
    
    if (textoProgresso) {
      textoProgresso.textContent = percentual + "% Preenchido";
    }
    
    // Mudar a cor da barra de progresso conforme o percentual
    if (barraProgresso && barraProgressoMobile) {
      if (percentual < 30) {
        barraProgresso.classList.remove("bg-warning", "bg-success");
        barraProgresso.classList.add("bg-danger");
        barraProgressoMobile.classList.remove("bg-warning", "bg-success");
        barraProgressoMobile.classList.add("bg-danger");
      } else if (percentual < 70) {
        barraProgresso.classList.remove("bg-danger", "bg-success");
        barraProgresso.classList.add("bg-warning");
        barraProgressoMobile.classList.remove("bg-danger", "bg-success");
        barraProgressoMobile.classList.add("bg-warning");
      } else {
        barraProgresso.classList.remove("bg-danger", "bg-warning");
        barraProgresso.classList.add("bg-success");
        barraProgressoMobile.classList.remove("bg-danger", "bg-warning");
        barraProgressoMobile.classList.add("bg-success");
      }
    }
  } catch (error) {
    // Silencia erros em produção
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro ao atualizar barra de progresso:', error);
    }
  }
}

// Função para exibir toast de notificação
function mostrarToast(mensagem, tipo = 'success') {
  const toast = document.getElementById('toastAlert');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = mensagem;
  
  // Configurar cor do toast
  toast.classList.remove('bg-success', 'bg-danger', 'bg-warning');
  if (tipo === 'success') {
    toast.classList.add('bg-success');
  } else if (tipo === 'error') {
    toast.classList.add('bg-danger');
  } else if (tipo === 'warning') {
    toast.classList.add('bg-warning');
  }
  
  const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
  bsToast.show();
}

// Função para remover duplicações no endereço final
function removerDuplicacoes(endereco) {
  // Divide o endereço por vírgulas
  const partes = endereco.split(',').map(parte => parte.trim());
  const partesUnicas = [];
  const partesVistas = new Set();
  
  for (const parte of partes) {
    // Normaliza para comparação (minúsculas, sem acentos)
    const parteNormalizada = parte.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    // Verifica se é uma duplicação exata ou está dentro de outra parte
    let isDuplicado = false;
    
    if (partesVistas.has(parteNormalizada)) {
      isDuplicado = true;
    } else {
      // Verifica se essa parte está contida em alguma parte já vista
      for (const vista of partesVistas) {
        if (vista.includes(parteNormalizada) || parteNormalizada.includes(vista)) {
          isDuplicado = true;
          break;
        }
      }
    }
    
    if (!isDuplicado) {
      partesUnicas.push(parte);
      partesVistas.add(parteNormalizada);
    }
  }
  
  return partesUnicas.join(', ');
}

// Função para salvar dados do formulário
function salvarDadosFormulario() {
  const formData = {
    dataChamado: document.getElementById("dataChamado").value,
    numeroChamado: document.getElementById("numeroChamado").value,
    tipoChamado: document.getElementById("tipoChamado").value,
    cliente: document.getElementById("cliente").value,
    quantidadePatrimonios: document.getElementById("quantidadePatrimonios").value,
    kmInicial: document.getElementById("kmInicial").value,
    kmFinal: document.getElementById("kmFinal").value,
    horaChegada: document.getElementById("horaChegada").value,
    horaSaida: document.getElementById("horaSaida").value,
    enderecoPartida: document.getElementById("enderecoPartida").value,
    enderecoChegada: document.getElementById("enderecoChegada").value,
    descricaoChamado: document.getElementById("descricaoChamado").value,
    nomeInformante: document.getElementById("nomeInformante").value,
    statusChamado: document.getElementById("statusChamado").value
  };
  localStorage.setItem("formData", JSON.stringify(formData));
}

// Função para carregar dados do formulário
function carregarDadosFormulario() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    document.getElementById("dataChamado").value = formData.dataChamado || "";
    document.getElementById("numeroChamado").value = formData.numeroChamado || "";
    document.getElementById("tipoChamado").value = formData.tipoChamado || "";
    document.getElementById("cliente").value = formData.cliente || "";
    document.getElementById("quantidadePatrimonios").value = formData.quantidadePatrimonios || "";
    document.getElementById("kmInicial").value = formData.kmInicial || "";
    document.getElementById("kmFinal").value = formData.kmFinal || "";
    document.getElementById("horaChegada").value = formData.horaChegada || "";
    document.getElementById("horaSaida").value = formData.horaSaida || "";
    document.getElementById("enderecoPartida").value = formData.enderecoPartida || "";
    document.getElementById("enderecoChegada").value = formData.enderecoChegada || "";
    document.getElementById("descricaoChamado").value = formData.descricaoChamado || "";
    document.getElementById("nomeInformante").value = formData.nomeInformante || "";
    document.getElementById("statusChamado").value = formData.statusChamado || "";
    
    // Atualizar cálculos após carregar os dados
    calcularKmTotal();
    calcularTempoAtendimento();
    atualizarBarraProgresso();
  } else {
    // Se não houver dados salvos, definir a data atual
    definirDataAtual();
  }
}

// Função para coletar informações gerais
function infoGeral() {
  salvarDadosFormulario();

  const dataChamado = document.getElementById("dataChamado").value;
  const numeroChamado = document.getElementById("numeroChamado").value;
  const tipoChamado = document.getElementById("tipoChamado").value;
  const cliente = document.getElementById("cliente").value;
  const quantidadePatrimonios = document.getElementById("quantidadePatrimonios").value;
  const kmInicial = document.getElementById("kmInicial").value;
  const kmFinal = document.getElementById("kmFinal").value;
  const kmTotal = document.getElementById("kmTotal").value;
  const horaChegada = document.getElementById("horaChegada").value;
  const horaSaida = document.getElementById("horaSaida").value;
  const tempoTotal = document.getElementById("tempoTotal").value;
  const enderecoPartida = document.getElementById("enderecoPartida").value;
  const enderecoChegada = document.getElementById("enderecoChegada").value;
  const descricaoChamado = document.getElementById("descricaoChamado").value;
  const nomeInformante = document.getElementById("nomeInformante").value;
  const statusChamado = document.getElementById("statusChamado").value;

  // Gerar texto formatado
  const textoCompleto = 
    `📅 *Data do chamado:* ${dataChamado}\n` +
    `🔢 *Nº do chamado:* ${numeroChamado}\n` +
    `📋 *Tipo de chamado:* ${tipoChamado}\n` +
    `👥 *Cliente:* ${cliente}\n` +
    `🔧 *Quantidade de patrimônios tratados:* ${quantidadePatrimonios}\n` +
    `🚗 *KM inicial:* ${kmInicial}\n` +
    `🚗 *KM final:* ${kmFinal}\n` +
    `🚗 *KM total percorrido:* ${kmTotal}\n` +
    `⏰ *Horário de chegada:* ${horaChegada}\n` +
    `⏰ *Horário de saída:* ${horaSaida}\n` +
    `⏱️ *Tempo total de atendimento:* ${tempoTotal}\n` +
    `📍 *Endereço de partida:* ${enderecoPartida}\n` +
    `📍 *Endereço de chegada:* ${enderecoChegada}\n` +
    `📝 *Descrição do chamado:*\n${descricaoChamado}\n` +
    `👤 *Nome de quem informou:* ${nomeInformante}\n` +
    `📊 *Status do chamado:* ${statusChamado}`;
    
  atualizarBarraProgresso();
  return textoCompleto;
}

// Função para mostrar modal de sucesso
function showSuccessModal(message) {
  const modalBody = document.getElementById('successModalBody');
  modalBody.textContent = message;
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  modal.show();
}

// Função para mostrar modal de erro
function showErrorModal(message) {
  const modalBody = document.getElementById('errorModalBody');
  modalBody.textContent = message;
  const modal = new bootstrap.Modal(document.getElementById('errorModal'));
  modal.show();
}

// Função para apagar todos os campos
function deleteRespGeral() {
  try {
    const btn = document.querySelector('button[onclick="deleteRespGeral()"]');
    const btnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Limpando...';

    // Limpar todos os campos
    document.getElementById("numeroChamado").value = "";
    document.getElementById("tipoChamado").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("quantidadePatrimonios").value = "";
    document.getElementById("kmInicial").value = "";
    document.getElementById("kmFinal").value = "";
    document.getElementById("kmTotal").value = "";
    document.getElementById("horaChegada").value = "";
    document.getElementById("horaSaida").value = "";
    document.getElementById("tempoTotal").value = "";
    document.getElementById("enderecoPartida").value = "";
    document.getElementById("enderecoChegada").value = "";
    document.getElementById("descricaoChamado").value = "";
    document.getElementById("nomeInformante").value = "";
    document.getElementById("statusChamado").value = "";

    // Redefinir data para a data atual
    definirDataAtual();

    // Limpar o localStorage
    localStorage.removeItem("formData");

    // Atualizar barra de progresso
    atualizarBarraProgresso();

    btn.disabled = false;
    btn.innerHTML = btnText;
    mostrarToast("Todos os campos foram limpos", "success");
  } catch (error) {
    console.error("Erro ao limpar formulário:", error);
    showErrorModal("Erro ao limpar o formulário: " + error.message);
  }
}

// Função para copiar o relatório para a área de transferência
function copiarRelatorio() {
  const textoRelatorio = infoGeral();
  
  // Criar um elemento de texto temporário
  const elementoTemp = document.createElement('textarea');
  elementoTemp.value = textoRelatorio;
  document.body.appendChild(elementoTemp);
  
  // Selecionar e copiar o texto
  elementoTemp.select();
  document.execCommand('copy');
  
  // Remover o elemento temporário
  document.body.removeChild(elementoTemp);
  
  return textoRelatorio;
}

// Função para enviar para o WhatsApp
function enviarWhatsApp() {
  const textoWhatsApp = 
    `*Relatório de Chamado*\n\n` +
    `*Data do chamado:* ${document.getElementById("dataChamado").value || 'Não informado'}\n` +
    `*Nº do chamado:* ${document.getElementById("numeroChamado").value || 'Não informado'}\n` +
    `*Tipo de chamado:* ${document.getElementById("tipoChamado").value || 'Não informado'}\n` +
    `*Cliente:* ${document.getElementById("cliente").value || 'Não informado'}\n` +
    `*Quantidade de patrimônios:* ${document.getElementById("quantidadePatrimonios").value || 'Não informado'}\n` +
    `*KM inicial:* ${document.getElementById("kmInicial").value || 'Não informado'}\n` +
    `*KM final:* ${document.getElementById("kmFinal").value || 'Não informado'}\n` +
    `*KM total percorrido:* ${document.getElementById("kmTotal").value || 'Não informado'}\n` +
    `*Horário de chegada:* ${document.getElementById("horaChegada").value || 'Não informado'}\n` +
    `*Horário de saída:* ${document.getElementById("horaSaida").value || 'Não informado'}\n` +
    `*Tempo total de atendimento:* ${document.getElementById("tempoTotal").value || 'Não informado'}\n` +
    `*Endereço de partida:* ${document.getElementById("enderecoPartida").value || 'Não informado'}\n` +
    `*Endereço de chegada:* ${document.getElementById("enderecoChegada").value || 'Não informado'}\n` +
    `*Descrição:* ${document.getElementById("descricaoChamado").value || 'Sem descrição'}\n` +
    `*Informante:* ${document.getElementById("nomeInformante").value || 'Não informado'}\n` +
    `*Status:* ${document.getElementById("statusChamado").value || 'Não informado'}`;
  
  const textoEncoded = encodeURIComponent(textoWhatsApp);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${textoEncoded}`;
  window.open(whatsappUrl, "_blank");
}

// Função combinada para enviar, copiar e compartilhar o relatório
async function enviarRelatorioCombinado() {
  try {
    // Verificar campos obrigatórios
    const camposObrigatorios = [
      { id: "dataChamado", nome: "Data do chamado" },
      { id: "numeroChamado", nome: "Número do chamado" },
      { id: "tipoChamado", nome: "Tipo do chamado" },
      { id: "cliente", nome: "Cliente" },
      { id: "statusChamado", nome: "Status do chamado" }
    ];
    
    const camposVazios = camposObrigatorios.filter(campo => {
      const valor = document.getElementById(campo.id).value;
      return !valor || valor.trim() === '';
    });
    
    if (camposVazios.length > 0) {
      const camposFaltantes = camposVazios.map(c => c.nome).join(", ");
      throw new Error(`Por favor, preencha os campos obrigatórios: ${camposFaltantes}`);
    }
    
    // Mostrar indicador de carregamento
    const btn = document.querySelector('button[onclick="enviarRelatorioCombinado()"]');
    const btnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processando...';

    // Copiar para área de transferência
    const textoRelatorio = copiarRelatorio();
    mostrarToast("Relatório copiado para a área de transferência!");

    // Enviar para o Discord
    await sendToDiscord(textoRelatorio);

    // Enviar para o WhatsApp
    enviarWhatsApp();

    // Restaurar botão e mostrar mensagem de sucesso
    btn.disabled = false;
    btn.innerHTML = btnText;
    showSuccessModal("Relatório processado com sucesso!\n\n✓ Copiado para área de transferência\n✓ Enviado para Discord\n✓ Compartilhado via WhatsApp");

  } catch (err) {
    showErrorModal(`${err.message}`);
    
    // Restaurar botão em caso de erro
    const btn = document.querySelector('button[onclick="enviarRelatorioCombinado()"]');
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send-check-fill me-2"></i> Enviar e Copiar Relatório';
  }
}

// Inicializações e eventos
window.onload = function() {
  // Inicializar o autocomplete para os campos de endereço
  initAutocomplete();
  
  // Carregar dados salvos ou definir data atual
  carregarDadosFormulario();
  
  // Inicializar cálculos e barra de progresso
  calcularKmTotal();
  calcularTempoAtendimento();
  atualizarBarraProgresso();
};
