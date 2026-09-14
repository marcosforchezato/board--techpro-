# PRD - Sistema de Gestão TechPro

**Laboratório de Programação para Internet · 2026B**

---

## 1. Problema

A TechPro é uma empresa de segurança eletrônica e automação (câmeras, alarmes, controle de acesso e automação com IA). O principal gargalo da operação atual é a fragmentação das informações ao longo de todo o ciclo de atendimento. Os dados dos clientes ficam dispersos entre WhatsApp, ligações, visitas, planilhas e sistemas paralelos, gerando uma série de impactos negativos:

Perda de histórico e rastreabilidade: Não há um registro único. Informações sobre o que foi combinado no orçamento, quais equipamentos foram instalados e o contexto de cada cliente se perdem em conversas informais ou dependem da memória da equipe.

Desconexão entre comercial e execução: Há uma quebra de continuidade. Quando um orçamento é aprovado, o planejamento da visita e a alocação de técnicos ocorrem em controles paralelos, obrigando a equipe a reconstruir o contexto manualmente.

Controle de garantias ineficiente: Acompanhar quais equipamentos estão cobertos, os prazos de garantia (da TechPro e de fornecedores) e emitir alertas preventivos é hoje um processo manual, elevando o risco de falhas e prejuízos.

Falta de visibilidade: A equipe interna não consegue responder rapidamente em que estágio está uma negociação ou serviço. Da mesma forma, o cliente fica sem transparência sobre o andamento de seus pedidos de orçamento ou chamados de suporte.

## 2. Solução

Implementação de um sistema centralizado de gestão de atendimento que unifique o fluxo de ponta a ponta, composto por um portal de entrada e um painel de controle operacional.

Captação Estruturada: Um site institucional onde o visitante solicita orçamentos, suporte técnico ou manutenção via formulários. Cada solicitação entra automaticamente no sistema interno, eliminando a dependência exclusiva de mensagens avulsas no WhatsApp.

Visão Única do Cliente: Um cadastro centralizado que reúne todo o histórico de um cliente: chamados anteriores, orçamentos (enviados e aprovados), decisões comerciais e ordens de serviço executadas.

Fluxo Contínuo (Comercial e Execução): O painel acompanha a evolução de cada etapa através de status claros (ex: Novo, Orçamento Enviado, Aprovado, Agendado, Em Execução, Concluído). A transição da venda para a equipe técnica ocorre dentro da mesma plataforma, preservando o contexto.

Módulo de Ativos e Garantias: Registro dos equipamentos vinculados a cada cliente e serviço, com acompanhamento automatizado de prazos e disparo de notificações para a equipe quando uma garantia estiver próxima do vencimento.

> **Observações**: por não ter sido possível validar o
> escopo completo diretamente com o cliente até o momento desta entrega, as
> decisões de produto abaixo (ausência de login para o cliente final, status
> dos chamados, cadastro de clientes) são suposições baseadas no briefing
> recebido. Estas serão revisadas nas versões v2 e v3 conforme o contato
> com o cliente avançar.

## 3. Escopo

| Ordem | Parte                                              | Por que nesta posição                                                                                                               |
| ----- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Portal de captação (Site Institucional)            | É a porta de entrada padronizada para novos orçamentos, manutenções e chamados, eliminando a dependência inicial do WhatsApp.       |
| 2     | Autenticação e Perfis de Acesso                    | Garante que vendedores, técnicos e administradores vejam apenas as informações e telas pertinentes às suas funções.                 |
| 3     | Cadastro 360º de Clientes (CRM)                    | Centraliza o histórico. É fundamental para que a equipe saiba rapidamente o que o cliente já orçou, aprovou ou instalou no passado. |
| 4     | Gestão de Orçamentos e Ordens de Execução (Kanban) | Resolve a desconexão comercial/técnico. O orçamento aprovado evolui para uma execução dentro do mesmo fluxo, sem perda de contexto. |
| 5     | Módulo de Ativos e Garantias                       | Cobre a falha crítica de perda de prazos. Vincula o equipamento instalado ao cliente para rastreabilidade e ações preventivas.      |
| 6     | Motor de Notificações e Alertas                    | Automatiza a lembrança de prazos de garantia ou retornos pendentes, tirando a responsabilidade da "memória" humana.                 |
| 7     | Arquitetura modularizada (APIs)                    | Permite que os módulos funcionem de forma independente e prepara o sistema para futuras integrações (estoque atual ou WhatsApp).    |
|       |

