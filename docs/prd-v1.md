# PRD - Sistema de Gestão TechPro

**Laboratório de Programação para Internet · 2026B**

---

## 1. Problema

A TechPro é uma empresa de segurança eletrônica e automação (câmeras, alarmes,
controle de acesso e automação com IA). Hoje o contato com o cliente acontece de
forma dispersa: pedidos de orçamento, chamados de suporte técnico, solicitações
de manutenção e propostas de novos equipamentos chegam por WhatsApp, telefone ou
e-mail, sem um registro único.

- A equipe da TechPro não tem uma visão ampla de quantas solicitações estão
  em aberto, nem em que estágio cada uma está.
- O cliente não tem como saber se seu pedido de orçamento ou chamado de suporte já
  foi visto, nem qual o andamento.
- O histórico de um cliente (quantos serviços já contratou, o que já foi instalado)
  não existe de maneira concreta.s
- Solicitações se perdem no meio de conversas de WhatsApp quando o volume cresce.

## 2. Solução

Um site institucional onde o visitante solicita orçamento, suporte técnico ou
manutenção através de formulários. Cada solicitação enviada vira um registro no
painel interno da TechPro, organizado com status: novo, em atendimento e
concluído. A equipe acompanha, atualiza o status e mantém um cadastro de clientes
que reúne o histórico de solicitações de cada um.

Com isso a solicitação para de ser mensagem avulsa e passa a ser registro com
status, ligado a um cliente identificável.

> **Observações**: por não ter sido possível validar o
> escopo completo diretamente com o cliente até o momento desta entrega, as
> decisões de produto abaixo (ausência de login para o cliente final, status
> dos chamados, cadastro de clientes) são suposições baseadas no briefing
> recebido. Estas serão revisadas nas versões v2 e v3 conforme o contato
> com o cliente avançar.

## 3. Escopo

| Ordem | Parte                                                           | Por que nesta posição                                          |
| ----- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| 1     | Site institucional (apresentação, serviços, contato)            | é a porta de entrada; sem ele não há solicitação para gerir    |
| 2     | Login da equipe interna e separação de acesso                   | sem isso não há a quem mostrar as solicitações                 |
| 3     | Envio de solicitação pelo site (orçamento, suporte, manutenção) | é o que tira o contato do WhatsApp e cria o primeiro registro  |
| 4     | Painel de solicitações com sistema de status                    | é a tela que resolve o problema da equipe                      |
| 5     | Cadastro de clientes com histórico                              | dá contexto à solicitação: quem é, o que já contratou          |
| 6     | Atribuição de responsável e atualização de status               | fecha o ciclo: alguém é dono da solicitação até ela concluir   |
| 7     | Módulo de sistema desativável por contrato                      | permite vender o site sozinho, sem o painel, a outros clientes |

## 4. Requisitos funcionais

| ID   | Requisito                                                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| RF01 | O sistema permite que um visitante do site envie uma solicitação de orçamento, informando nome, contato e descrição                  |
| RF02 | O sistema permite que um visitante do site envie uma solicitação de suporte técnico ou manutenção                                    |
| RF03 | O sistema permite que um colaborador da TechPro acesse o painel interno com usuário e senha                                          |
| RF04 | O sistema exibe ao colaborador a lista de solicitações organizadas por status: novo, em atendimento, concluído                       |
| RF05 | O sistema permite ao colaborador mover uma solicitação entre os status do funil                                                      |
| RF06 | O sistema associa cada solicitação a um cliente, criando um novo cadastro quando o contato é inédito                                 |
| RF07 | O sistema exibe o histórico de solicitações anteriores ao abrir o cadastro de um cliente                                             |
| RF08 | O sistema permite ao colaborador atribuir uma solicitação a um responsável da equipe                                                 |
| RF09 | O sistema registra data e hora de criação e de cada mudança de status de uma solicitação                                             |
| RF10 | O sistema impede que um colaborador sem permissão de administrador altere o cadastro de outro colaborador                            |
| RF11 | O sistema permite habilitar ou desabilitar o acesso ao painel interno por configuração de ambiente, sem alterar o site institucional |

## 5. Requisitos não funcionais

