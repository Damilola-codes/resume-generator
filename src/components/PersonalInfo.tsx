interface PersonalInfoProps {
    name: string,
    title: string,
    contact: string;
}

export default function PersonalInfo({name, title, contact}: PersonalInfoProps){
    return (
        <header className="border-b pb-4 mb-4 text-center">
            <h1 className='text-3xl font-bold'>{name}</h1>
            <p className="text-lg text-gray-600">{title}</p>
            <p className="text-lg text-gray-600">{contact}</p>
        </header>
    )
}