## 4. Requisitos funcionais

| ID   | Requisito                                                                                                                                                                                                             |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF01 | O sistema deve exigir autenticação (login e senha) para que colaboradores acessem o painel interno.                                                                                                                   |
| RF02 | O sistema deve permitir que usuários com perfil "Administrador" criem, editem e desativem contas de colaboradores, atribuindo a eles perfis de acesso específicos (ex: Admin, Comercial, Técnico).                    |
| RF03 | O sistema deve disponibilizar formulários no site para que visitantes solicitem orçamentos, manutenções ou suporte, gerando um registro automático no painel interno.                                                 |
| RF04 | O sistema deve permitir que um colaborador da TechPro registre manualmente uma nova solicitação originada de outros canais (WhatsApp, telefone, visita presencial), indicando a origem do contato.                    |
| RF05 | O sistema deve associar toda solicitação a um cliente, criando um novo cadastro quando o contato informado for inédito e vinculando ao cadastro existente quando já houver correspondência, para evitar duplicações.  |
| RF06 | O sistema deve consolidar um "Cadastro 360º" por cliente, exibindo em uma única tela o histórico unificado de solicitações, orçamentos, serviços executados, equipamentos instalados e notas internas.                |
| RF07 | O sistema deve exibir as solicitações e orçamentos em um painel visual (Kanban) organizado por status do funil (ex: Novo, Orçamento Enviado, Aprovado, Em Execução, Concluído).                                       |
| RF08 | O sistema deve permitir a atribuição de responsáveis distintos por etapa do serviço (ex: um vendedor para a fase comercial e um técnico para a execução), mantendo o histórico de transferências de responsabilidade. |
| RF09 | O sistema deve permitir que colaboradores adicionem comentários e "notas internas" dentro de uma solicitação ou cadastro de cliente, registrando o resumo de conversas e orientações.                                 |
| RF10 | O sistema deve permitir a criação de orçamentos padronizados diretamente na plataforma, vinculando-os à solicitação original do cliente.                                                                              |
| RF11 | O sistema deve converter automaticamente um orçamento com status "Aprovado" em uma Ordem de Execução (OS), mantendo todo o descritivo técnico e histórico anexados.                                                   |
| RF12 | O sistema deve permitir que técnicos registrem os equipamentos instalados durante a execução, informando as datas de início e fim das garantias do fabricante e da própria TechPro.                                   |
| RF13 | O sistema deve disparar notificações no painel sempre que uma garantia estiver a 30 dias do vencimento, informando claramente qual das duas coberturas (fabricante ou TechPro) está expirando.                        |
| RF14 | O sistema deve registrar um log imutável de data, hora e usuário para cada criação de cadastro, mudança de status, emissão de orçamento ou adição de nota interna.                                                    |
| RF15 | O sistema deve aplicar controle de permissões, impedindo que usuários com perfil "Técnico" alterem valores financeiros de orçamentos, restritos aos perfis "Comercial" e "Admin".                                     |

## 5. Requisitos não funcionais

| ID    | Requisito                                                                                                                                                                 | Como se verifica                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| RNF01 | Desempenho: O painel de gestão deve carregar a painel visual e o histórico 360º do cliente em até 2 segundos, mesmo com milhares de registros.                            | Medição de tempo de resposta da API no navegador usando base de dados populada com volume de teste.                        |
| RNF02 | Segurança (Dados): Senhas de usuários e dados sensíveis de clientes devem ser armazenados com criptografia/hash, nunca em texto puro.                                     | Inspeção direta no banco de dados e auditoria do código de autenticação.                                                   |
| RNF03 | Segurança (Autorização): A API deve bloquear qualquer tentativa de alteração de dados feita por um usuário sem os privilégios necessários.                                | Testes de requisição direta (Postman/Insomnia) simulando tokens de acesso com perfis inferiores tentando ações restritas.  |
| RNF04 | Usabilidade (Mobile First): A interface da Ordem de Execução e do histórico de garantias deve ser perfeitamente utilizável em telas de smartphones.                       | Testes de interface simulando resoluções de dispositivos móveis, garantindo que técnicos em campo operem sem dificuldades. |
| RNF05 | Confiabilidade (Jobs): O motor de verificação de garantias deve rodar de forma assíncrona, garantindo que alertas sejam processados diariamente sem impactar a navegação. | Verificação dos logs do servidor (CRON jobs ou workers) registrando a varredura diária de prazos.                          |
| RNF06 | Interoperabilidade: O back-end deve ser construído através de APIs REST ou GraphQL documentadas.                                                                          | Existência de documentação interativa (ex: Swagger/OpenAPI) refletindo todos os endpoints do sistema.                      |

