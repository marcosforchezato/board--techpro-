import bcrypt from "bcryptjs";
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
      { id: "S", descricao: "Site" },
      { id: "W", descricao: "WhatsApp" },
      { id: "L", descricao: "Ligação" },
      { id: "P", descricao: "Presencial" },
      { id: "E", descricao: "E-mail" },
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

  const senhaHash = await bcrypt.hash("0000", 10);

  await prisma.usuario.upsert({
    where: { nomeusuario: "admin" },
    update: {},
    create: {
      nome: "Administrador",
      perfilId: "A",
      nomeusuario: "admin",
      senha: senhaHash,
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
