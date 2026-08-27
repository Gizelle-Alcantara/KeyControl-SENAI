# Especificação da demonstração de reservas

## Cenário

A página demonstrará uma reserva acadêmica em um ambiente isolado e sem persistência de dados. Todo conteúdo operacional será identificado como **cenário demonstrativo**, inclusive responsável, sala, período e código da reserva.

| Etapa | Ação do visitante | Resultado demonstrado |
|---|---|---|
| 01 — Solicitação | Escolher ambiente, responsável, data e período. | O resumo da solicitação é atualizado localmente. |
| 02 — Validação | Acionar a verificação da agenda. | O sistema demonstra a ausência de conflito no cenário. |
| 03 — Confirmação | Revisar os dados e confirmar. | Uma reserva simulada recebe código e estado confirmado. |
| 04 — Rastreabilidade | Consultar a linha do tempo. | O visitante visualiza registro, notificação e próximos controles. |

## Atalho de tema

**Shift + D** alterna entre os modos claro e escuro quando o foco não estiver em campo editável. O atalho será ignorado em `input`, `textarea`, `select`, elementos com `contenteditable` e ações que usem `Ctrl`, `Alt` ou `Meta`. A página explicará o atalho no controle de tema e na ajuda de teclado.