## 6. Histórias de usuário

Visitante e cliente:

1. Como visitante do site, quero solicitar um orçamento pelo próprio site, para não precisar ligar ou mandar mensagem em horário comercial.
2. Como cliente, quero solicitar manutenção ou suporte técnico pelo site, para registrar meu pedido sem depender de alguém ver minha mensagem no WhatsApp.

Comercial (quem atende e negocia):

3. Como vendedor, quero ver todas as solicitações em um painel único, organizado por status, para saber quantas estão em aberto e em que estágio cada uma está.
4. Como vendedor, quero abrir o cadastro do cliente e ver numa tela só o que já foi conversado, orçado, executado e instalado, para não reconstruir o contexto consultando WhatsApp, planilha e a memória de um colega.
5. Como vendedor, quero montar o orçamento padronizado dentro da própria plataforma, vinculado à solicitação que o originou, para não redigitar dados e não perder a ligação com o pedido do cliente.
6. Como vendedor, quero mover a solicitação pelo funil conforme ela avança, para que a equipe veja o andamento sem precisar perguntar.
7. Como vendedor, quero que um orçamento aprovado vire ordem de execução automaticamente, com o descritivo e os anexos preservados, para que a execução comece sem alguém remontar o contexto do zero.
8. Como vendedor, quero atribuir um responsável a cada etapa, para que alguém específico seja dono do orçamento e alguém específico seja dono da execução.

Técnico (quem executa em campo):

9. Como técnico, quero abrir a ordem de execução no celular e ver o descritivo aprovado e o histórico do cliente, para chegar ao local sabendo o que vou fazer.
10. Como técnico, quero registrar os equipamentos instalados informando a garantia do fabricante e a da TechPro, para que o prazo fique ligado ao equipamento e não à lembrança de alguém.
11. Como técnico, quero consultar se um equipamento ainda está em garantia ao atender um chamado, para saber na hora se a ocorrência está coberta.

Administrador (quem responde pela operação):

12. Como administrador, quero ser avisado no painel quando uma garantia estiver a 30 dias do vencimento, para agir de forma preventiva em vez de descobrir o prazo depois de vencido.
13. Como administrador, quero saber quem mudou o quê e quando em cada solicitação, orçamento e garantia, para acompanhar as decisões sem depender do relato de quem participou.
14. Como administrador, quero que o perfil técnico não altere valores de orçamento, para que a informação financeira fique restrita a quem responde por ela.
15. Como administrador, quero definir o perfil de cada usuário, para que vendedor, técnico e administrador vejam apenas as telas da sua função.

## 7. Casos de uso

### Atores

| Ator          | Quem é                                                           |
| ------------- | ---------------------------------------------------------------- |
| Visitante     | quem acessa o site sem estar logado e envia uma solicitação      |
| Colaborador   | quem trabalha na TechPro e atende solicitações no painel interno |
| Administrador | colaborador com permissão adicional sobre cadastros de acesso    |

> O Administrador é tratado como uma especialização de Colaborador (mesma
> interface de login, permissões adicionais), não como um quarto ator

### Casos de uso e rastreabilidade

| Caso de uso                                        | Vem da história                     | Realiza    |
| -------------------------------------------------- | ----------------------------------- | ---------- |
| UC01 · Enviar solicitação de orçamento             | 1                                   | RF01, RF06 |
| UC02 · Enviar solicitação de suporte ou manutenção | 2                                   | RF02, RF06 |
| UC03 · Entrar no painel interno                    | nenhuma; é pré-requisito das outras | RF03       |
| UC04 · Ver solicitações por status                 | 3                                   | RF04       |
| UC05 · Atualizar status da solicitação             | 4                                   | RF05, RF09 |
| UC06 · Ver histórico do cliente                    | 5                                   | RF07       |
| UC07 · Atribuir responsável                        | 6                                   | RF08       |
| UC08 · Gerenciar cadastro de colaboradores         | 7                                   | RF10       |
| UC09 · Habilitar ou desabilitar o painel interno   | 8                                   | RF11       |

