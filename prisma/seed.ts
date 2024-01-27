import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
async function main() {
    await prisma.admin.create({
        data: {
            username: 'Meru',
            password: await bcrypt.hash('mahameru', 12)
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
