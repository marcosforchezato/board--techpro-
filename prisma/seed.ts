import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.perfil.createMany({
    data: [
      { id: "V", descricao: "Vendedor", permissoes: "", status: "A" },
      { id: "T", descricao: "Técnico", permissoes: "", status: "A" },
      { id: "A", descricao: "Administrador", permissoes: "T", status: "A" },
    ],
    skipDuplicates: true,
  });

  await prisma.canal.createMany({
    data: [
      {
        id: "S",
        descricao: "Site",
        icone: "Globe",
        cor: "#0F8BFF",
        status: "A",
      },
      {
        id: "W",
        descricao: "WhatsApp",
        icone: "MessageCircle",
        cor: "#25D366",
        status: "A",
      },
      {
        id: "L",
        descricao: "Ligação",
        icone: "Phone",
        cor: "#2AAE7E",
        status: "A",
      },
      {
        id: "P",
        descricao: "Presencial",
        icone: "Building2",
        cor: "#F59E0B",
        status: "A",
      },
      {
        id: "E",
        descricao: "E-mail",
        icone: "Mail",
        cor: "#A855F7",
        status: "A",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.tipoRef.createMany({
    data: [
      { id: "SOL", descricao: "Solicitação", status: "A" },
      { id: "ORC", descricao: "Orçamento", status: "A" },
      { id: "OS", descricao: "Ordem de serviço", status: "A" },
      { id: "GAR", descricao: "Garantia", status: "A" },
      { id: "EQP", descricao: "Equipamento", status: "A" },
    ],
    skipDuplicates: true,
  });

  const senhaHash = await bcrypt.hash("0000", 10);

  await prisma.usuario.upsert({
    where: { nomeusuario: "admin" },
    update: {
      perfilId: "A",
      status: "A",
    },
    create: {
      nome: "Administrador",
      perfilId: "A",
      nomeusuario: "admin",
      senha: senhaHash,
      status: "A",
    },
  });

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
