import { GenderedString } from '../model/gendered_strings'

// kontroler.php?_action=home/index - "Podpięcia"
const linkageBoxStrings: GenderedString[] = [
    {
        feminine: 'zapisana',
        masculine: 'zapisany',
        neutral: 'zapisanx',
    },
]

// Generic: "studenta"/"studentki"
const genericStudentStrings: GenderedString[] = [
    {
        feminine: 'studentki',
        masculine: 'studenta',
        neutral: 'osoby studenckiej',
    },
]

// Registration strings
const registrationStrings: GenderedString[] = [
    {
        feminine: 'otrzymałaś',
        masculine: 'otrzymałeś',
        neutral: 'otrzymałxś',
    },
    {
        feminine: 'zarejestrowana',
        masculine: 'zarejestrowany',
        neutral: 'zarejestrowanx',
    },
    {
        feminine: 'zarejestrowałam',
        masculine: 'zarejestrowałem',
        neutral: 'zarejestrowałxm',
    },
    {
        feminine: 'składałaś',
        masculine: 'składałeś',
        neutral: 'składałxś',
    },
    {
        feminine: 'wyrejestrowałam',
        masculine: 'wyrejestrowałem',
        neutral: 'wyrejestrowałxm',
    }
]

// Grades strings
const gradesStrings: GenderedString[] = [
    {
        feminine: 'zaliczałaś',
        masculine: 'zaliczałeś',
        neutral: 'zaliczałxś',
    },
    {
        feminine: 'poprawiłaś',
        masculine: 'poprawiłeś',
        neutral: 'poprawiłxś',
    },
    {
        feminine: 'podpiąłaś',
        masculine: 'podpiąłeś',
        neutral: 'podpiąłxś',
    }
]

// Decisions strings
const decisionsStrings: GenderedString[] = [
    {
        feminine: 'powinnaś',
        masculine: 'powinieneś',
        neutral: 'powinnxś', // TODO: check if this is correct
    },
]

// Groups
const groupsStrings: GenderedString[] = [
    {
        feminine: 'uczestniczką',
        masculine: 'uczestnikiem',
        neutral: 'osobą uczestniczącą', // TODO: check if this is correct
    }
]

// Scholarships strings
const scholarshipsStrings: GenderedString[] = [
    {
        feminine: 'odebrałaś',
        masculine: 'odebrałeś',
        neutral: 'odebrałxś',
    },
    {
        feminine: 'zaliczyłaś',
        masculine: 'zaliczyłeś',
        neutral: 'zaliczyłxś',
    }
]

const allUsosStrings: GenderedString[] = [
    ...linkageBoxStrings,
    ...genericStudentStrings,
    ...registrationStrings,
    ...gradesStrings,
    ...groupsStrings,
    ...decisionsStrings,
    ...scholarshipsStrings,
]

export default allUsosStrings