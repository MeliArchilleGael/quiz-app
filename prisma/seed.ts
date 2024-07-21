import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    const category = await prisma.category.create({
        data: {
            categoryName: "Image",
            pointPerQuestion: 1,
        }
    })

    const subject1 =  await prisma.subject.create({
        data: {
            subjectName: "Épreuve de compréhension écrite",
            slug: "epreuve_de_compréhension_ecrite",
            description: "Lisez le document et repondez à la question.",
            durationInMinutes: 60,
            passScore: 25,
            questions: {
                create: [
                    {
                        categoryId: category.id,
                        title: "Ce document est…",
                        questionType: "multimedia",
                        mediaLink: "/assets/q1.png",
                        mediaType: "image",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "un ticket de caisse.",
                                    isCorrect:false,
                                },{
                                    optionText: "une petite annonce.",
                                    isCorrect:false,
                                },{
                                    optionText: "un programme télé.",
                                    isCorrect:true,
                                },{
                                    optionText: "un courrier d’invitation.",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },
                    {
                        categoryId: category.id,
                        title: "On peut lire cette information…",
                        questionType: "multimedia",
                        mediaLink: "/assets/q2.png",
                        mediaType: "image",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "sur un livre pour enfants.",
                                    isCorrect:false,
                                },{
                                    optionText: "sur une porte de magasin.",
                                    isCorrect:false,
                                },{
                                    optionText: "sur un produit alimentaire.",
                                    isCorrect:true,
                                },{
                                    optionText: "sur une étiquette de vêtement.",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },
                    {
                        categoryId: category.id,
                        title: "L’auteur de ce courriel…",
                        questionType: "multimedia",
                        mediaLink: "/assets/q3.png",
                        mediaType: "image",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "critique une décision.",
                                    isCorrect:false,
                                },{
                                    optionText: "propose une réunion.",
                                    isCorrect:false,
                                },{
                                    optionText: "rassure ses collègues.",
                                    isCorrect:true,
                                },{
                                    optionText: "annonce des changements.",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },
                    {
                        categoryId: category.id,
                        title: "Ce document annonce…",
                        questionType: "multimedia",
                        mediaLink: "/assets/q4.png",
                        mediaType: "image",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "une performance artistique.",
                                    isCorrect:false,
                                },{
                                    optionText: "un changement de politique.",
                                    isCorrect:true,
                                },{
                                    optionText: "un bilan sur l’environnement.",
                                    isCorrect:false,
                                },{
                                    optionText: "une action de communication.",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },
                ]
            }
        }
    })

    const subject2 =  await prisma.subject.create({
        data: {
            subjectName: "Question a réponse ouverte",
            slug: "question_a_réponse_ouverte",
            description: "Dans chaque phrase, indiquez le mot ou le groupe de mots manquant.",
            durationInMinutes: 30,
            passScore: 25,
            questions: {
                create: [
                    {
                        categoryId: category.id,
                        title: "Vancouver et Toronto sont des ................ du Canada.",
                        questionType: "texte",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "pays",
                                    isCorrect:false,
                                },{
                                    optionText: "villes",
                                    isCorrect:true,
                                },{
                                    optionText: "origines",
                                    isCorrect:false,
                                },{
                                    optionText: "nationalités",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },

                    {
                        categoryId: category.id,
                        title: "Je suis très en retard, je vous demande ................ .",
                        questionType: "texte",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "merci",
                                    isCorrect:false,
                                },{
                                    optionText: "désolé",
                                    isCorrect:false,
                                },{
                                    optionText: "pardon",
                                    isCorrect:false,
                                },{
                                    optionText: "excuses",
                                    isCorrect:true,
                                },
                            ]
                        }
                    },

                    {
                        categoryId: category.id,
                        title: "Sorti en 1998, Déserts est le premier film ........... par Malcom J. Reilly.",
                        questionType: "texte",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "édité",
                                    isCorrect:true,
                                },{
                                    optionText: "publié",
                                    isCorrect:false,
                                },{
                                    optionText: "réalisé",
                                    isCorrect:false,
                                },{
                                    optionText: "procédé",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },

                    {
                        categoryId: category.id,
                        title: "Bruder, le roman culte de Karlie Schwitz, ressort dans une nouvelle ...........en français.",
                        questionType: "texte",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "traduction",
                                    isCorrect:false,
                                },{
                                    optionText: "translation",
                                    isCorrect:false,
                                },{
                                    optionText: "conversion",
                                    isCorrect:false,
                                },{
                                    optionText: "interprétation",
                                    isCorrect:true,
                                },
                            ]
                        }
                    },

                    {
                        categoryId: category.id,
                        title: "Le Salon de l’hôtellerie est une formidable ....... de rencontrer des professionnels d’un secteur qui embauche.",
                        questionType: "texte",
                        durationInSeconds: 0,
                        multipleChoice: false,
                        options: {
                            create: [
                                {
                                    optionText: "alternative",
                                    isCorrect:false,
                                },{
                                    optionText: "éventualité",
                                    isCorrect:true,
                                },{
                                    optionText: "opportunité",
                                    isCorrect:false,
                                },{
                                    optionText: "circonstance",
                                    isCorrect:false,
                                },
                            ]
                        }
                    },
                ]
            }
        }
    })

    console.log({ subject1, subject2 })
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