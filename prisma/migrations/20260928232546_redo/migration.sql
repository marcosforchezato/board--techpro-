-- CreateTable
CREATE TABLE "perfil" (
    "id" VARCHAR(2) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "perfilid" VARCHAR(2) NOT NULL,
    "nomeusuario" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150),
    "telefone" VARCHAR(30),
    "senha" VARCHAR(255) NOT NULL,
    "datacadastro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "tipopessoa" VARCHAR(2) NOT NULL,
    "cgc" VARCHAR(20) NOT NULL,
    "datanascimento" DATE,
    "telefone" VARCHAR(30),
    "email" VARCHAR(150),
    "endereco" VARCHAR(255),
    "cep" VARCHAR(9),
    "datacadastro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canal" (
    "id" VARCHAR(2) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "canal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiporef" (
    "id" VARCHAR(15) NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tiporef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacao" (
    "id" SERIAL NOT NULL,
    "clienteid" INTEGER NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "descricao" TEXT,
    "status" VARCHAR(20) NOT NULL,
    "datacriacao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico" (
    "id" SERIAL NOT NULL,
    "clienteid" INTEGER NOT NULL,
    "usuarioid" INTEGER,
    "canalid" VARCHAR(2) NOT NULL,
    "datahora" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT,
    "tiporef" VARCHAR(15),
    "referenciaid" INTEGER,

    CONSTRAINT "historico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orcamento" (
    "id" SERIAL NOT NULL,
    "solicitacaoid" INTEGER NOT NULL,
    "clienteid" INTEGER NOT NULL,
    "usuarioid" INTEGER,
    "datacriacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dataenvio" TIMESTAMP(6),
    "dataresposta" TIMESTAMP(6),
    "status" VARCHAR(20) NOT NULL,
    "valortotal" DECIMAL(12,2) DEFAULT 0,
    "observacoes" TEXT,

    CONSTRAINT "orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orcamentoit" (
    "id" SERIAL NOT NULL,
    "orcamentoid" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "quantidade" DECIMAL(10,2) DEFAULT 1,
    "valorunitario" DECIMAL(12,2) NOT NULL,
    "desconto" DECIMAL(12,2) DEFAULT 0,
    "acrescimo" DECIMAL(12,2) DEFAULT 0,

    CONSTRAINT "orcamentoit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordemservico" (
    "id" SERIAL NOT NULL,
    "orcamentoid" INTEGER,
    "clienteid" INTEGER NOT NULL,
    "usuarioid" INTEGER,
    "status" VARCHAR(2) NOT NULL,
    "dataplanejada" DATE,
    "dataconclusao" DATE,
    "observacoes" TEXT,

    CONSTRAINT "ordemservico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visita" (
    "id" SERIAL NOT NULL,
    "ordemservicoid" INTEGER NOT NULL,
    "usuarioid" INTEGER,
    "dataagendada" TIMESTAMP(6),
    "datarealizada" TIMESTAMP(6),
    "status" VARCHAR(2) NOT NULL,
    "valor" DECIMAL(12,2) DEFAULT 0,
    "desconto" DECIMAL(12,2) DEFAULT 0,
    "acrescimo" DECIMAL(12,2) DEFAULT 0,
    "observacoes" TEXT,

    CONSTRAINT "visita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipamento" (
    "id" SERIAL NOT NULL,
    "clienteid" INTEGER NOT NULL,
    "ordemservicoid" INTEGER,
    "tipo" VARCHAR(100),
    "marca" VARCHAR(100),
    "modelo" VARCHAR(100),
    "numeroserie" VARCHAR(100),
    "valor" DECIMAL(12,2) DEFAULT 0,
    "desconto" DECIMAL(12,2) DEFAULT 0,
    "acrescimo" DECIMAL(12,2) DEFAULT 0,
    "datainstalacao" DATE,

    CONSTRAINT "equipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "garantia" (
    "id" SERIAL NOT NULL,
    "equipamentoid" INTEGER NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "datainicio" DATE NOT NULL,
    "datafim" DATE NOT NULL,
    "status" VARCHAR(2) NOT NULL,

    CONSTRAINT "garantia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "garantianotif" (
    "id" SERIAL NOT NULL,
    "garantiaid" INTEGER NOT NULL,
    "dataenvio" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "antecedenciadias" INTEGER,
    "status" VARCHAR(2) NOT NULL,

    CONSTRAINT "garantianotif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arquivo" (
    "id" SERIAL NOT NULL,
    "tiporef" VARCHAR(15) NOT NULL,
    "referenciaid" INTEGER NOT NULL,
    "nome" VARCHAR(255),
    "caminho" VARCHAR(500) NOT NULL,
    "tipo" VARCHAR(50),
    "tamanho" INTEGER,
    "dataupload" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfil_descricao_key" ON "perfil"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nomeusuario_key" ON "usuario"("nomeusuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_telefone_key" ON "usuario"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "canal_descricao_key" ON "canal"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tiporef_descricao_key" ON "tiporef"("descricao");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_perfilid_fkey" FOREIGN KEY ("perfilid") REFERENCES "perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico" ADD CONSTRAINT "historico_canalid_fkey" FOREIGN KEY ("canalid") REFERENCES "canal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico" ADD CONSTRAINT "historico_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico" ADD CONSTRAINT "historico_tiporef_fkey" FOREIGN KEY ("tiporef") REFERENCES "tiporef"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico" ADD CONSTRAINT "historico_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orcamento" ADD CONSTRAINT "orcamento_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orcamento" ADD CONSTRAINT "orcamento_solicitacaoid_fkey" FOREIGN KEY ("solicitacaoid") REFERENCES "solicitacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orcamento" ADD CONSTRAINT "orcamento_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orcamentoit" ADD CONSTRAINT "orcamentoit_orcamentoid_fkey" FOREIGN KEY ("orcamentoid") REFERENCES "orcamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordemservico" ADD CONSTRAINT "ordemservico_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordemservico" ADD CONSTRAINT "ordemservico_orcamentoid_fkey" FOREIGN KEY ("orcamentoid") REFERENCES "orcamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordemservico" ADD CONSTRAINT "ordemservico_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "visita" ADD CONSTRAINT "visita_ordemservicoid_fkey" FOREIGN KEY ("ordemservicoid") REFERENCES "ordemservico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "visita" ADD CONSTRAINT "visita_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipamento" ADD CONSTRAINT "equipamento_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipamento" ADD CONSTRAINT "equipamento_ordemservicoid_fkey" FOREIGN KEY ("ordemservicoid") REFERENCES "ordemservico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "garantia" ADD CONSTRAINT "garantia_equipamentoid_fkey" FOREIGN KEY ("equipamentoid") REFERENCES "equipamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "garantianotif" ADD CONSTRAINT "garantianotif_garantiaid_fkey" FOREIGN KEY ("garantiaid") REFERENCES "garantia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arquivo" ADD CONSTRAINT "arquivo_tiporef_fkey" FOREIGN KEY ("tiporef") REFERENCES "tiporef"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
