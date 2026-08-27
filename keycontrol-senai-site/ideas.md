# Direção de design — KeyControl SENAI

## Explorações iniciais

### 1. Blueprint Cívico-Industrial

**Very Brief Intro:** Uma identidade clara e institucional inspirada em plantas técnicas, etiquetas patrimoniais e sinalização de oficinas. O resultado deve transmitir rastreabilidade, precisão e domínio operacional sem parecer um painel administrativo genérico.

**Probability:** 0.028

### 2. Sala de Controle Noturna

**Very Brief Intro:** Uma experiência escura e imersiva, com camadas de dados, estados luminosos e sensação de monitoramento em tempo real. A direção enfatiza tecnologia e vigilância contínua.

**Probability:** 0.007

### 3. Editorial Modular de Oficina

**Very Brief Intro:** Uma composição quente, tátil e editorial, inspirada em manuais técnicos impressos, fichas de inventário e catálogos industriais. O foco seria humano, didático e fortemente tipográfico.

**Probability:** 0.041

## Abordagem escolhida: Blueprint Cívico-Industrial

### Design Movement

**Modernismo industrial brasileiro com linguagem de blueprint técnico.** A interface combina a clareza funcional da sinalização institucional com detalhes de desenho técnico, marcações de inventário e superfícies de papel mineral.

### Core Principles

1. **Rastreabilidade visível:** cada bloco deve parecer identificável, numerado e conectado a um processo.
2. **Precisão antes da ornamentação:** o detalhe visual sempre reforça hierarquia, estado ou relação entre informações.
3. **Contraste institucional:** superfícies claras e confiáveis recebem acentos vermelhos decisivos e azul-profundo estrutural.
4. **Tecnologia legível:** diagramas, comandos e indicadores devem parecer técnicos, mas continuar compreensíveis para professores, recepção e avaliadores.

### Color Philosophy

O fundo principal usa um branco mineral levemente quente para evitar a frieza de interfaces SaaS genéricas. O azul-marinho atua como cor estrutural, remetendo a plantas técnicas, segurança e confiabilidade. O **Vermelho Sinal** aparece em ações, indicadores e cortes diagonais: ele comunica movimento, atenção e identidade industrial. O azul elétrico é reservado a conexões, dados e elementos técnicos, sem competir com o vermelho da marca.

### Layout Paradigm

A página será tratada como um **dossiê técnico contínuo**. O conteúdo não ficará preso a cartões centralizados uniformes: haverá uma barra de progresso lateral, títulos numerados, blocos assimétricos, painéis que invadem a margem, linhas de conexão e composições alternadas entre texto, diagramas e mockups. A navegação superior será compacta e opaca, garantindo contraste em qualquer ponto da rolagem.

### Signature Elements

1. **Nós de rastreabilidade:** círculos numerados conectados por linhas finas, usados em processos, requisitos e arquitetura.
2. **Etiquetas de inventário:** pequenos rótulos monoespaçados em vermelho ou azul para identificar módulos, estados e versões.
3. **Cortes de blueprint:** linhas diagonais, cantos recortados e réguas técnicas discretas nas seções de destaque.

### Interaction Philosophy

As interações devem parecer operações confirmadas em um sistema físico. Botões comprimem levemente ao clique; navegação atualiza o item ativo conforme a rolagem; comandos de instalação podem ser copiados com confirmação imediata; requisitos e regras se expandem sem alterar bruscamente o fluxo; os indicadores reagem com transições curtas e objetivas.

### Animation

Entradas usarão opacidade e deslocamento vertical de 12–18 px com duração entre 180 e 260 ms e easing `cubic-bezier(0.23, 1, 0.32, 1)`. Linhas técnicas poderão revelar-se horizontalmente; os módulos do mockup entram em cascata com 50 ms de intervalo. Hovers devem ser sutis: elevação de 2 px, alteração de cor de borda e deslocamento de pequenos indicadores. Todo movimento não essencial será desativado com `prefers-reduced-motion`.

### Typography System

- **Display e títulos:** Archivo Black, em caixa mista ou alta para seções curtas, com espaçamento condensado.
- **Corpo e interface:** Source Sans 3, pela leitura técnica e excelente comportamento em diferentes tamanhos.
- **Rótulos, dados e código:** IBM Plex Mono, sempre em pequenos trechos para não tornar a página excessivamente mecânica.
- **Hierarquia:** hero entre 64 e 88 px no desktop; títulos de seção entre 40 e 56 px; corpo entre 17 e 19 px; rótulos monoespaçados entre 11 e 13 px.

### Brand Essence

**Posicionamento:** o sistema que transforma o empréstimo de chaves e a reserva de ambientes acadêmicos em um processo rastreável, seguro e mensurável.

**Personalidade:** precisa, responsável e resolutiva.

### Brand Voice

As manchetes devem ser diretas e operacionais; os CTAs devem indicar exatamente o que acontecerá; a microcopy deve reduzir incerteza, sem superlativos vazios.

Exemplos:

> “Cada chave deixa um rastro. Cada ambiente ganha contexto.”

> “Do agendamento à devolução, tudo no mesmo fluxo.”

### Wordmark & Logo

O símbolo combina um **K geométrico** com a haste de uma chave e um pequeno nó circular de rastreabilidade. A palavra “KeyControl” deve receber desenho próprio: “Key” em peso pesado e “Control” em peso técnico, separados por uma pequena marca vertical vermelha. O ícone funcionará isoladamente no cabeçalho e no favicon.

### Signature Brand Color

**Vermelho Sinal — `#F04438`**. Deve ser usado com parcimônia em ações primárias, etiquetas e pontos de passagem do fluxo, tornando-se o elemento mais reconhecível da marca.

## Arquitetura de conteúdo

1. Cabeçalho com navegação por âncoras e indicador “MVP funcional”.
2. Hero assimétrico com proposta de valor, CTAs, números principais e mockup visual do sistema.
3. Seção “O problema” com contraste entre processo manual e processo rastreável.
4. Fluxo principal da reserva à devolução em uma linha operacional.
5. Módulos do produto organizados por quatro frentes: controle, inteligência, comunicação e infraestrutura.
6. Arquitetura técnica com camadas e integrações.
7. Perfis de acesso em matriz compacta e requisitos-chave.
8. Bloco de instalação com comandos copiáveis e separação entre núcleo e ambiente completo.
9. Roadmap, limitações conhecidas e próximos passos.
10. Rodapé documental com referências ao README e tecnologias.

## Observações de conteúdo

O site deve deixar claro que o KeyControl é um **MVP funcional em validação**, sem prometer disponibilidade de produção. Não serão inventados depoimentos, avaliações, clientes ou métricas de uso. Os números exibidos serão derivados exclusivamente do README: quatro perfis, vinte e dois requisitos funcionais, dez requisitos não funcionais, quatorze regras de negócio e três migrações documentadas.

## Style Decisions

- Cada seção principal mantém um dispositivo visível de rastreabilidade — numeração, linha de conexão, etiqueta ou ponto de controle — para que a página funcione como um dossiê técnico contínuo.
- Recursos e roadmap são tratados como fichas de inventário e registros auditados, com hierarquia assimétrica e taxonomia explícita, não como conjuntos genéricos de cards.
- O Vermelho Sinal é reservado a ações, etiquetas, nós, cortes e ênfases operacionais; superfícies estruturais permanecem minerais ou azul-marinho.
- Grandes painéis visuais devem representar evidências do sistema — estados, camadas, conexões e trilhas de custódia — em vez de funcionar apenas como decoração atmosférica.
