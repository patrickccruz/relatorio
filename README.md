# Sistema de Registro de Chamados Técnicos

## Descrição

O Sistema de Registro de Chamados Técnicos é uma aplicação web que permite aos técnicos de campo registrar informações sobre atendimentos, incluindo detalhes de deslocamento, tempo de atendimento, informações do cliente e descrição do serviço realizado. A aplicação gera relatórios formatados que podem ser enviados via Discord e WhatsApp, facilitando a documentação e comunicação de atendimentos técnicos.

## Funcionalidades Principais

- **Interface intuitiva** organizada em cards temáticos
- **Barra de progresso** que mostra o percentual de preenchimento do formulário
- **Cálculos automáticos**:
  - Quilometragem total (KM final - KM inicial)
  - Tempo total de atendimento (baseado nos horários de início e término)
- **Preenchimento automático** da data atual
- **Autocomplete de endereços** utilizando a API Nominatim do OpenStreetMap
- **Envio de relatórios** para múltiplas plataformas:
  - Cópia para área de transferência
  - Envio para o Discord via webhook
  - Compartilhamento via WhatsApp
- **Armazenamento local** dos dados do formulário (localStorage)
- **Validação de campos** obrigatórios antes do envio

## Campos do Formulário

### Informações Básicas
- Data do chamado
- Número do chamado
- Tipo de chamado
- Cliente
- Parceiro
- Nome do técnico
- Nome de quem informou o chamado
- Telefone de contato do técnico

### Detalhes do Serviço
- Quantidade de patrimônios tratados
- Status do chamado
- Problema identificado
- Atividade realizada
- Nº Patrimônio/serial
- Modelo do equipamento
- Nome de quem acompanhou a atividade

### Deslocamento
- KM inicial
- KM final
- KM total percorrido (calculado automaticamente)
- Endereço de partida
- Endereço de chegada

### Tempo de Atendimento
- Início da atividade
- Término da atividade
- Tempo total de atendimento (calculado automaticamente)

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **UI Framework**: Bootstrap 5
- **Ícones**: Bootstrap Icons
- **Armazenamento**: LocalStorage API
- **Geocodificação**: Nominatim API (OpenStreetMap)
- **Integrações**: Discord Webhook API, WhatsApp API

## Estrutura do Projeto

```
/
├── index.html           # Página principal do formulário
├── script.js            # Lógica da aplicação
├── assets/
│   ├── img/             # Imagens do projeto
│   ├── css/             # Arquivos CSS
│   │   └── style.css    # Estilos principais
│   ├── js/              # Scripts adicionais
│   │   └── main.js      # Inicializações
│   └── vendor/          # Bibliotecas de terceiros
│       ├── bootstrap/   # Framework Bootstrap
│       ├── boxicons/    # Ícones
│       └── ...
└── README.md            # Este arquivo
```

## Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com a internet para:
  - Carregamento de recursos externos (fontes, CDNs)
  - Uso da API Nominatim para autocomplete de endereços
  - Envio de webhooks para o Discord
  - Compartilhamento via WhatsApp

## Instalação

1. Clone o repositório ou baixe os arquivos para seu servidor:
   ```bash
   git clone https://github.com/PatrickCP/sistema-registro-chamados.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd sistema-registro-chamados
   ```

3. Abra o arquivo `index.html` em um navegador ou configure um servidor web como Apache ou Nginx para servir os arquivos.

## Como Usar

1. Abra a aplicação em um navegador
2. Preencha os campos do formulário:
   - **Informações Básicas**: data, número do chamado, tipo, cliente, parceiro, nome do técnico, etc.
   - **Detalhes do Serviço**: problema identificado, atividade realizada, patrimônio/serial, modelo do equipamento, etc.
   - **Deslocamento**: km inicial/final, endereços
   - **Tempo de Atendimento**: início e término da atividade
3. Os campos de KM total e Tempo total serão calculados automaticamente
4. Use o recurso de autocomplete para preencher endereços mais facilmente
5. Clique em "Enviar e Copiar Relatório" para:
   - Copiar o relatório para a área de transferência
   - Enviar para o Discord (se configurado)
   - Compartilhar via WhatsApp
6. Para limpar o formulário, clique em "Apagar Tudo"

## Configuração

### Webhook do Discord

Para utilizar a integração com o Discord, você precisa configurar um webhook:

1. No Discord, acesse as configurações do servidor
2. Vá para "Integrações" > "Webhooks"
3. Clique em "Novo Webhook"
4. Dê um nome como "Relatório de Chamados"
5. Selecione o canal onde os relatórios devem aparecer
6. Copie a URL do webhook
7. Existem duas formas de configurar o webhook na aplicação:
   
   **Opção 1**: Configure via localStorage (para teste ou uso pessoal):
   ```javascript
   // No console do navegador (F12)
   localStorage.setItem('discord_webhook_url', 'sua_url_do_webhook');
   ```
   
   **Opção 2**: Para produção, modifique a função `getWebhookUrl()` em script.js para obter a URL de uma fonte segura como variáveis de ambiente ou um arquivo de configuração do servidor.