### Diagrama de casos de uso

> `[ INSERIR DIAGRAMA ]`

### UC01 · Enviar solicitação de orçamento

| Campo              | Conteúdo                                                           |
| ------------------ | ------------------------------------------------------------------ |
| Ator principal     | Visitante                                                          |
| Pré-condição       | nenhuma; o formulário está disponível a qualquer visitante do site |
| Disparo            | o visitante preenche o formulário de orçamento e envia             |
| Requisitos ligados | RF01, RF06, RNF04                                                  |

Fluxo principal:

1. O visitante acessa o site e abre o formulário de solicitação de orçamento.
2. Informa nome, contato (telefone ou e-mail) e uma descrição do que precisa.
3. Envia o formulário.
4. O sistema confere se já existe um cliente com aquele contato.
5. Se não existir, o sistema cria um novo cadastro de cliente com os dados
   informados.
6. O sistema registra a solicitação com status "novo", associada ao cliente e
   com data e hora de criação.
7. O visitante recebe confirmação de que a solicitação foi enviada.

Fluxos alternativos:

- A1, contato já cadastrado: o sistema associa a nova solicitação ao cliente
  existente em vez de criar um cadastro duplicado (RF06).
- A2, campo obrigatório vazio: o sistema não envia o formulário e indica os
  campos pendentes; nenhuma solicitação é criada.

Pós-condição: existe uma solicitação registrada, com status "novo", ligada a um
cliente (novo ou existente).

### UC05 · Atualizar status da solicitação

| Campo              | Conteúdo                                                    |
| ------------------ | ----------------------------------------------------------- |
| Ator principal     | Colaborador                                                 |
| Pré-condição       | colaborador autenticado; solicitação existente no painel    |
| Disparo            | o colaborador abre uma solicitação e escolhe um novo status |
| Requisitos ligados | RF05, RF09, RNF03                                           |

Fluxo principal:

1. O colaborador abre a lista de solicitações no painel.
2. Seleciona uma solicitação em um dos status (novo ou em atendimento).
3. Escolhe o próximo status do funil (em atendimento ou concluído).
4. O sistema confere se a transição é válida (não é permitido voltar de
   concluído para novo, por exemplo).
5. O sistema atualiza o status e registra a data e hora da mudança.
6. O colaborador vê a solicitação refletida na nova coluna do funil.

Fluxos alternativos:

- A1, transição inválida: o sistema recusa a mudança e mantém o status atual,
  informando qual transição não é permitida.
- A2, solicitação sem responsável atribuído: o sistema permite a mudança de
  status normalmente; atribuir responsável é uma ação independente (UC07).

Pós-condição: a solicitação está no novo status, com o histórico da mudança
anterior preservado (data e hora de cada transição).

### UC08 · Gerenciar cadastro de colaboradores

| Campo              | Conteúdo                                                 |
| ------------------ | -------------------------------------------------------- |
| Ator principal     | Administrador                                            |
| Pré-condição       | administrador autenticado                                |
| Disparo            | o administrador acessa a área de gestão de colaboradores |
| Requisitos ligados | RF10, RNF02, RNF03                                       |

Fluxo principal:

1. O administrador acessa a lista de colaboradores cadastrados no painel.
2. Cria um novo colaborador, informando nome, usuário e definindo uma senha
   inicial, ou edita um colaborador existente.
3. O sistema confere se quem está realizando a ação tem permissão de
   administrador.
4. O sistema salva o cadastro, armazenando a senha com hash.
5. O administrador vê o colaborador refletido na lista atualizada.

Fluxos alternativos:

- A1, colaborador sem permissão tenta acessar: o sistema nega a ação e não
  exibe a área de gestão de colaboradores (RNF03).
- A2, usuário já existente: o sistema recusa a criação de um cadastro com
  usuário duplicado e informa o conflito.

Pós-condição: o cadastro de colaboradores reflete a criação ou edição realizada,
com a senha armazenada de forma segura.

UC01, UC05 e UC08 têm regra própria e são detalhados no mesmo formato. Os casos
sem regra de negócio própria, como UC03, ficam só no diagrama.

## 8. Modelagem

O sistema tem seis conceitos, os mesmos do glossário da seção 12, representados
abaixo como modelo de dados.

