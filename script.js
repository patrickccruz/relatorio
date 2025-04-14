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
  // URL do webhook do Discord - já configurada
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1360296356144480266/FoS8X0j3cRQVknl5qJoxiFr4e6OojnQ7XhyscYwDAZFufyx1UYb7t216LKkR8ocpWaZm";
  
  // Retorna a URL diretamente, sem verificação
  return DISCORD_WEBHOOK_URL;
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
      parceiro: document.getElementById("parceiro").value || 'Não informado',
      nomeTecnico: document.getElementById("nomeTecnico").value || 'Não informado',
      telefoneTecnico: document.getElementById("telefoneTecnico").value || 'Não informado',
      quantidadePatrimonios: document.getElementById("quantidadePatrimonios").value || 'Não informado',
      problemaIdentificado: document.getElementById("problemaIdentificado").value || 'Não informado',
      numeroPatrimonio: document.getElementById("numeroPatrimonio").value || 'Não informado',
      modeloEquipamento: document.getElementById("modeloEquipamento").value || 'Não informado',
      nomeAcompanhante: document.getElementById("nomeAcompanhante").value || 'Não informado',
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
          name: "🧑‍🔧 Técnico e Parceiro",
          value: `Técnico: ${dados.nomeTecnico}\nParceiro: ${dados.parceiro}\nTelefone: ${dados.telefoneTecnico}`,
          inline: true
        },
        {
          name: "🔧 Patrimônios",
          value: dados.quantidadePatrimonios,
          inline: true
        },
        {
          name: "🔍 Problema e Equipamento",
          value: `Problema: ${dados.problemaIdentificado}\nPatrimônio: ${dados.numeroPatrimonio}\nModelo: ${dados.modeloEquipamento}`,
          inline: true
        },
        {
          name: "👥 Acompanhamento",
          value: dados.nomeAcompanhante,
          inline: true
        },
        {
          name: "🚗 Quilometragem",
          value: `Inicial: ${dados.kmInicial}\nFinal: ${dados.kmFinal}\nTotal: ${dados.kmTotal}`,
          inline: true
        },
        {
          name: "⏰ Horários",
          value: `Início: ${dados.horaChegada}\nTérmino: ${dados.horaSaida}\nTempo Total: ${dados.tempoTotal}`,
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
          name: "📝 Atividade Realizada",
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
      `Relatório de Chamado\n\n` +
      `Data do chamado: ${dados.dataChamado}\n` +
      `Nº do chamado: ${dados.numeroChamado}\n` +
      `Tipo de chamado: ${dados.tipoChamado}\n` +
      `Cliente: ${dados.cliente}\n` +
      `Quantidade de patrimônios: ${dados.quantidadePatrimonios}\n` +
      `KM inicial: ${dados.kmInicial}\n` +
      `KM final: ${dados.kmFinal}\n` +
      `KM total percorrido: ${dados.kmTotal}\n` +
      `Horário de chegada: ${dados.horaChegada}\n` +
      `Horário de saída: ${dados.horaSaida}\n` +
      `Tempo total de atendimento: ${dados.tempoTotal}\n` +
      `Endereço de partida: ${dados.enderecoPartida}\n` +
      `Endereço de chegada: ${dados.enderecoChegada}\n` +
      `Descrição: ${dados.descricaoChamado}\n` +
      `Informante: ${dados.nomeInformante}\n` +
      `Status: ${dados.statusChamado}` +
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
      campoData.setAttribute('value', dataFormatada); // Define o atributo value também
      campoData.classList.add('is-valid'); // Marca o campo como válido
      
      // Salvar no localStorage imediatamente para garantir persistência
      const dadosAtuais = JSON.parse(localStorage.getItem("formData")) || {};
      dadosAtuais['dataChamado'] = dataFormatada;
      localStorage.setItem("formData", JSON.stringify(dadosAtuais));
      
      // Atualizar barra de progresso e informações
      atualizarBarraProgresso(); // Chama apenas atualizarBarraProgresso para evitar loop recursivo
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

// Função para marcar campos obrigatórios (anteriormente atualizarBarraProgresso)
function atualizarBarraProgresso() {
  try {
    // Definir campos obrigatórios
    const camposObrigatorios = [
      "dataChamado", "numeroChamado", "tipoChamado", "cliente", 
      "parceiro", "nomeTecnico", "statusChamado", "problemaIdentificado"
    ];
    
    // Verificar TODOS os campos e adicionar verificação visual
    const todosOsCampos = document.querySelectorAll('#scriptForm input, #scriptForm select, #scriptForm textarea');
    todosOsCampos.forEach(elemento => {
      // Ignorar campos readonly ou sem ID
      if (elemento.readOnly || !elemento.id) return;
      
      // Se o campo está preenchido, adicionar classe is-valid
      if (elemento.value && elemento.value.trim() !== "") {
        elemento.classList.add('is-valid');
        elemento.classList.remove('is-invalid');
        
        // Se for um campo obrigatório, remover marcação visual de obrigatório
        if (camposObrigatorios.includes(elemento.id)) {
          const formGroup = elemento.closest('.form-floating, .form-group');
          if (formGroup) {
            formGroup.classList.remove('required-field');
          }
        }
      } else {
        // Se está vazio, remover classe de válido
        elemento.classList.remove('is-valid');
        
        // Se for campo obrigatório não preenchido, adicionar marcação visual
        if (camposObrigatorios.includes(elemento.id)) {
          const formGroup = elemento.closest('.form-floating, .form-group');
          if (formGroup) {
            formGroup.classList.add('required-field');
          }
        }
      }
    });
    
    // Verificar se todos os campos obrigatórios estão preenchidos
    const todosObrigatoriosPreenchidos = camposObrigatorios.every(campo => {
      const elemento = document.getElementById(campo);
      return elemento && elemento.value && elemento.value.trim() !== "";
    });
    
    // Se todos os campos obrigatórios estiverem preenchidos, mostrar feedback
    if (todosObrigatoriosPreenchidos) {
      mostrarToast("Todos os campos obrigatórios preenchidos!", "success");
    }
    
  } catch (error) {
    // Silencia erros em produção
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro ao verificar campos obrigatórios:', error);
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
  // Obter todos os inputs, selects e textareas do formulário
  const formInputs = document.querySelectorAll('#scriptForm input, #scriptForm select, #scriptForm textarea');
  
  const formData = {};
  
  // Salvar o valor de cada campo
  formInputs.forEach(input => {
    if (input.id) {
      formData[input.id] = input.value;
    }
  });
  
  localStorage.setItem("formData", JSON.stringify(formData));
  
  // Salvar status dos checkboxes de fixação
  salvarPreferenciasFixas();
}

// Função para salvar preferências fixas
function salvarPreferenciasFixas() {
  const preferenciasFixas = {
    parceiro: {
      fixo: document.getElementById('fixarParceiro').checked,
      valor: document.getElementById('parceiro').value
    },
    nomeTecnico: {
      fixo: document.getElementById('fixarNomeTecnico').checked,
      valor: document.getElementById('nomeTecnico').value
    },
    telefoneTecnico: {
      fixo: document.getElementById('fixarTelefoneTecnico').checked,
      valor: document.getElementById('telefoneTecnico').value
    }
  };
  
  localStorage.setItem("preferenciasFixas", JSON.stringify(preferenciasFixas));
}

// Função para carregar preferências fixas
function carregarPreferenciasFixas() {
  try {
    const preferenciasFixas = JSON.parse(localStorage.getItem("preferenciasFixas"));
    
    if (preferenciasFixas) {
      // Parceiro
      if (preferenciasFixas.parceiro) {
        const checkboxParceiro = document.getElementById('fixarParceiro');
        const campoParceiro = document.getElementById('parceiro');
        
        checkboxParceiro.checked = preferenciasFixas.parceiro.fixo;
        
        if (preferenciasFixas.parceiro.fixo && preferenciasFixas.parceiro.valor) {
          campoParceiro.value = preferenciasFixas.parceiro.valor;
          campoParceiro.classList.add('is-valid');
        }
      }
      
      // Nome do Técnico
      if (preferenciasFixas.nomeTecnico) {
        const checkboxNomeTecnico = document.getElementById('fixarNomeTecnico');
        const campoNomeTecnico = document.getElementById('nomeTecnico');
        
        checkboxNomeTecnico.checked = preferenciasFixas.nomeTecnico.fixo;
        
        if (preferenciasFixas.nomeTecnico.fixo && preferenciasFixas.nomeTecnico.valor) {
          campoNomeTecnico.value = preferenciasFixas.nomeTecnico.valor;
          campoNomeTecnico.classList.add('is-valid');
        }
      }
      
      // Telefone do Técnico
      if (preferenciasFixas.telefoneTecnico) {
        const checkboxTelefoneTecnico = document.getElementById('fixarTelefoneTecnico');
        const campoTelefoneTecnico = document.getElementById('telefoneTecnico');
        
        checkboxTelefoneTecnico.checked = preferenciasFixas.telefoneTecnico.fixo;
        
        if (preferenciasFixas.telefoneTecnico.fixo && preferenciasFixas.telefoneTecnico.valor) {
          campoTelefoneTecnico.value = preferenciasFixas.telefoneTecnico.valor;
          campoTelefoneTecnico.classList.add('is-valid');
        }
      }
      
      // Atualizar o estilo visual dos campos fixos
      atualizarEstiloCamposFixos();
    }
  } catch (error) {
    console.error("Erro ao carregar preferências fixas:", error);
  }
}

// Função para carregar dados do formulário
function carregarDadosFormulario() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  
  // Sempre definir a data atual primeiro, independentemente dos dados salvos
  definirDataAtual();
  
  // Carregar preferências fixas
  carregarPreferenciasFixas();
  
  // Obter campos que estão fixos para não sobrescrevê-los
  const preferenciasFixas = JSON.parse(localStorage.getItem("preferenciasFixas")) || {};
  const camposFixos = [];
  
  if (preferenciasFixas.parceiro && preferenciasFixas.parceiro.fixo) {
    camposFixos.push('parceiro');
  }
  
  if (preferenciasFixas.nomeTecnico && preferenciasFixas.nomeTecnico.fixo) {
    camposFixos.push('nomeTecnico');
  }
  
  if (preferenciasFixas.telefoneTecnico && preferenciasFixas.telefoneTecnico.fixo) {
    camposFixos.push('telefoneTecnico');
  }
  
  if (formData) {
    // Identificar todos os inputs, selects e textareas
    const formInputs = document.querySelectorAll('#scriptForm input, #scriptForm select, #scriptForm textarea');
    
    // Preencher cada campo com os dados salvos
    formInputs.forEach(input => {
      // Ignorar o campo de data e campos fixos
      if (input.id && formData[input.id] && input.id !== 'dataChamado' && !camposFixos.includes(input.id)) {
        input.value = formData[input.id];
        
        // Marcar como válido se não for readonly
        if (!input.readOnly) {
          input.classList.add('is-valid');
        }
      }
    });
    
    // Atualizar cálculos após carregar os dados
    calcularKmTotal();
    calcularTempoAtendimento();
    atualizarBarraProgresso();
  }
}

// Função para coletar informações gerais
function infoGeral() {
  salvarDadosFormulario();

  // Gerar texto formatado no padrão solicitado
  const textoCompleto = 
    `Relatório de Chamado\n\n` +
    `Data do chamado: ${document.getElementById("dataChamado").value || 'Não informado'}\n` +
    `Nº do chamado: ${document.getElementById("numeroChamado").value || 'Não informado'}\n` +
    `Tipo de chamado: ${document.getElementById("tipoChamado").value || 'Não informado'}\n` +
    `Cliente: ${document.getElementById("cliente").value || 'Não informado'}\n` +
    `Parceiro: ${document.getElementById("parceiro").value || 'Não informado'}\n` +
    `Nome do Técnico: ${document.getElementById("nomeTecnico").value || 'Não informado'}\n` +
    `Telefone do Técnico: ${document.getElementById("telefoneTecnico").value || 'Não informado'}\n` +
    `Quantidade de patrimônios: ${document.getElementById("quantidadePatrimonios").value || 'Não informado'}\n` +
    `Problema identificado: ${document.getElementById("problemaIdentificado").value || 'Não informado'}\n` +
    `Nº Patrimônio/serial: ${document.getElementById("numeroPatrimonio").value || 'Não informado'}\n` +
    `Modelo do equipamento: ${document.getElementById("modeloEquipamento").value || 'Não informado'}\n` +
    `Nome de quem acompanhou: ${document.getElementById("nomeAcompanhante").value || 'Não informado'}\n` +
    `KM inicial: ${document.getElementById("kmInicial").value || 'Não informado'}\n` +
    `KM final: ${document.getElementById("kmFinal").value || 'Não informado'}\n` +
    `KM total percorrido: ${document.getElementById("kmTotal").value || 'Não informado'}\n` +
    `Horário de chegada: ${document.getElementById("horaChegada").value || 'Não informado'}\n` +
    `Horário de saída: ${document.getElementById("horaSaida").value || 'Não informado'}\n` +
    `Tempo total de atendimento: ${document.getElementById("tempoTotal").value || 'Não informado'}\n` +
    `Endereço de partida: ${document.getElementById("enderecoPartida").value || 'Não informado'}\n` +
    `Endereço de chegada: ${document.getElementById("enderecoChegada").value || 'Não informado'}\n` +
    `Descrição: ${document.getElementById("descricaoChamado").value || 'Sem descrição'}\n` +
    `Informante: ${document.getElementById("nomeInformante").value || 'Não informado'}\n` +
    `Status: ${document.getElementById("statusChamado").value || 'Não informado'}`;
    
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
    const btn = document.querySelector('button.delete-resp-btn');
    const btnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Limpando...';

    // Obter campos que estão fixos para não limpá-los
    const preferenciasFixas = JSON.parse(localStorage.getItem("preferenciasFixas")) || {};
    const camposFixos = [];
    
    if (preferenciasFixas.parceiro && preferenciasFixas.parceiro.fixo) {
      camposFixos.push('parceiro');
    }
    
    if (preferenciasFixas.nomeTecnico && preferenciasFixas.nomeTecnico.fixo) {
      camposFixos.push('nomeTecnico');
    }
    
    if (preferenciasFixas.telefoneTecnico && preferenciasFixas.telefoneTecnico.fixo) {
      camposFixos.push('telefoneTecnico');
    }

    // Limpar todos os campos do formulário, exceto os fixos
    const formInputs = document.querySelectorAll('#scriptForm input, #scriptForm select, #scriptForm textarea');
    formInputs.forEach(input => {
      // Não limpar campos de botões, checkboxes e campos fixos
      if (input.type !== 'button' && input.type !== 'submit' && input.type !== 'checkbox' && !camposFixos.includes(input.id)) {
        input.value = "";
      }
    });

    // Redefinir data para a data atual
    definirDataAtual();

    // Limpar o localStorage
    const backup = {};
    
    // Salvar os valores fixos antes de limpar o localStorage
    camposFixos.forEach(campo => {
      backup[campo] = document.getElementById(campo).value;
    });
    
    localStorage.removeItem("formData");
    
    // Salvar novamente os campos fixos para o localStorage
    if (camposFixos.length > 0) {
      const newFormData = {};
      camposFixos.forEach(campo => {
        newFormData[campo] = backup[campo];
      });
      localStorage.setItem("formData", JSON.stringify(newFormData));
    }

    // Atualizar cálculos
    calcularKmTotal();
    calcularTempoAtendimento();
    atualizarBarraProgresso();

    btn.disabled = false;
    btn.innerHTML = btnText;
    mostrarToast("Todos os campos foram limpos (exceto os fixos)", "success");
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
    `Relatório de Chamado\n\n` +
    `Data do chamado: ${document.getElementById("dataChamado").value || 'Não informado'}\n` +
    `Nº do chamado: ${document.getElementById("numeroChamado").value || 'Não informado'}\n` +
    `Tipo de chamado: ${document.getElementById("tipoChamado").value || 'Não informado'}\n` +
    `Cliente: ${document.getElementById("cliente").value || 'Não informado'}\n` +
    `Parceiro: ${document.getElementById("parceiro").value || 'Não informado'}\n` +
    `Nome do Técnico: ${document.getElementById("nomeTecnico").value || 'Não informado'}\n` +
    `Telefone do Técnico: ${document.getElementById("telefoneTecnico").value || 'Não informado'}\n` +
    `Quantidade de patrimônios: ${document.getElementById("quantidadePatrimonios").value || 'Não informado'}\n` +
    `Problema identificado: ${document.getElementById("problemaIdentificado").value || 'Não informado'}\n` +
    `Nº Patrimônio/serial: ${document.getElementById("numeroPatrimonio").value || 'Não informado'}\n` +
    `Modelo do equipamento: ${document.getElementById("modeloEquipamento").value || 'Não informado'}\n` +
    `Nome de quem acompanhou: ${document.getElementById("nomeAcompanhante").value || 'Não informado'}\n` +
    `KM inicial: ${document.getElementById("kmInicial").value || 'Não informado'}\n` +
    `KM final: ${document.getElementById("kmFinal").value || 'Não informado'}\n` +
    `KM total percorrido: ${document.getElementById("kmTotal").value || 'Não informado'}\n` +
    `Horário de chegada: ${document.getElementById("horaChegada").value || 'Não informado'}\n` +
    `Horário de saída: ${document.getElementById("horaSaida").value || 'Não informado'}\n` +
    `Tempo total de atendimento: ${document.getElementById("tempoTotal").value || 'Não informado'}\n` +
    `Endereço de partida: ${document.getElementById("enderecoPartida").value || 'Não informado'}\n` +
    `Endereço de chegada: ${document.getElementById("enderecoChegada").value || 'Não informado'}\n` +
    `Descrição: ${document.getElementById("descricaoChamado").value || 'Sem descrição'}\n` +
    `Informante: ${document.getElementById("nomeInformante").value || 'Não informado'}\n` +
    `Status: ${document.getElementById("statusChamado").value || 'Não informado'}`;
  
  const textoEncoded = encodeURIComponent(textoWhatsApp);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${textoEncoded}`;
  window.open(whatsappUrl, "_blank");
}

// Função combinada para enviar, copiar e compartilhar o relatório
async function enviarRelatorioCombinado() {
  try {
    // Certificar-se de que estamos usando a data atual
    definirDataAtual();
    
    // Verificar campos obrigatórios
    const camposObrigatorios = [
      { id: "dataChamado", nome: "Data do chamado" },
      { id: "numeroChamado", nome: "Número do chamado" },
      { id: "tipoChamado", nome: "Tipo do chamado" },
      { id: "cliente", nome: "Cliente" },
      { id: "parceiro", nome: "Parceiro" },
      { id: "nomeTecnico", nome: "Nome do Técnico" },
      { id: "problemaIdentificado", nome: "Problema identificado" },
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
    const btn = document.querySelector('button.enviar-relatorio-btn');
    const btnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processando...';

    // Copiar para área de transferência
    const textoRelatorio = copiarRelatorio();
    mostrarToast("Relatório copiado para a área de transferência!");

    // Enviar para o Discord
    await sendToDiscord(textoRelatorio);
    
    // Salvar relatório no histórico
    salvarRelatorioNoHistorico();

    // Enviar para o WhatsApp
    enviarWhatsApp();

    // Restaurar botão e mostrar mensagem de sucesso
    btn.disabled = false;
    btn.innerHTML = btnText;
    showSuccessModal("Relatório processado com sucesso!\n\n✓ Copiado para área de transferência\n✓ Enviado para Discord\n✓ Compartilhado via WhatsApp");

  } catch (err) {
    showErrorModal(`${err.message}`);
    
    // Restaurar botão em caso de erro
    const btn = document.querySelector('button.enviar-relatorio-btn');
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send-check-fill me-2"></i> Enviar e Copiar Relatório';
  }
}

// Função para salvar relatório no histórico
function salvarRelatorioNoHistorico() {
  try {
    // Obter os dados atuais
    const relatorio = {
      id: Date.now(), // Usar timestamp como ID único
      data: document.getElementById("dataChamado").value || 'Não informado',
      numeroChamado: document.getElementById("numeroChamado").value || 'Não informado',
      tipoChamado: document.getElementById("tipoChamado").value || 'Não informado',
      cliente: document.getElementById("cliente").value || 'Não informado',
      parceiro: document.getElementById("parceiro").value || 'Não informado',
      nomeTecnico: document.getElementById("nomeTecnico").value || 'Não informado',
      telefoneTecnico: document.getElementById("telefoneTecnico").value || 'Não informado',
      quantidadePatrimonios: document.getElementById("quantidadePatrimonios").value || 'Não informado',
      problemaIdentificado: document.getElementById("problemaIdentificado").value || 'Não informado',
      numeroPatrimonio: document.getElementById("numeroPatrimonio").value || 'Não informado',
      modeloEquipamento: document.getElementById("modeloEquipamento").value || 'Não informado',
      nomeAcompanhante: document.getElementById("nomeAcompanhante").value || 'Não informado',
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
      statusChamado: document.getElementById("statusChamado").value || 'Não informado',
      dataCriacao: new Date().toISOString()
    };
    
    // Obter histórico existente ou criar um novo array
    let historico = JSON.parse(localStorage.getItem("historicoRelatorios") || "[]");
    
    // Adicionar novo relatório ao início do array
    historico.unshift(relatorio);
    
    // Limitar a quantidade de relatórios salvos (opcional, para não sobrecarregar o localStorage)
    if (historico.length > 50) {
      historico = historico.slice(0, 50);
    }
    
    // Salvar no localStorage
    localStorage.setItem("historicoRelatorios", JSON.stringify(historico));
    
  } catch (error) {
    console.error("Erro ao salvar relatório no histórico:", error);
  }
}

// Função para obter histórico de relatórios
function obterHistoricoRelatorios() {
  try {
    return JSON.parse(localStorage.getItem("historicoRelatorios") || "[]");
  } catch (error) {
    console.error("Erro ao obter histórico de relatórios:", error);
    return [];
  }
}

// Função para gerar texto formatado de um relatório do histórico
function gerarTextoRelatorio(relatorio) {
  const textoRelatorio = 
    `Relatório de Chamado\n\n` +
    `Data do chamado: ${relatorio.data}\n` +
    `Nº do chamado: ${relatorio.numeroChamado}\n` +
    `Tipo de chamado: ${relatorio.tipoChamado}\n` +
    `Cliente: ${relatorio.cliente}\n` +
    `Parceiro: ${relatorio.parceiro}\n` +
    `Nome do Técnico: ${relatorio.nomeTecnico}\n` +
    `Telefone do Técnico: ${relatorio.telefoneTecnico}\n` +
    `Quantidade de patrimônios: ${relatorio.quantidadePatrimonios}\n` +
    `Problema identificado: ${relatorio.problemaIdentificado}\n` +
    `Nº Patrimônio/serial: ${relatorio.numeroPatrimonio}\n` +
    `Modelo do equipamento: ${relatorio.modeloEquipamento}\n` +
    `Nome de quem acompanhou: ${relatorio.nomeAcompanhante}\n` +
    `KM inicial: ${relatorio.kmInicial}\n` +
    `KM final: ${relatorio.kmFinal}\n` +
    `KM total percorrido: ${relatorio.kmTotal}\n` +
    `Horário de chegada: ${relatorio.horaChegada}\n` +
    `Horário de saída: ${relatorio.horaSaida}\n` +
    `Tempo total de atendimento: ${relatorio.tempoTotal}\n` +
    `Endereço de partida: ${relatorio.enderecoPartida}\n` +
    `Endereço de chegada: ${relatorio.enderecoChegada}\n` +
    `Descrição: ${relatorio.descricaoChamado}\n` +
    `Informante: ${relatorio.nomeInformante}\n` +
    `Status: ${relatorio.statusChamado}`;
    
  return textoRelatorio;
}

// Função para copiar um relatório do histórico
function copiarRelatorioHistorico(relatorioId) {
  try {
    // Obter histórico
    const historico = obterHistoricoRelatorios();
    
    // Encontrar o relatório pelo ID
    const relatorio = historico.find(r => r.id === relatorioId);
    
    if (!relatorio) {
      throw new Error("Relatório não encontrado");
    }
    
    // Gerar texto formatado
    const textoRelatorio = gerarTextoRelatorio(relatorio);
    
    // Criar um elemento de texto temporário
    const elementoTemp = document.createElement('textarea');
    elementoTemp.value = textoRelatorio;
    document.body.appendChild(elementoTemp);
    
    // Selecionar e copiar o texto
    elementoTemp.select();
    document.execCommand('copy');
    
    // Remover o elemento temporário
    document.body.removeChild(elementoTemp);
    
    // Mostrar feedback
    mostrarToast("Relatório copiado para a área de transferência!", "success");
    
    return textoRelatorio;
  } catch (error) {
    mostrarToast("Erro ao copiar relatório: " + error.message, "error");
    console.error("Erro ao copiar relatório do histórico:", error);
  }
}

// Função para excluir um relatório do histórico
function excluirRelatorio(relatorioId) {
  try {
    // Obter histórico
    let historico = obterHistoricoRelatorios();
    
    // Filtrar para remover o relatório selecionado
    historico = historico.filter(r => r.id !== relatorioId);
    
    // Salvar o histórico atualizado
    localStorage.setItem("historicoRelatorios", JSON.stringify(historico));
    
    // Mostrar feedback
    mostrarToast("Relatório excluído com sucesso", "success");
    
    // Retornar true para indicar sucesso
    return true;
  } catch (error) {
    mostrarToast("Erro ao excluir relatório: " + error.message, "error");
    console.error("Erro ao excluir relatório:", error);
    return false;
  }
}

// Função para limpar todo o histórico
function limparHistoricoRelatorios() {
  try {
    localStorage.removeItem("historicoRelatorios");
    mostrarToast("Histórico de relatórios limpo com sucesso", "success");
    return true;
  } catch (error) {
    mostrarToast("Erro ao limpar histórico: " + error.message, "error");
    console.error("Erro ao limpar histórico:", error);
    return false;
  }
}

// Função para atualizar o estilo visual dos campos fixos
function atualizarEstiloCamposFixos() {
  // Limpar os ícones existentes primeiro para evitar duplicações
  document.querySelectorAll('.fixed-field-icon').forEach(icone => {
    icone.remove();
  });
  
  // Remover as classes de estilo de todos os campos
  const campos = ['parceiro', 'nomeTecnico', 'telefoneTecnico'];
  campos.forEach(campo => {
    const elemento = document.getElementById(campo);
    const label = elemento.nextElementSibling;
    elemento.classList.remove('fixed-field');
    label.classList.remove('fixed-field-label');
  });
  
  // Aplicar estilo para os campos fixos
  campos.forEach(campo => {
    const checkbox = document.getElementById('fixar' + campo.charAt(0).toUpperCase() + campo.slice(1));
    if (checkbox && checkbox.checked) {
      const elemento = document.getElementById(campo);
      const label = elemento.nextElementSibling;
      
      elemento.classList.add('fixed-field');
      label.classList.add('fixed-field-label');
      
      // Adicionar ícone de fixado
      const icone = document.createElement('i');
      icone.className = 'bi bi-pin-angle-fill fixed-field-icon';
      icone.title = 'Este valor está fixado';
      elemento.parentNode.appendChild(icone);
    }
  });
}

// Inicializações e eventos
window.onload = function() {
  // Definir a data atual primeiro
  definirDataAtual();
  
  // Inicializar o autocomplete para os campos de endereço
  initAutocomplete();
  
  // Carregar dados salvos
  carregarDadosFormulario();
  
  // Inicializar cálculos e barra de progresso
  calcularKmTotal();
  calcularTempoAtendimento();
  
  // Garantir que todos os campos preenchidos são marcados como válidos
  setTimeout(() => {
    atualizarBarraProgresso();
  }, 100);

  // Adicionar event listeners para botões
  document.querySelector('button.delete-resp-btn')?.addEventListener('click', deleteRespGeral);
  document.querySelector('button.enviar-relatorio-btn')?.addEventListener('click', enviarRelatorioCombinado);
  
  // Event listeners para checkboxes de fixação
  document.getElementById('fixarParceiro')?.addEventListener('change', function() {
    salvarPreferenciasFixas();
    atualizarEstiloCamposFixos();
    mostrarToast(this.checked ? "Valor do parceiro fixado" : "Valor do parceiro não está mais fixo", "success");
  });
  
  document.getElementById('fixarNomeTecnico')?.addEventListener('change', function() {
    salvarPreferenciasFixas();
    atualizarEstiloCamposFixos();
    mostrarToast(this.checked ? "Nome do técnico fixado" : "Nome do técnico não está mais fixo", "success");
  });
  
  document.getElementById('fixarTelefoneTecnico')?.addEventListener('change', function() {
    salvarPreferenciasFixas();
    atualizarEstiloCamposFixos();
    mostrarToast(this.checked ? "Telefone do técnico fixado" : "Telefone do técnico não está mais fixo", "success");
  });
  
  // Configurar salvamento automático ao digitar ou alterar qualquer campo
  const formInputs = document.querySelectorAll('#scriptForm input, #scriptForm select, #scriptForm textarea');
  formInputs.forEach(input => {
    ['input', 'change'].forEach(eventType => {
      input.addEventListener(eventType, () => {
        // Salvar os dados em qualquer alteração
        salvarDadosFormulario();
        
        // Atualizar cálculos conforme necessário
        if (['kmInicial', 'kmFinal'].includes(input.id)) {
          calcularKmTotal();
        }
        
        if (['horaChegada', 'horaSaida'].includes(input.id)) {
          calcularTempoAtendimento();
        }
        
        // Sempre atualiza a barra de progresso
        atualizarBarraProgresso();
      });
    });
  });
};


