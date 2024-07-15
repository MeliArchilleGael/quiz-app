import Link from "next/link";

type Subject = {
    title: string,
    description: string,
    id: number,
    slug: string,
}

const subjects: Subject[] = [
    {
        id: 1,
        title: "Here is the title ",
        slug: "subject_1",
        description: "Lorem ipsum kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfkn",
    },
    {
        id: 1,
        title: "Here is the title ",
        slug: "subject_2",
        description: "Lorem ipsum kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfkn kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfk kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfk kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfk",
    },
    {
        id: 1,
        title: "Here is the title ",
        slug: "subject_3",
        description: "Lorem ipsum kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfkn",
    },
    {
        id: 1,
        title: "Here is the title ",
        slug: "subject_4",
        description: "Lorem ipsum kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfkn",
    },
    {
        id: 1,
        title: "Here is the title ",
        slug: "subject_5",
        description: "Lorem ipsum kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfkn",
    },
    {
        id: 1,
        title: "Here is the title ",
        slug: "subject_6",
        description: "Lorem ipsum kljdlsfsnqs sdqfldsqhf sqdkhfzehdnfkn",
    }
]

export default function Page() {

    return (
        <div>
            <div className="relative font-sans bg-blue-500">
                <div
                    className="min-h-[150px] md:min-h-[200px] relative z-50 h-full mx-auto flex flex-col justify-center items-center text-center text-white">
                    <h2 className="sm:text-4xl text-2xl font-bold mb-6">WEB QUIZZ APP </h2>
                </div>
            </div>
            <div className="my-8 px-4 md:px-8">
                <div className="flex flex-wrap justify-start gap-y-8 ">
                    {subjects.map((subject: Subject, index: number) =>
                        <CardSubject key={index} subject={subject} />
                    )}
                </div>
            </div>
        </div>
    )
}


const CardSubject = ({subject}: {
    subject: Subject
}) => {

    return (
        <Link href={"/dashboard/subject/"+subject.slug} type="div" className="bg-white cursor-pointer shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm md:max-w-md rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="p-6">
                <h3 className="text-lg font-semibold">{subject.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {subject.description}
                </p>
            </div>
        </Link>
    )
}