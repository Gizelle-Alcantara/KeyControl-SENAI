# Validação do site — KeyControl SENAI

## Compilação

Os comandos `pnpm check` e `pnpm build` foram executados com sucesso após a implementação inicial e novamente após a revisão visual. Não foram encontrados erros de TypeScript ou de compilação. O build informa apenas um aviso não bloqueante sobre o tamanho do bundle principal.

## Revisão desktop

A página foi examinada em 1440 × 900 px e em captura de página completa. A composição mantém o ritmo alternado entre superfícies mineral e azul-marinho, apresenta contraste adequado e preserva a hierarquia tipográfica. A revisão independente foi incorporada em um único passe: os antigos painéis de imagem com falha foram substituídos por diagramas operacionais em código; módulos e roadmap ganharam tratamento de fichas auditadas; a marca recebeu moldura, corte e separador próprios; a seção documental deixou de usar o vermelho como superfície dominante; e todas as seções principais passaram a exibir uma linha lateral de rastreabilidade.

## Revisão móvel

A página foi examinada em 390 × 844 px e em captura de página completa. O cabeçalho alterna para navegação móvel, o hero mantém contraste e leitura, o fluxo passa para orientação vertical, módulos e roadmap tornam-se colunas únicas, a matriz de perfis preserva hierarquia, o diagrama de arquitetura reorganiza destinos verticalmente e o terminal permite acomodar comandos extensos. Não foram observados elementos quebrados ou áreas com texto invisível.

## Interações implementadas

| Interação | Comportamento |
|---|---|
| Navegação por âncoras | Rolagem suave com compensação do cabeçalho fixo. |
| Menu móvel | Alternância acessível com `aria-expanded` e fechamento após seleção. |
| Indicador lateral | Exibe o progresso de leitura no desktop. |
| Requisitos | Alterna entre funcionais, qualidade e regras de negócio. |
| Instalação | Alterna entre núcleo e ambiente completo. |
| Copiar comando | Copia o comando ativo e confirma visualmente. |
| Entradas | Revelação curta por interseção, respeitando `prefers-reduced-motion`. |

## Conteúdo

Os números e estados apresentados foram derivados do README: quatro perfis, vinte e dois requisitos funcionais, dez requisitos não funcionais, quatorze regras de negócio e três migrações. O site identifica o sistema como MVP em validação e não apresenta métricas de adoção, depoimentos ou clientes fictícios.

## Atualização da assinatura SENAI

A logo oficial fornecida pelo usuário foi hospedada como ativo permanente e incorporada como assinatura institucional, sem substituir a marca KeyControl. Em desktop, a composição aparece no cabeçalho, na identificação acadêmica do hero e no rodapé. Em 390 × 844 px, a assinatura do cabeçalho é reduzida, o texto auxiliar é ocultado e o menu permanece acessível. A logo utiliza superfície branca no hero e no rodapé para preservar as cores originais e garantir contraste sobre o azul-marinho.

## Alternância de tema — validação inicial

O controle de tema foi ativado no cabeçalho e persistiu a alteração para o modo escuro. A verificação inicial em desktop confirmou a atualização do rótulo, do ícone e da superfície fixa do cabeçalho, mantendo legibilidade sobre o hero. A validação completa das superfícies claras e da experiência móvel será concluída antes do checkpoint.

## Alternância de tema — validação final

O tema claro continua preservando a versão previamente aprovada. O modo escuro foi validado em página completa nas larguras 1440 × 900 px e 390 × 844 px, com prioridade para hero, comparativo de problema, fluxo, fichas de recursos, arquitetura, perfis, requisitos, terminal, roadmap, documentação e rodapé. As superfícies que eram minerais migraram para azul-marinho em camadas, enquanto títulos, descrições, etiquetas e linhas de grade mantiveram contraste. O controle apresenta rótulo, ícone, `aria-label`, `aria-pressed` e persistência em `localStorage`; o menu móvel também inclui a ação de tema. Os comandos de typecheck e build foram aprovados.

## Demonstração interativa de reservas — validação parcial

A rota `/demonstracao` foi aberta no modo escuro e a primeira etapa apresentou ambiente, responsável, data e período como dados fictícios. O avanço para a segunda etapa ocorreu corretamente, seguido da validação simulada da agenda. Após a confirmação, o painel alterou o estado para “Agenda liberada para este cenário”, exibindo que nenhuma sobreposição foi identificada e mantendo o avanço condicionado a essa validação.

A terceira etapa foi alcançada após a validação, exibindo um código determinístico de reserva simulada (`KC-1785` para a seleção inicial), o responsável vinculado e a chave sugerida `KC-0142`. A tela deixa explícito que se trata de cenário sem persistência e prepara a próxima etapa de rastreabilidade.

O atalho `Shift + D` foi acionado na página de demonstração fora de campos editáveis e alternou corretamente o estado do tema de “Escuro” para “Claro”, atualizando o rótulo e o ícone do controle. O cenário também prosseguiu da confirmação para a etapa final de rastreabilidade, preservando a seleção e o código da reserva simulada.

A página foi capturada em 1440 × 900 px e 390 × 844 px. Em celular, o painel reorganiza etapas, formulário, resumo e ações sem corte horizontal; o atalho permanece visível no cabeçalho, e a explicação permanece acessível na área introdutória. Após a validação, a prévia foi reiniciada e carregou a rota principal e a nova chamada “Ver demonstração” sem erros de compilação.

## Comprovante em PDF — validação em andamento

Após alcançar a confirmação da reserva, o painel exibe “Comprovante disponível”, o código da reserva simulada e o botão “Exportar PDF”. O acionamento foi realizado no navegador de teste; a confirmação do arquivo baixado será concluída com verificação direta do artefato gerado, pois o histórico de downloads do navegador isolado não registrou a ação.

## Comprovante em PDF — validação final

O botão de exportação permanece disponível somente após a confirmação da reserva e reutiliza o código, ambiente, responsável, data e período selecionados. Um artefato independente foi gerado com `jsPDF` e apresentou assinatura `%PDF`, tamanho de 3.772 bytes, uma página e formato A4 conforme `pdfinfo`. O documento inclui cabeçalho institucional, estado confirmado, resultado da validação, chave sugerida, data local de geração e aviso explícito de cenário demonstrativo sem validade operacional. Typecheck e build foram aprovados após a inclusão da biblioteca.

## QR Code, assinatura e carregamento — validação em andamento

O fluxo foi reiniciado e avançou novamente por solicitação, validação de agenda e confirmação. A ação de exportação permaneceu disponível somente na etapa de confirmação, confirmando que o novo comprovante continua condicionado ao fluxo completo. A próxima verificação confirmará a presença do QR Code e das linhas de assinatura no arquivo gerado, bem como o estado visual temporário “Gerando PDF…”.

## QR Code, assinatura e carregamento — validação final

A geração apresentou o estado temporário “Gerando PDF…”, com botão desabilitado, `aria-busy="true"` e mensagem ao vivo informando a preparação do QR Code, das assinaturas e do arquivo. O comprovante de validação resultou em PDF A4 de uma página, com assinatura `%PDF` e 393.465 bytes. A inspeção confirmou duas imagens PNG incorporadas — os QR Codes de verificação — e os textos “ASSINATURA DO RESPONSÁVEL”, “RECEPÇÃO / CONFERÊNCIA” e “Consulta demonstrativa — sem validade operacional”. A tela de confirmação mantém a descrição da exportação e a ação disponível no ponto adequado do fluxo.
