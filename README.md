# Sistema de Registro de Chamados Técnicos

## Descrição

O Sistema de Registro de Chamados Técnicos é uma aplicação web que permite aos técnicos de campo registrar informações sobre atendimentos, incluindo detalhes de deslocamento, tempo de atendimento, informações do cliente e descrição do serviço realizado. A aplicação gera relatórios formatados que podem ser enviados via Discord e WhatsApp, facilitando a documentação e comunicação de atendimentos técnicos.

## Funcionalidades Principais

- **Interface intuitiva** organizada em cards temáticos
- **Barra de progresso** que mostra o percentual de preenchimento do formulário
- **Cálculos automáticos**:
  - Quilometragem total (KM final - KM inicial)
  - Tempo total de atendimento (baseado nos horários de início e término)
- **Preenchimento automático** da data atual sempre que a página é aberta
- **Autocomplete de endereços** utilizando a API Nominatim do OpenStreetMap
- **Campos com valores fixos**:
  - Possibilidade de fixar o parceiro, nome do técnico e telefone do técnico
  - Valores fixos são preservados mesmo ao limpar o formulário
  - Identificação visual para campos fixos com cor diferenciada e ícone
- **Envio de relatórios** para múltiplas plataformas:
  - Cópia para área de transferência
  - Envio para o Discord via webhook
  - Compartilhamento via WhatsApp
- **Armazenamento local** dos dados do formulário e preferências (localStorage)
- **Histórico de relatórios enviados** com opções de busca e filtragem
- **Validação de campos** obrigatórios antes do envio

## Campos do Formulário

### Informações Básicas
- Data do chamado (sempre atualizado para o dia atual)
- Número do chamado
- Tipo de chamado
- Cliente
- Parceiro (com opção de fixar valor)
- Nome do técnico (com opção de fixar valor)
- Nome de quem informou o chamado
- Telefone de contato do técnico (com opção de fixar valor)

### Detalhes do Serviço
- Quantidade de patrimônios tratados
- Status do chamado
- Problema identificado
- Atividade Realizada
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
├── relatorios.html      # Página de histórico de relatórios
├── script.js            # Lógica da aplicação
├── assets/
│   ├── img/             # Imagens do projeto
│   │   ├── logo.png     # Logo do projeto
│   │   └── favicon.png  # Ícone do site
│   ├── css/             # Arquivos CSS
│   │   └── style.css    # Estilos centralizados
│   ├── js/              # Scripts adicionais
│   │   ├── main.js      # Inicializações
│   │   └── meta-csp.js  # Configurações de segurança
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

### Formulário Principal (index.html)

1. Abra a aplicação em um navegador
2. A data será automaticamente preenchida com a data atual
3. Configure valores fixos (se desejar):
   - Marque a caixa "Fixar valor" ao lado dos campos Parceiro, Nome do Técnico ou Telefone do Técnico
   - Os valores fixados serão preservados entre sessões e ao limpar o formulário
4. Preencha os demais campos do formulário:
   - **Informações Básicas**: número do chamado, tipo, cliente, etc.
   - **Detalhes do Serviço**: problema identificado, atividade realizada, patrimônio/serial, etc.
   - **Deslocamento**: km inicial/final, endereços
   - **Tempo de Atendimento**: início e término da atividade
5. Os campos de KM total e Tempo total serão calculados automaticamente
6. Use o recurso de autocomplete para preencher endereços mais facilmente
7. Clique em "Enviar e Copiar Relatório" para:
   - Copiar o relatório para a área de transferência
   - Enviar para o Discord (se configurado)
   - Compartilhar via WhatsApp
8. Para limpar o formulário, clique em "Apagar Dados" (os valores fixados não serão apagados)

### Histórico de Relatórios (relatorios.html)

1. Acesse a página de histórico para visualizar todos os relatórios salvos
2. Utilize a barra de busca para filtrar relatórios por cliente, número, tipo, etc.
3. Os relatórios são organizados por data, do mais recente para o mais antigo
4. Para cada relatório, você pode:
   - Ver detalhes completos
   - Copiar o relatório para a área de transferência
   - Excluir o relatório do histórico
5. Para limpar todo o histórico, use o botão "Limpar Histórico"

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

### Configuração de Campos Fixos

Para modificar a funcionalidade de campos fixos:

1. Edite as funções `salvarPreferenciasFixas()` e `carregarPreferenciasFixas()` em `script.js`
2. Adicione novos campos à lista `camposFixos` na função `carregarDadosFormulario()`
3. Atualize a função `deleteRespGeral()` para incluir os novos campos fixos na lista de exclusões

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

### Problemas com Campos Fixos

- **Valores não persistem**: Verifique se o localStorage está ativo no navegador
- **Estilos visuais não aparecem**: Certifique-se de que o arquivo style.css está carregando corretamente

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