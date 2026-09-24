import { prisma } from "../lib/prisma";

async function main() {
  await prisma.perfil.createMany({
    data: [
      { id: "V", descricao: "Vendedor" },
      { id: "T", descricao: "Técnico" },
      { id: "A", descricao: "Administrador" },
    ],
    skipDuplicates: true,
  });

  await prisma.canal.createMany({
    data: [
      { id: "S", nome: "Site" },
      { id: "W", nome: "WhatsApp" },
      { id: "L", nome: "Ligação" },
      { id: "P", nome: "Presencial" },
      { id: "E", nome: "E-mail" },
    ],
    skipDuplicates: true,
  });

  await prisma.tipoRef.createMany({
    data: [
      { id: "SOL", descricao: "Solicitação" },
      { id: "ORC", descricao: "Orçamento" },
      { id: "OS", descricao: "Ordem de serviço" },
      { id: "GAR", descricao: "Garantia" },
      { id: "EQP", descricao: "Equipamento" },
    ],
    skipDuplicates: true,
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