| ID    | Requisito                                                                             | Como se verifica                                                 |
| ----- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| RNF01 | A lista de solicitações carrega em até 2s com 500 registros cadastrados               | medição no navegador com base de teste                           |
| RNF02 | Senhas são armazenadas com hash, nunca em texto puro                                  | inspeção da tabela de usuários                                   |
| RNF03 | Um colaborador nunca altera dados de outro colaborador sem permissão de administrador | tentativa via chamada à API com sessão sem permissão             |
| RNF04 | A interface é utilizável em telas pequenas, tanto no site quanto no painel            | teste no navegador do celular                                    |
| RNF05 | O sistema roda em navegador atual, sem plugin                                         | Chrome e Firefox em versão corrente                              |
| RNF06 | O site institucional carrega e é navegável mesmo com o módulo de painel desabilitado  | build com a flag de sistema desligada, checagem manual das rotas |

## 6. Histórias de usuário

1. Como visitante do site, quero solicitar um orçamento pelo próprio site, para não
   precisar ligar ou mandar mensagem em horário comercial.
2. Como cliente, quero solicitar suporte técnico ou manutenção pelo site, para
   registrar meu pedido sem depender de resposta imediata por WhatsApp.
3. Como colaborador da TechPro, quero ver todas as solicitações em um só lugar,
   para não perder pedidos no meio de conversas separadas.
4. Como colaborador da TechPro, quero alterar o status dos chamados, para saber o
   que já foi atendido e o que ainda falta.
5. Como colaborador da TechPro, quero ver o histórico de um cliente ao abrir seu
   cadastro, para entender o que ele já contratou antes de atender um novo pedido.
6. Como colaborador da TechPro, quero atribuir uma solicitação a um responsável,
   para que alguém específico seja dono do atendimento até ele concluir.

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

- O acesso ao painel interno (`/login` e rotas do sistema) é controlado por uma
  configuração de ambiente, verificada tanto na interface quanto no servidor —
  esconder o link não é controle de acesso (ver RNF03).
- O site institucional e o painel interno compartilham o mesmo código-base, mas
  são módulos independentes: o site funciona normalmente com o painel
  desabilitado (RF11, RNF06).
- Autorização de ações administrativas (RF10) é verificada no servidor a cada
  requisição, nunca só na exibição do botão no front-end.
- O visitante do site não possui login nesta versão; o cadastro de cliente é
  criado a partir dos dados informados no formulário de solicitação, sem
  necessidade de senha.

## 10. Decisões de teste

Os testes verificam comportamento externo, e estes precisam existir:

- Um colaborador sem permissão de administrador não altera cadastro de outro
  colaborador (RNF03). É o teste mais importante do sistema.
- Uma solicitação enviada pelo site sempre gera um registro associado a um
  cliente, novo ou existente (RF06).
- Transição de status inválida (ex.: de concluído para novo) é recusada (RF05).
- Toda mudança de status registra data e hora (RF09).
- Com a configuração de painel desabilitada, as rotas do sistema não ficam
  acessíveis, mesmo por URL direta (RF11).
- O site institucional carrega e é navegável com o painel desabilitado (RNF06).

## 11. Fora de escopo

- Login ou área logada para o cliente final (visitante) nesta versão.
- Pagamento ou cobrança dentro do site ou do painel.
- Aplicativo nativo. O sistema é web e responsivo (RNF04).
- Agendamento automático de visitas técnicas com integração de calendário.
- Notificação automática por e-mail ou WhatsApp sobre mudança de status (a
  atualização é vista pelo colaborador dentro do painel).
- Relatórios financeiros ou de faturamento.

## 12. Glossário

| Termo         | Significado neste projeto                                                            |
| ------------- | ------------------------------------------------------------------------------------ |
| Visitante     | Quem acessa o site institucional sem estar autenticado                               |
| Cliente       | Pessoa ou empresa que solicitou orçamento, suporte ou manutenção à TechPro           |
| Colaborador   | Quem trabalha na TechPro e acessa o painel interno para atender solicitações         |
| Administrador | Colaborador com permissão adicional para gerenciar cadastros de outros colaboradores |
| Solicitação   | Pedido de orçamento, suporte técnico ou manutenção enviado pelo site                 |
| Status        | O estágio da solicitação no funil: novo, em atendimento ou concluído                 |

---