### 8.1 Modelo de dados

> `[ inserir aqui o modelo de dados ]`

Entidades principais e relacionamentos previstos:

- **Cliente** (1) — (N) **Solicitação**: um cliente pode ter várias solicitações;
  toda solicitação pertence a exatamente um cliente.
- **Solicitação** (N) — (1) **Colaborador** (responsável): uma solicitação tem no
  máximo um responsável atribuído; um colaborador pode ser responsável por várias
  solicitações.
- **Solicitação** (1) — (N) **Mudança de status**: cada solicitação acumula um
  histórico de transições de status, com data e hora de cada uma.
- **Colaborador** (1) — (N) **Cadastro de colaborador criado por**: um
  administrador cria ou edita cadastros de outros colaboradores.

## 9. Decisões de implementação

- O back-end é uma API documentada (REST ou GraphQL), consumida tanto pelo site institucional quanto pelo painel interno. A documentação interativa (Swagger/OpenAPI) faz parte da entrega e reflete todos os endpoints (RNF06).
- Autorização é verificada no servidor a cada requisição, por perfil. Esconder o botão ou a tela no front-end não é controle de acesso: o bloqueio precisa acontecer na API, inclusive para requisição feita fora da interface (RF10, RNF03).
- O histórico é append-only. Mudança de status, criação de orçamento e alteração de garantia geram registros novos, com usuário, data e hora do servidor, e não sobrescrevem o anterior. Corrigir um dado gera uma nova versão; o registro original continua consultável. É essa decisão que faz o log de RF09 ser realmente imutável.
- Data e hora vêm do servidor, no fuso America/Sao_Paulo, gravadas no momento da operação e nunca informadas pelo usuário. Prazos de garantia e tempo de atendimento são calculados a partir desses campos.
- O Cadastro 360º é uma leitura única sobre o mesmo cliente. Solicitação, orçamento, ordem de execução e equipamento instalado apontam para o cliente e são carregados numa consulta só, ordenada por data. Nenhuma tela junta dados de duas origens em memória para montar o contexto (RF02, RNF01).
- A conversão de orçamento aprovado em ordem de execução é feita no servidor, em transação única, disparada pela mudança de status e não por uma ação manual separada. A OS nasce ligada ao orçamento que a originou, com descritivo e anexos preservados (RF05).
- O status é uma máquina de estados no servidor. Só as transições previstas no funil são aceitas; um registro concluído não volta para novo. A regra vale na API, não apenas na interface do painel (RF03).
- A garantia pertence ao equipamento instalado, não ao cliente, e guarda dois prazos distintos: o do fabricante e o da TechPro. Um mesmo cliente pode ter itens com coberturas e vencimentos diferentes (RF06).
- A verificação de garantias é um job assíncrono diário (CRON ou worker), não efeito colateral de alguém abrir a tela. Se ninguém entrar no sistema durante a semana, os alertas de 30 dias são gerados do mesmo jeito e ficam registrados nos logs do servidor (RF07, RNF05).
- A notificação desta versão é o alerta no painel da equipe. Envio automático por e-mail ou WhatsApp não faz parte da entrega; a arquitetura em módulos e APIs deixa esse ponto preparado para integração futura.
- O visitante não possui login. O cadastro de cliente é criado a partir dos dados do formulário; quando o contato informado já existe, a solicitação é associada ao cadastro existente em vez de gerar um duplicado — é o que impede o histórico de se partir de novo (RF01, RF02).
- Arquivos (fotos da execução, PDFs de orçamento, comprovantes) vão para armazenamento de objetos; o banco guarda caminho, tipo, tamanho e metadados.
- O sistema não substitui o controle de estoque e as ordens de serviço que a TechPro já utiliza. Os módulos são independentes e, onde houver relação, guarda-se apenas o identificador externo como referência.

## 10. Decisões de teste

Os testes verificam comportamento externo do sistema. Estes precisam existir:

