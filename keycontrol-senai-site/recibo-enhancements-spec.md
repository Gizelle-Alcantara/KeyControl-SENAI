# QR Code e assinatura no comprovante

O QR Code codificará uma URL do próprio ambiente de demonstração com o código da reserva e os dados que formam o cenário. Ao abrir o endereço, a página identificará que a consulta é demonstrativa e exibirá o código informado; não haverá alegação de consulta a um banco de produção.

| Elemento | Regra de implementação |
|---|---|
| Conteúdo do QR | URL com código, ambiente, responsável, data, período e marcador `demo=1`. |
| Legibilidade | QR escuro sobre fundo branco, margem e dimensão adequadas à leitura em papel. |
| Aviso | Abaixo do QR: “Consulta demonstrativa — sem validade operacional”. |
| Assinatura | Duas linhas: responsável selecionado e recepção/conferência. |
| Carregamento | O botão mostra ícone giratório, texto “Gerando PDF…”, `aria-busy` e fica desabilitado até a conclusão. |
| Duração | O feedback permanece visível por no mínimo 500 ms para confirmação perceptível. |