### API Nominatim (OpenStreetMap)

A aplicação utiliza o Nominatim para autocompletar endereços. Esta é uma API gratuita com as seguintes limitações:

- Máximo de 1 requisição por segundo
- Uso adequado de User-Agent
- Sem garantia de disponibilidade para uso comercial em grande escala

Se você planeja usar a aplicação intensivamente, considere:
1. Hospedar sua própria instância do Nominatim
2. Usar um provedor geocoding comercial como Google Maps ou Mapbox

## Recursos Avançados

### Personalização do Formulário

Para adicionar ou remover campos do formulário:

1. Modifique as seções relevantes em `index.html`
2. Atualize as funções em `script.js` (especialmente `infoGeral()` e `atualizarBarraProgresso()`)
3. Ajuste as funções que criam os relatórios para Discord e WhatsApp

### Implementação das Alterações Recentes

Para implementar as alterações recentes no formulário:

#### 1. Inclusão de Novos Campos

Adicione os seguintes campos nas seções apropriadas do arquivo `index.html`:

```html
<!-- Em Informações Básicas -->
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="parceiro" oninput="infoGeral()">
    <label for="parceiro">Parceiro:</label>
  </div>
</div>
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="nomeTecnico" oninput="infoGeral()">
    <label for="nomeTecnico">Nome do Técnico:</label>
  </div>
</div>
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="tel" class="form-control" id="telefoneTecnico" oninput="infoGeral()">
    <label for="telefoneTecnico">Telefone de contato do Técnico:</label>
  </div>
</div>

<!-- Em Detalhes do Serviço -->
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="problemaIdentificado" oninput="infoGeral()">
    <label for="problemaIdentificado">Problema identificado:</label>
  </div>
</div>
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="numeroPatrimonio" oninput="infoGeral()">
    <label for="numeroPatrimonio">N.º Patrimônio/serial:</label>
  </div>
</div>
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="modeloEquipamento" oninput="infoGeral()">
    <label for="modeloEquipamento">Modelo do equipamento:</label>
  </div>
</div>
<div class="col-md-6">
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="nomeAcompanhante" oninput="infoGeral()">
    <label for="nomeAcompanhante">Nome de quem acompanhou a atividade:</label>
  </div>
</div>
```

#### 2. Alteração de Labels Existentes

Substitua os labels dos campos existentes:

- Altere "Horário de chegada" para "Início da Atividade"
- Altere "Horário de saída" para "Término da Atividade"
- Altere "Breve descrição do chamado" para "Atividade Realizada"

#### 3. Atualização do JavaScript

Atualize o arquivo `script.js` para incluir os novos campos:

1. Adicione os novos campos à função `infoGeral()`
2. Atualize a função `atualizarBarraProgresso()` para incluir os novos campos
3. Modifique as funções de geração de relatório para Discord e WhatsApp

Exemplo de inclusão na função que cria o embed do Discord:

```javascript
// Adicionar campos ao embed do Discord
fields: [
  // ... campos existentes ...
  {
    name: "🧑‍🔧 Técnico e Parceiro",
    value: `Técnico: ${dados.nomeTecnico}\nParceiro: ${dados.parceiro}\nTelefone: ${dados.telefoneTecnico}`,
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
  // ... outros campos ...
]
```

### Segurança

A aplicação implementa:
- Headers de segurança via meta tags
- Sanitização básica de entrada
- Proteção contra ataques comuns (XSS, CSRF)

Para ambientes de produção, considere:
- Implementar HTTPS
- Revisão adicional de segurança
- Armazenamento seguro de configurações

## Solução de Problemas

### Problemas com Endereços

- **Endereços duplicados**: Ajuste a função `removerDuplicacoes()` em script.js
- **Cidades não detectadas**: Adicione mais cidades à lista `cidadesComuns` na função `simplificarEndereco()`

### Problemas com o Discord

- Verifique se o webhook está configurado corretamente
- Confirme se a URL não expirou ou foi revogada
- Teste o webhook separadamente usando curl ou Postman

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b minha-nova-feature`
3. Faça commit das mudanças: `git commit -am 'Adiciona nova feature'`
4. Envie para o GitHub: `git push origin minha-nova-feature`
5. Envie um Pull Request

## Licença

Copyright © 2023 Patrick C Cruz. Todos os direitos reservados.

---

Desenvolvido por [Patrick da Costa Cruz](https://www.linkedin.com/in/patrick-da-costa-cruz-08493212a/) 