- Um usuário com perfil técnico não altera valor financeiro de orçamento, nem por requisição direta à API com um token de perfil inferior (RF10, RNF03). É o teste mais importante do sistema.
- Toda solicitação enviada pelo site gera um registro no painel, associado a um cliente novo ou existente; o mesmo contato enviado duas vezes não cria dois cadastros (RF01, RF02).
- Um orçamento aprovado gera exatamente uma ordem de execução, com descritivo e anexos preservados; aprovar de novo não gera uma segunda OS (RF05).
- Transição de status inválida é recusada — de concluído para novo, por exemplo — e o registro permanece no status atual, com a resposta informando qual transição não é permitida (RF03).
- Toda mudança de status grava usuário, data e hora, e o registro anterior continua consultável depois da mudança (RF09).
- O job de garantias, rodado duas vezes no mesmo dia, não gera alerta duplicado para o mesmo equipamento (RF07, RNF05).
- A janela de 30 dias é respeitada: um equipamento com garantia vencendo em 30 dias entra no alerta do dia; um vencendo em 31 não entra (RF07).
- Garantia vencida aparece como vencida, e não como coberta, quando consultada no dia seguinte ao fim do prazo (RF06).
- O Cadastro 360º traz solicitações, orçamentos, execuções e equipamentos numa mesma consulta, e carrega em até 2 segundos com a base populada com volume de teste (RF02, RNF01).
- A ordem de execução é operável em viewport de smartphone, sem rolagem horizontal nem campo inacessível (RNF04).
- Senha não aparece em texto puro na tabela de usuários nem em log (RNF02).
- Todo endpoint existente está na documentação interativa, e a documentação não descreve endpoint que não existe (RNF06).

## 11. Fora de escopo

- Login ou área logada para o cliente final. O visitante envia a solicitação sem cadastro e acompanha o andamento pelo contato da equipe.
- Envio automático de notificação por e-mail ou WhatsApp. O alerta desta versão é exibido no painel da equipe (RF07).
- Integração automática com o WhatsApp, e-mail ou telefonia da empresa. A arquitetura em módulos e APIs prepara o terreno, mas a integração não faz parte desta entrega.
- Substituição dos sistemas de estoque e de ordem de serviço já usados pela TechPro. O sistema referencia, não absorve.
- Pagamento, cobrança, emissão de nota fiscal e relatórios financeiros ou de faturamento.
- Assinatura digital do orçamento pelo cliente. A aprovação é registrada pela equipe, com usuário, data e hora.
- Agendamento automático de visitas com integração de calendário e roteirização de equipes. A execução é atribuída a um técnico; a agenda e o trajeto seguem fora do sistema.
- Monitoramento em tempo real dos equipamentos de automação instalados. O sistema registra o que foi instalado e a garantia correspondente, não se comunica com o dispositivo.
- Aplicativo nativo. O sistema é web e responsivo, utilizável no celular do técnico em campo (RNF04).
- Controle de comissão, ponto ou produtividade individual dos colaboradores.

## 12. Glossário

| Termo                  | Significado neste projeto                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Visitante              | Quem acessa o site institucional sem estar autenticado e envia uma solicitação                                      |
| Cliente                | Pessoa ou empresa que solicitou orçamento, manutenção ou suporte à TechPro                                          |
| Cadastro 360º          | A visão única do cliente: histórico de solicitações, orçamentos, execuções e equipamentos instalados em uma só tela |
| Solicitação            | Pedido de orçamento, manutenção ou suporte enviado pelo site, registrado no painel interno                          |
| Orçamento              | A proposta montada na plataforma, vinculada à solicitação que a originou                                            |
| Ordem de execução (OS) | O trabalho a ser realizado, criado automaticamente a partir de um orçamento aprovado                                |
| Funil                  | A sequência de status pela qual a solicitação avança: novo, orçamento enviado, aprovado, em execução e concluído    |
| Status                 | O estágio em que a solicitação ou o orçamento se encontra dentro do funil                                           |
| Equipamento instalado  | O ativo entregue ao cliente em uma execução, com identificação e garantia própria                                   |
| Garantia               | A cobertura de um equipamento ou serviço, com dois prazos: o do fabricante e o da TechPro                           |
| Alerta de garantia     | A notificação gerada no painel quando faltam 30 dias para o vencimento de uma garantia                              |
| Vendedor (Comercial)   | Quem atende a solicitação, monta o orçamento e conduz a negociação                                                  |
| Técnico                | Quem executa a instalação ou o serviço em campo e registra os equipamentos instalados                               |
| Administrador          | Quem gerencia perfis de acesso e responde pela operação e pelos dados financeiros                                   |
| Log                    | O registro imutável de usuário, data e hora de cada mudança relevante no sistema                                    |

---
