import { prisma } from "./src/lib/prisma";
async function main() {
    // Create a new user with a post
    const post = await prisma.post.create({
        data: {
            title: "Titanic",
            content: "Titanic is the biggest ship in the universe",
        },
    });
    console.log("Created post:", post);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
