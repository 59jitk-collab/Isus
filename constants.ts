
import { SamplePaper } from "./types";

export const subjectChapters: { [key: string]: string[] } = {
    'Mathematics': ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'],
    'Science': ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-Metals', 'Carbon & its Compounds', 'Life Processes', 'Control & Coordination', 'How Do Organisms Reproduce?', 'Heredity', 'Light Reflection & Refraction', 'Human Eye & Colourful World', 'Electricity', 'Magnetic Effects of Electric Current', 'Sources of Energy', 'Our Environment', 'Sustainable Management of Natural Resources'],
    'Social Science': ['The Rise of Nationalism in Europe', 'Nationalism in India', 'The Making of a Global World', 'Age of Industrialisation', 'Print Culture & the Modern World', 'Resources & Development', 'Water Resources', 'Agriculture', 'Power Sharing', 'Federalism', 'Democracy & Diversity', 'Gender, Religion & Caste', 'Political Parties', 'Outcomes of Democracy', 'Development', 'Sectors of Indian Economy', 'Money & Credit', 'Globalisation & the Indian Economy', 'Consumer Rights'],
    'English': ['A Letter to God', 'Nelson Mandela', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'The Hundred Dresses I & II', 'Glimpses of India', 'Mijbil the Otter', 'The Trees', 'Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo', 'How to Tell Wild Animals', 'The Ball Poem'],
    'Hindi': ['सूरदास के पद', 'राम-लक्ष्मण-परशुराम संवाद', 'सवैये और कवित्त', 'आत्मकथ्य', 'उत्साह और अट नहीं रही है', 'फसल और यह दंतुरित मुसकान', 'संगतकार', 'नेताजी का चश्मा', 'बालगोबिन भगत', 'लखनवी अंदाज़', 'मानवीय करुणा की दिव्य चमक'],
    'Computer': ['Internet Basics', 'HTML Fundamentals', 'CSS Styling', 'Introduction to Python', 'Data Handling', 'Cyber Ethics']
};

export const subjects = Object.keys(subjectChapters);

export const subjectIcons: { [key: string]: { icon: string; color: string } } = {
    'Mathematics': { icon: 'fas fa-calculator', color: '#3498db' },
    'Science': { icon: 'fas fa-flask', color: '#2ecc71' },
    'Social Science': { icon: 'fas fa-landmark', color: '#e74c3c' },
    'English': { icon: 'fas fa-book-open', color: '#f1c40f' },
    'Hindi': { icon: 'fas fa-om', color: '#e67e22' },
    'Computer': { icon: 'fas fa-laptop-code', color: '#9b59b6' }
};

export const ncertLinks: { [subject: string]: { [chapter: string]: { [type: string]: string } } } = {
    'Mathematics': {
        'Real Numbers': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh101.pdf' },
        'Polynomials': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh102.pdf' },
        'Pair of Linear Equations': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh103.pdf' },
        'Quadratic Equations': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh104.pdf' },
        'Arithmetic Progressions': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh105.pdf' },
        'Triangles': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh106.pdf' },
        'Coordinate Geometry': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh107.pdf' },
        'Introduction to Trigonometry': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh108.pdf' },
        'Some Applications of Trigonometry': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh109.pdf' },
        'Circles': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh110.pdf' },
        'Areas Related to Circles': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh111.pdf' },
        'Surface Areas and Volumes': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh112.pdf' },
        'Statistics': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh113.pdf' },
        'Probability': { 'Book': 'https://ncert.nic.in/textbook/pdf/jemh114.pdf' }
    },
    'Science': {
        'Chemical Reactions & Equations': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc101.pdf' },
        'Acids, Bases & Salts': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc102.pdf' },
        'Metals & Non-Metals': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc103.pdf' },
        'Carbon & its Compounds': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc104.pdf' },
        'Life Processes': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc105.pdf' },
        'Control & Coordination': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc106.pdf' },
        'How Do Organisms Reproduce?': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc107.pdf' },
        'Heredity': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc108.pdf' },
        'Light Reflection & Refraction': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc109.pdf' },
        'Human Eye & Colourful World': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc110.pdf' },
        'Electricity': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc111.pdf' },
        'Magnetic Effects of Electric Current': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc112.pdf' },
        'Our Environment': { 'Book': 'https://ncert.nic.in/textbook/pdf/jesc113.pdf' },
    },
    'Social Science': {
        'The Rise of Nationalism in Europe': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess301.pdf' },
        'Nationalism in India': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess302.pdf' },
        'The Making of a Global World': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess303.pdf' },
        'Age of Industrialisation': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess304.pdf' },
        'Print Culture & the Modern World': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess305.pdf' },
        'Resources & Development': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess101.pdf' },
        'Water Resources': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess103.pdf' },
        'Agriculture': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess104.pdf' },
        'Power Sharing': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess201.pdf' },
        'Federalism': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess202.pdf' },
        'Democracy & Diversity': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess203.pdf' },
        'Gender, Religion & Caste': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess204.pdf' },
        'Political Parties': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess206.pdf' },
        'Outcomes of Democracy': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess207.pdf' },
        'Development': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess401.pdf' },
        'Sectors of Indian Economy': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess402.pdf' },
        'Money & Credit': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess403.pdf' },
        'Globalisation & the Indian Economy': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess404.pdf' },
        'Consumer Rights': { 'Book': 'https://ncert.nic.in/textbook/pdf/jess405.pdf' },
    },
    'English': {
        'A Letter to God': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff101.pdf' },
        'Nelson Mandela': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff102.pdf' },
        'Two Stories about Flying': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff103.pdf' },
        'From the Diary of Anne Frank': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff104.pdf' },
        'The Hundred Dresses I & II': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff105.pdf' },
        'Glimpses of India': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff107.pdf' },
        'Mijbil the Otter': { 'Book': 'https://ncert.nic.in/textbook/pdf/jeff108.pdf' },
    },
    'Hindi': {
        'सूरदास के पद': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh101.pdf' },
        'राम-लक्ष्मण-परशुराम संवाद': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh102.pdf' },
        'सवैये और कवित्त': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh103.pdf' },
        'आत्मकथ्य': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh104.pdf' },
        'उत्साह और अट नहीं रही है': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh105.pdf' },
        'फसल और यह दंतुरित मुसकान': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh106.pdf' },
        'संगतकार': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh109.pdf' },
        'नेताजी का चश्मा': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh110.pdf' },
        'बालगोबिन भगत': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh111.pdf' },
        'लखनवी अंदाज़': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh112.pdf' },
        'मानवीय करुणा की दिव्य चमक': { 'Book': 'https://ncert.nic.in/textbook/pdf/jhhh113.pdf' },
    },
    'Computer': {},
};

export const mcqData: { [subject: string]: { [chapter: string]: { mcq: any[], pyq: any[], extra?: any[] } } } = {
    'Mathematics': {
        'Real Numbers': {
            'mcq': [
                { question: "The largest number which divides 70 and 125, leaving remainders 5 and 8 respectively, is:", options: ["13", "65", "875", "1750"], answerIndex: 0 },
                { question: "If two positive integers a and b are written as a = x³y² and b = xy³; x, y are prime numbers, then HCF(a, b) is:", options: ["xy", "xy²", "x³y³", "x²y²"], answerIndex: 1 },
                { question: "The decimal expansion of the rational number 14587/1250 will terminate after how many decimal places?", options: ["1", "2", "3", "4"], answerIndex: 3 },
                { question: "If p and q are two co-prime numbers, then p² and q² are:", options: ["Co-prime", "Even", "Odd", "Not enough information"], answerIndex: 0 },
                { question: "If LCM(96, 404) = 9696, then HCF(96, 404) is:", options: ["1", "2", "3", "4"], answerIndex: 3 }
            ],
            'pyq': [
                { question: "If n is a natural number, then 9²ⁿ - 4²ⁿ is always divisible by:", options: ["5", "13", "Both 5 and 13", "None of these"], answerIndex: 2 },
                { question: "The product of a non-zero rational number and an irrational number is:", options: ["always rational", "always irrational", "1", "rational or irrational"], answerIndex: 1 },
                { question: "The largest number which divides 615 and 963 leaving remainder 6 in each case is:", options: ["87", "92", "99", "95"], answerIndex: 0 },
                { question: "If HCF(26, 169) = 13, then LCM(26, 169) is:", options: ["26", "52", "338", "13"], answerIndex: 2 },
                { question: "The decimal expansion of the rational number 33/(2² * 5) will terminate after:", options: ["one decimal place", "two decimal places", "three decimal places", "more than three"], answerIndex: 1 },
                { question: "Which of the following is not irrational?", options: ["√2 + √3", "(√2 - 1)²", "2√3 + 5", "(√2-1)(√2+1)"], answerIndex: 3 },
                { question: "If p is a prime number, then √p is:", options: ["rational", "irrational", "integer", "None of these"], answerIndex: 1 },
                { question: "The sum of the exponents of the prime factors in the prime factorization of 196 is:", options: ["1", "2", "3", "4"], answerIndex: 3 },
                { question: "If a and b are two positive integers such that the least prime factor of a is 3 and the least prime factor of b is 5, then the least prime factor of (a+b) is:", options: ["2", "3", "5", "8"], answerIndex: 0 },
                { question: "For any two positive integers a and b, HCF(a, b) * LCM(a, b) is equal to:", options: ["a+b", "a * b", "a/b", "None of these"], answerIndex: 1 }
            ],
            'extra': [
                { question: "The HCF of 8, 9, 25 is:", options: ["8", "9", "25", "1"], answerIndex: 3 },
                { question: "Which of the following is an irrational number?", options: ["√16", "√(12/3)", "√12", "√100"], answerIndex: 2 }
            ]
        },
        'Polynomials': {
            'mcq': [
                { question: "If one zero of the polynomial p(x) = kx² + 3x + k is 2, then the value of k is:", options: ["6/7", "-6/7", "-7/6", "7/6"], answerIndex: 1 },
                { question: "The number of polynomials having zeroes -2 and 5 is:", options: ["1", "2", "3", "more than 3"], answerIndex: 3 },
                { question: "If the zeroes of the quadratic polynomial x² + (a+1)x + b are 2 and -3, then:", options: ["a=-7, b=-1", "a=0, b=-6", "a=2, b=-6", "a=-2, b=-6"], answerIndex: 1 },
                { question: "The product of the zeroes of the cubic polynomial ax³ + bx² + cx + d is:", options: ["c/a", "-b/a", "-c/a", "-d/a"], answerIndex: 3 },
                { question: "A quadratic polynomial whose sum and product of zeroes are 2 and -1/3 respectively, is:", options: ["3x² - 5x - 3", "3x² - 6x - 1", "x² - 2x + 3", "3x² + 6x - 1"], answerIndex: 1 }
            ],
            'pyq': [
                { question: "If α and β are the zeroes of the polynomial f(x) = x² - 5x + k such that α - β = 1, then the value of k is:", options: ["6", "8", "10", "12"], answerIndex: 0 },
                { question: "The zeroes of the quadratic polynomial x² + 99x + 127 are:", options: ["both positive", "both negative", "one positive and one negative", "both equal"], answerIndex: 1 },
                { question: "If one of the zeroes of a quadratic polynomial of the form x² + ax + b is the negative of the other, then it:", options: ["has no linear term and the constant term is negative.", "has no linear term and the constant term is positive.", "can have a linear term but the constant term is negative.", "can have a linear term but the constant term is positive."], answerIndex: 0 }
            ],
            'extra': [
                { question: "The value of the polynomial 5x - 4x² + 3 at x = -1 is:", options: ["-6", "6", "2", "-2"], answerIndex: 0 },
                { question: "If p(x) = x + 3, then p(x) + p(-x) is equal to:", options: ["3", "2x", "0", "6"], answerIndex: 3 }
            ]
        },
        'Pair of Linear Equations': { 
            'mcq': [
                { question: "The pair of equations y=0 and y=-7 has:", options: ["One solution", "Two solutions", "Infinitely many solutions", "No solution"], answerIndex: 3 },
                { question: "If the lines given by 3x + 2ky = 2 and 2x + 5y = 1 are parallel, then the value of k is:", options: ["5/4", "2/5", "15/4", "3/2"], answerIndex: 2 }
            ],
            'pyq': [
                { question: "For what value of k, do the equations 3x - y + 8 = 0 and 6x - ky = -16 represent coincident lines?", options: ["1/2", "-1/2", "2", "-2"], answerIndex: 2 },
                { question: "The pair of equations x + 2y + 5 = 0 and -3x - 6y + 1 = 0 has:", options: ["a unique solution", "exactly two solutions", "infinitely many solutions", "no solution"], answerIndex: 3 },
                { question: "If a pair of linear equations is consistent, then the lines will be:", options: ["parallel", "always coincident", "intersecting or coincident", "always intersecting"], answerIndex: 2 }
            ],
            'extra': [
                { question: "The pair of linear equations 2x + 3y = 5 and 4x + 6y = 10 is:", options: ["consistent", "inconsistent", "dependent consistent", "none of these"], answerIndex: 2 }
            ]
        },
        'Quadratic Equations': {
            'mcq': [
                { question: "The roots of the equation x² - 3x - 10 = 0 are:", options: ["2, -5", "5, -2", "-5, -2", "5, 2"], answerIndex: 1 },
                { question: "The nature of the roots of the quadratic equation 2x² - 4x + 3 = 0 is:", options: ["Real and distinct", "Real and equal", "No real roots", "Cannot be determined"], answerIndex: 2 }
            ],
            'pyq': [
                { question: "Which of the following is not a quadratic equation?", options: ["2(x-1)² = 4x² - 2x + 1", "2x - x² = x² + 5", "(√2x + √3)² = 3x² - 5x", "(x² + 2x)² = x⁴ + 3 + 4x³"], answerIndex: 3 },
                { question: "The values of k for which the quadratic equation 2x² - kx + k = 0 has equal roots is:", options: ["0 only", "8 only", "0, 8", "0, 4"], answerIndex: 2 },
                { question: "The value of √6 + √6 + √6 + ... is:", options: ["4", "3", "-2", "3.5"], answerIndex: 1 },
                { question: "If the roots of the equation (a² + b²)x² - 2b(a+c)x + (b² + c²) = 0 are equal, then:", options: ["2b = a+c", "b² = ac", "b = 2ac / (a+c)", "b = ac"], answerIndex: 1 },
                { question: "If the equation x² - kx + 1 = 0 has no real roots, then:", options: ["k > 2", "k < -2", "-2 < k < 2", "-3 < k < 3"], answerIndex: 2 },
                { question: "If one root of the quadratic equation 2x² + kx - 6 = 0 is 2, the value of k is:", options: ["1", "-1", "2", "-2"], answerIndex: 3 },
                { question: "The sum of the roots of the quadratic equation 3x² - 9x + 5 = 0 is:", options: ["3", "-3", "9/2", "5/3"], answerIndex: 0 },
                { question: "If the discriminant of the equation 6x² - bx + 2 = 0 is 1, then the value of b is:", options: ["7", "-7", "±7", "±√5"], answerIndex: 2 },
                { question: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. The uniform speed of the train is:", options: ["30 km/h", "35 km/h", "40 km/h", "45 km/h"], answerIndex: 2 },
                { question: "If the sum of the squares of two consecutive natural numbers is 313, then the numbers are:", options: ["12, 13", "13, 14", "11, 12", "14, 15"], answerIndex: 0 },
                { question: "The product of two consecutive positive integers is 306. The integers are:", options: ["17, 18", "16, 17", "18, 19", "15, 16"], answerIndex: 0 }
            ],
            'extra': [
                { question: "The quadratic equation ax² + bx + c = 0 has two distinct real roots if:", options: ["b² - 4ac > 0", "b² - 4ac < 0", "b² - 4ac = 0", "b² - 4ac >= 0"], answerIndex: 0 }
            ]
        },
        'Arithmetic Progressions': { 
            'mcq': [
                 { question: "The common difference of the AP: 1/p, (1-p)/p, (1-2p)/p, ... is:", options: ["p", "-p", "-1", "1"], answerIndex: 2 },
                 { question: "If the sum of the first 'n' terms of an AP is given by Sn = 2n² + n, then its nth term is:", options: ["4n-1", "4n+1", "2n-1", "2n+1"], answerIndex: 0 },
            ],
            'pyq': [
                { question: "The 10th term of the AP: 2, 7, 12, ... is:", options: ["47", "52", "42", "57"], answerIndex: 0 },
                { question: "Which term of the AP: 21, 18, 15, ... is -81?", options: ["33rd", "34th", "35th", "36th"], answerIndex: 2 },
                { question: "The sum of first 10 terms of the AP: 2, 7, 12, ... is:", options: ["245", "250", "255", "260"], answerIndex: 0 },
                { question: "If the sum of n terms of an AP is 3n² + 5n, then its common difference is:", options: ["4", "5", "6", "7"], answerIndex: 2 },
                { question: "The number of multiples of 4 between 10 and 250 is:", options: ["50", "55", "60", "65"], answerIndex: 2 },
                { question: "The first term of an AP is 5, the last term is 45 and the sum is 400. The number of terms is:", options: ["8", "10", "16", "20"], answerIndex: 2 },
                { question: "If 2x, x+10, 3x+2 are in AP, then the value of x is:", options: ["4", "5", "6", "7"], answerIndex: 2 },
                { question: "The sum of the first 15 multiples of 8 is:", options: ["960", "860", "900", "1020"], answerIndex: 0 },
                { question: "How many two-digit numbers are divisible by 3?", options: ["29", "30", "31", "32"], answerIndex: 1 },
                { question: "In an AP, if d = -4, n = 7, a_n = 4, then a is:", options: ["20", "24", "28", "32"], answerIndex: 2 },
                { question: "The 7th term from the end of the AP: 5, 9, 13, ..., 185 is:", options: ["161", "165", "157", "153"], answerIndex: 0 }
            ], 
            'extra': [] 
        },
        'Triangles': { 
            'mcq': [
                { question: "Two polygons of the same number of sides are similar, if their corresponding angles are ______ and their corresponding sides are in the _______ ratio.", options: ["equal, same", "unequal, different", "equal, different", "unequal, same"], answerIndex: 0 },
                { question: "In triangle ABC, if AB = 6√3 cm, AC = 12 cm and BC = 6 cm, then the angle B is:", options: ["120°", "60°", "90°", "45°"], answerIndex: 2 },
            ],
            'pyq': [
                { question: "In ΔABC and ΔDEF, ∠B = ∠E, ∠F = ∠C and AB = 3DE. Then, the two triangles are:", options: ["congruent but not similar", "similar but not congruent", "neither congruent nor similar", "congruent as well as similar"], answerIndex: 1 },
                { question: "If in two triangles ABC and PQR, AB/QR = BC/PR = CA/PQ, then:", options: ["ΔPQR ~ ΔCAB", "ΔPQR ~ ΔABC", "ΔCBA ~ ΔPQR", "ΔBCA ~ ΔPQR"], answerIndex: 0 },
                { question: "In a triangle, if square of one side is equal to the sum of the squares of the other two sides, then the angle opposite the first side is a right angle. This theorem is called:", options: ["Pythagoras theorem", "Converse of Pythagoras theorem", "Thales theorem", "Converse of Thales theorem"], answerIndex: 1 },
                { question: "In ΔABC, DE || BC. If AD=1.5 cm, DB=3 cm and AE=1 cm, then EC is:", options: ["1.5 cm", "2 cm", "2.5 cm", "3 cm"], answerIndex: 1 },
                { question: "The lengths of the diagonals of a rhombus are 16 cm and 12 cm. Then, the length of the side of the rhombus is:", options: ["9 cm", "10 cm", "8 cm", "20 cm"], answerIndex: 1 },
            ],
            'extra': [] 
        },
        'Coordinate Geometry': { 
            'mcq': [
                { question: "The point which divides the line segment joining the points (7, –6) and (3, 4) in ratio 1 : 2 internally lies in the:", options: ["I quadrant", "II quadrant", "III quadrant", "IV quadrant"], answerIndex: 3 },
                { question: "The point which lies on the perpendicular bisector of the line segment joining the points A(–2, –5) and B(2, 5) is:", options: ["(0, 0)", "(0, 2)", "(2, 0)", "(–2, 0)"], answerIndex: 0 },
            ],
            'pyq': [
                { question: "The distance of the point P(2, 3) from the x-axis is:", options: ["2", "3", "1", "5"], answerIndex: 1 },
                { question: "The distance between the points A(0, 6) and B(0, -2) is:", options: ["6", "8", "4", "2"], answerIndex: 1 },
                { question: "The coordinates of the point which divides the join of (-1, 7) and (4, -3) in the ratio 2:3 is:", options: ["(1, 3)", "(2, 3)", "(3, 1)", "(-1, -3)"], answerIndex: 0 },
                { question: "The coordinates of the midpoint of the line segment joining the points (-5, 7) and (-1, 3) are:", options: ["(-3, 5)", "(-2, 5)", "(3, -5)", "(2, -5)"], answerIndex: 0 },
                { question: "The area of the triangle whose vertices are A(5, 2), B(4, 7) and C(7, -4) is:", options: ["2 sq. units", "1.5 sq. units", "2.5 sq. units", "3 sq. units"], answerIndex: 0 },
                { question: "If the points (7, -2), (5, 1) and (3, k) are collinear, then the value of k is:", options: ["2", "3", "4", "5"], answerIndex: 2 },
                { question: "The ratio in which the y-axis divides the line segment joining the points (5, -6) and (-1, -4) is:", options: ["1:5", "5:1", "1:1", "2:3"], answerIndex: 1 },
                { question: "The distance of the point (-6, 8) from the origin is:", options: ["8", "2√7", "10", "6"], answerIndex: 2 },
                { question: "If the distance between the points (4, p) and (1, 0) is 5, then the value of p is:", options: ["4 only", "±4", " -4 only", "0"], answerIndex: 1 },
                { question: "The fourth vertex D of a parallelogram ABCD whose three vertices are A(-2, 3), B(6, 7) and C(8, 3) is:", options: ["(0, 1)", "(0, -1)", "(-1, 0)", "(1, 0)"], answerIndex: 1 },
                { question: "The perimeter of a triangle with vertices (0, 4), (0, 0) and (3, 0) is:", options: ["5", "12", "11", "7+√5"], answerIndex: 1 }
            ], 
            'extra': [] 
        },
        'Introduction to Trigonometry': { 
            'mcq': [
                { question: "The value of sin²30° - cos²30° is:", options: ["-1/2", "√3/2", "3/2", "2/3"], answerIndex: 0 },
                { question: "If 3cotθ = 2, then the value of tanθ is:", options: ["2/3", "3/2", "3/√13", "2/√13"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "If cosA = 4/5, then the value of tanA is:", options: ["3/5", "3/4", "4/3", "5/3"], answerIndex: 1 },
                { question: "If sinA = 1/2, then the value of cotA is:", options: ["√3", "1/√3", "√3/2", "1"], answerIndex: 0 },
                { question: "The value of (sin30° + cos30°) - (sin60° + cos60°) is:", options: ["-1", "0", "1", "2"], answerIndex: 1 },
                { question: "The value of tan60° / cot30° is:", options: ["0", "1", "2", "3"], answerIndex: 1 },
                { question: "If sinθ - cosθ = 0, then the value of (sin⁴θ + cos⁴θ) is:", options: ["1", "3/4", "1/2", "1/4"], answerIndex: 2 },
                { question: "9sec²A - 9tan²A is equal to:", options: ["1", "9", "8", "0"], answerIndex: 1 },
            ],
            'extra': [] 
        },
        'Some Applications of Trigonometry': { 
            'mcq': [
                { question: "If the length of the shadow of a tower is √3 times its height, then the angle of elevation of the sun is:", options: ["30°", "45°", "60°", "90°"], answerIndex: 0 },
            ],
            'pyq': [
                { question: "The angle of elevation of the top of a tower from a point on the ground, which is 30 m away from the foot of the tower, is 30°. The height of the tower is:", options: ["30 m", "10√3 m", "30√3 m", "10 m"], answerIndex: 1 },
                { question: "A kite is flying at a height of 60 m above the ground. The string attached to the kite is temporarily tied to a point on the ground. The inclination of the string with the ground is 60°. The length of the string is:", options: ["40√3 m", "60√3 m", "120 m", "120√3 m"], answerIndex: 0 },
                { question: "The shadow of a tower is equal to its height at 10:45 a.m. The sun's altitude is:", options: ["30°", "45°", "60°", "90°"], answerIndex: 1 },
                { question: "The angle of depression of a car, standing on the ground, from the top of a 75 m high tower, is 30°. The distance of the car from the base of the tower is:", options: ["25√3 m", "50√3 m", "75√3 m", "150 m"], answerIndex: 2 },
            ],
            'extra': [] 
        },
        'Circles': { 
            'mcq': [
                { question: "A tangent PQ at a point P of a circle of radius 5 cm meets a line through the centre O at a point Q so that OQ = 12 cm. Length PQ is:", options: ["12 cm", "13 cm", "8.5 cm", "√119 cm"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "From a point Q, the length of the tangent to a circle is 24 cm and the distance of Q from the centre is 25 cm. The radius of the circle is:", options: ["7 cm", "12 cm", "15 cm", "24.5 cm"], answerIndex: 0 },
                { question: "In the given figure, if TP and TQ are the two tangents to a circle with centre O so that ∠POQ = 110°, then ∠PTQ is equal to:", options: ["60°", "70°", "80°", "90°"], answerIndex: 1 },
                { question: "If tangents PA and PB from a point P to a circle with centre O are inclined to each other at an angle of 80°, then ∠POA is equal to:", options: ["50°", "60°", "70°", "80°"], answerIndex: 0 },
                { question: "A circle can have ______ parallel tangents at the most.", options: ["one", "two", "three", "infinite"], answerIndex: 1 },
                { question: "The length of a tangent from a point A at a distance 5 cm from the centre of the circle is 4 cm. The radius of the circle is:", options: ["3 cm", "4 cm", "5 cm", "6 cm"], answerIndex: 0 },
            ],
            'extra': [] 
        },
        'Areas Related to Circles': { 
            'mcq': [
                 { question: "The area of a quadrant of a circle with circumference of 22 cm is:", options: ["77 cm²", "77/8 cm²", "35.5 cm²", "77/2 cm²"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "If the perimeter and the area of a circle are numerically equal, then the radius of the circle is:", options: ["2 units", "π units", "4 units", "7 units"], answerIndex: 0 },
                { question: "The area of a circle that can be inscribed in a square of side 6 cm is:", options: ["36π cm²", "18π cm²", "12π cm²", "9π cm²"], answerIndex: 3 },
                { question: "The area of the largest triangle that can be inscribed in a semi-circle of radius r is:", options: ["r²", "2r²", "r³/2", "r²/2"], answerIndex: 0 },
                { question: "The area of the sector of a circle with radius 6 cm and angle 60° is:", options: ["132/7 cm²", "142/7 cm²", "152/7 cm²", "162/7 cm²"], answerIndex: 0 },
                { question: "In a circle of radius 21 cm, an arc subtends an angle of 60° at the centre. The length of the arc is:", options: ["11 cm", "22 cm", "33 cm", "44 cm"], answerIndex: 1 },
            ],
            'extra': [] 
        },
        'Surface Areas and Volumes': { 
            'mcq': [
                 { question: "A shuttle cock used for playing badminton has the shape of the combination of:", options: ["a cylinder and a sphere", "a cylinder and a hemisphere", "a sphere and a cone", "frustum of a cone and a hemisphere"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "A metallic sphere of radius 4.2 cm is melted and recast into the shape of a cylinder of radius 6 cm. The height of the cylinder is:", options: ["2.74 cm", "2.84 cm", "2.94 cm", "3.04 cm"], answerIndex: 0 },
                { question: "The radii of the ends of a frustum of a cone of height h cm are r1 and r2 cm. The volume of the frustum of the cone is:", options: ["1/3 πh(r1²+r2²+r1r2)", "1/3 πh(r1²+r2²-r1r2)", "1/3 πh(r1²-r2²-r1r2)", "1/3 πh(r1-r2)"], answerIndex: 0 },
                { question: "A cone is cut by a plane parallel to the base and the upper part is removed. The part that is left over is called:", options: ["a cylinder", "a cone", "a frustum of a cone", "a sphere"], answerIndex: 2 },
                { question: "If the radius of a sphere is doubled, its volume becomes:", options: ["double", "four times", "six times", "eight times"], answerIndex: 3 },
                { question: "A cubical ice-cream brick of edge 22 cm is to be distributed among some children by filling ice-cream cones of radius 2 cm and height 7 cm up to its brim. How many children will get the ice-cream cones?", options: ["163", "263", "363", "463"], answerIndex: 2 },
            ],
            'extra': [] 
        },
        'Statistics': { 
            'mcq': [
                { question: "For a frequency distribution, mean, median and mode are connected by the relation:", options: ["Mode = 3 Mean - 2 Median", "Mode = 2 Median - 3 Mean", "Mode = 3 Median - 2 Mean", "Mode = 3 Median + 2 Mean"], answerIndex: 2 },
            ],
            'pyq': [
                { question: "Which of the following cannot be the probability of an event?", options: ["1/3", "0.1", "3%", "17/16"], answerIndex: 3 },
                { question: "The cumulative frequency table is used in determining:", options: ["Mean", "Median", "Mode", "All of these"], answerIndex: 1 },
                { question: "The relationship between mean, median and mode for a moderately skewed distribution is:", options: ["Mode = 2 Median – 3 Mean", "Mode = Median – 2 Mean", "Mode = 2 Median – Mean", "Mode = 3 Median – 2 Mean"], answerIndex: 3 },
                { question: "The class mark of the class 10-25 is:", options: ["15", "17.5", "12.5", "20"], answerIndex: 1 },
                { question: "The mean of the numbers 1, 2, 3, ..., n is:", options: ["n(n+1)/2", "(n+1)/2", "n/2", "n(n-1)/2"], answerIndex: 1 },
            ],
            'extra': [] 
        },
        'Probability': { 
            'mcq': [
                { question: "The probability of getting a bad egg in a lot of 400 is 0.035. The number of bad eggs in the lot is:", options: ["7", "14", "21", "28"], answerIndex: 1 },
                { question: "A girl calculates that the probability of her winning the first prize in a lottery is 0.08. If 6000 tickets are sold, how many tickets has she bought?", options: ["40", "240", "480", "750"], answerIndex: 2 },
            ],
            'pyq': [
                { question: "A card is selected from a deck of 52 cards. The probability of its being a red face card is:", options: ["3/26", "3/13", "2/13", "1/2"], answerIndex: 0 },
                { question: "A bag contains 3 red balls and 5 black balls. A ball is drawn at random from the bag. The probability that the ball drawn is not red is:", options: ["5/8", "3/8", "1", "0"], answerIndex: 0 },
                { question: "A die is thrown once. The probability of getting a prime number is:", options: ["1/2", "1/3", "2/3", "1/6"], answerIndex: 0 },
                { question: "If P(E) = 0.05, then P(not E) is:", options: ["-0.05", "0.5", "0.9", "0.95"], answerIndex: 3 },
                { question: "Which of the following cannot be the probability of an event?", options: ["-1.5", "15%", "0.7", "2/3"], answerIndex: 0 },
            ],
            'extra': [] 
        }
    },
    'Science': {
        'Chemical Reactions & Equations': {
            'mcq': [
                { question: "Which of the following is a physical change?", options: ["Formation of curd from milk", "Ripening of fruit", "Getting salt from sea water", "Burning of wood"], answerIndex: 2 },
                { question: "What is the chemical name for slaked lime?", options: ["Calcium Carbonate", "Calcium Oxide", "Calcium Hydroxide", "Carbon Monoxide"], answerIndex: 2 },
            ], 
            'pyq': [
                { question: "In the reaction 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂, the gas/gases evolved is/are:", options: ["NO₂ only", "O₂ only", "NO₂ and O₂", "NO only"], answerIndex: 2 },
                { question: "What happens when dilute hydrochloric acid is added to iron filings?", options: ["Hydrogen gas and iron chloride are produced", "Chlorine gas and iron hydroxide are produced", "No reaction takes place", "Iron salt and water are produced"], answerIndex: 0 },
                { question: "The reaction in which a single substance breaks down to give two or more simpler substances is known as:", options: ["Combination reaction", "Decomposition reaction", "Displacement reaction", "Double displacement reaction"], answerIndex: 1 },
                { question: "Which of the following is an endothermic process?", options: ["Dilution of sulphuric acid", "Sublimation of dry ice", "Condensation of water vapours", "Respiration in human beings"], answerIndex: 1 },
                { question: "Identify the substance that is oxidized in the following reaction: CuO + H₂ → Cu + H₂O", options: ["CuO", "H₂", "Cu", "H₂O"], answerIndex: 1 },
                { question: "A solution of a substance 'X' is used for white washing. The substance 'X' is:", options: ["Calcium oxide", "Calcium hydroxide", "Calcium carbonate", "Calcium sulphate"], answerIndex: 0 },
                { question: "When green colored ferrous sulphate crystals are heated, the color of the crystals changes because:", options: ["it is decomposed to ferric oxide", "it loses water of crystallization", "it forms SO₂", "it forms SO₃"], answerIndex: 1 },
                { question: "The balancing of chemical equations is based on the law of:", options: ["Conservation of mass", "Constant proportions", "Multiple proportions", "Avogadro's law"], answerIndex: 0 },
                { question: "Which of the following are combination reactions? (i) 2KClO₃ → 2KCl + 3O₂ (ii) MgO + H₂O → Mg(OH)₂ (iii) 4Al + 3O₂ → 2Al₂O₃ (iv) Zn + FeSO₄ → ZnSO₄ + Fe", options: ["(i) and (iii)", "(iii) and (iv)", "(ii) and (iv)", "(ii) and (iii)"], answerIndex: 3 },
                { question: "The reaction between lead nitrate and potassium iodide solutions is an example of:", options: ["Decomposition reaction", "Displacement reaction", "Double displacement reaction", "Combination reaction"], answerIndex: 2 }
            ], 
            'extra': []
        },
        'Acids, Bases & Salts': {
            'mcq': [
                 { question: "Which of the following is a mineral acid?", options: ["Lactic Acid", "Formic Acid", "Tartaric Acid", "Hydrochloric Acid"], answerIndex: 3 },
                 { question: "Which gas is liberated when an acid reacts with a metal?", options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"], answerIndex: 1 },
            ], 
            'pyq': [
                { question: "What is the pH of a solution that turns red litmus blue?", options: ["1", "4", "5", "10"], answerIndex: 3 },
                { question: "Which of the following salts does not contain water of crystallisation?", options: ["Blue vitriol", "Baking soda", "Washing soda", "Gypsum"], answerIndex: 1 },
                { question: "The chemical formula of Plaster of Paris is:", options: ["CaSO₄.2H₂O", "CaSO₄.H₂O", "CaSO₄.½H₂O", "CaSO₄"], answerIndex: 2 },
                { question: "An aqueous solution with pH = 0 is:", options: ["Strongly acidic", "Strongly basic", "Neutral", "Weakly acidic"], answerIndex: 0 },
                { question: "Which of the following is used for the treatment of indigestion?", options: ["Antibiotic", "Analgesic", "Antacid", "Antiseptic"], answerIndex: 2 },
                { question: "When an acid reacts with a metal carbonate, the products are:", options: ["Salt, water, carbon dioxide", "Salt, water", "Salt, hydrogen", "Salt only"], answerIndex: 0 },
                { question: "Which one of the following is acidic?", options: ["Lemon juice", "Tomatoes", "Milk", "All of these"], answerIndex: 3 },
                { question: "The sting of an ant contains:", options: ["Acetic acid", "Formic acid", "Lactic acid", "Citric acid"], answerIndex: 1 },
                { question: "A solution reacts with crushed egg-shells to give a gas that turns lime-water milky. The solution contains:", options: ["NaCl", "HCl", "LiCl", "KCl"], answerIndex: 1 },
                { question: "Which of the following is a strong base?", options: ["Calcium hydroxide", "Magnesium hydroxide", "Ammonium hydroxide", "Sodium hydroxide"], answerIndex: 3 }
            ], 
            'extra': []
        },
        'Metals & Non-Metals': {
            'mcq': [
                { question: "The most abundant metal in the earth's crust is:", options: ["Iron", "Aluminium", "Calcium", "Sodium"], answerIndex: 1 },
                { question: "Which of the following non-metals is lustrous?", options: ["Sulphur", "Oxygen", "Nitrogen", "Iodine"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "Which of the following pairs will give displacement reactions?", options: ["NaCl solution and copper metal", "MgCl₂ solution and aluminium metal", "FeSO₄ solution and silver metal", "AgNO₃ solution and copper metal"], answerIndex: 3 },
                { question: "An element reacts with oxygen to give a compound with a high melting point. This compound is also soluble in water. The element is likely to be:", options: ["Calcium", "Carbon", "Silicon", "Iron"], answerIndex: 0 },
                { question: "The process of extracting metals from their ores is called:", options: ["Refining", "Metallurgy", "Alloying", "Corrosion"], answerIndex: 1 },
                { question: "Which metal is liquid at room temperature?", options: ["Sodium", "Iron", "Mercury", "Gold"], answerIndex: 2 },
                { question: "The composition of aqua-regia is:", options: ["Dil.HCl : Conc.HNO₃ = 3 : 1", "Conc.HCl : Dil.HNO₃ = 3 : 1", "Conc.HCl : Conc.HNO₃ = 3 : 1", "Dil.HCl : Dil.HNO₃ = 3 : 1"], answerIndex: 2 },
            ],
            'extra': []
        },
        'Carbon & its Compounds': {
            'mcq': [
                { question: "How many single bonds are present in methane?", options: ["Four", "Five", "Six", "Three"], answerIndex: 0 },
                { question: "Which of the following is not a crystalline allotrope of carbon?", options: ["Graphite", "Diamond", "Fullerene", "Coal"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "The functional group present in propanol is:", options: ["-OH (Alcohol)", "-CHO (Aldehyde)", "-COOH (Carboxylic acid)", ">C=O (Ketone)"], answerIndex: 0 },
                { question: "Vinegar is a solution of:", options: ["50%–60% acetic acid in alcohol", "5%–8% acetic acid in alcohol", "5%–8% acetic acid in water", "50%–60% acetic acid in water"], answerIndex: 2 },
                { question: "Soaps are formed by saponification of:", options: ["Alcohols", "Glycosides", "Simple esters", "Carbohydrates"], answerIndex: 2 },
                { question: "The first member of the alkyne homologous series is:", options: ["Ethyne", "Ethene", "Propyne", "Methane"], answerIndex: 0 },
                { question: "The self-linking property of carbon is called:", options: ["Catenation", "Polymerization", "Isomerization", "Allotropy"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Life Processes': {
            'mcq': [
                 { question: "Which of these is the simplest form of food?", options: ["Rice", "Butter", "Glucose", "Starch"], answerIndex: 2 },
                 { question: "In which mode of nutrition an organism derives its food from the body of another living organism without killing it?", options: ["Saprotrophic nutrition", "Parasitic nutrition", "Holozoic nutrition", "Autotrophic nutrition"], answerIndex: 1 },
            ], 
            'pyq': [
                { question: "The autotrophic mode of nutrition requires:", options: ["Carbon dioxide and water", "Chlorophyll", "Sunlight", "All of the above"], answerIndex: 3 },
                { question: "The breakdown of pyruvate to give carbon dioxide, water and energy takes place in:", options: ["Cytoplasm", "Mitochondria", "Chloroplast", "Nucleus"], answerIndex: 1 },
                { question: "Which of the following is not a part of the human female reproductive system?", options: ["Ovary", "Uterus", "Vas deferens", "Fallopian tube"], answerIndex: 2 },
                { question: "The filtration units of kidneys are called:", options: ["Ureter", "Urethra", "Neurons", "Nephrons"], answerIndex: 3 },
                { question: "Which plant tissue transports water and minerals from the roots to the leaf?", options: ["Xylem", "Phloem", "Parenchyma", "Collenchyma"], answerIndex: 0 },
                { question: "The opening and closing of the stomatal pore depends upon:", options: ["Oxygen", "Temperature", "Water in guard cells", "Concentration of CO₂ in stomata"], answerIndex: 2 },
                { question: "The blood leaving the tissues becomes richer in:", options: ["Carbon dioxide", "Water", "Haemoglobin", "Oxygen"], answerIndex: 0 },
                { question: "Which of the following is an enzyme found in saliva?", options: ["Pepsin", "Trypsin", "Amylase", "Lipase"], answerIndex: 2 },
                { question: "The contraction and expansion movement of the walls of the food pipe is called:", options: ["Translocation", "Transpiration", "Peristaltic movement", "Digestion"], answerIndex: 2 },
                { question: "In which part of the alimentary canal is food finally digested?", options: ["Stomach", "Mouth cavity", "Large intestine", "Small intestine"], answerIndex: 3 }
            ], 
            'extra': []
        },
        'Control & Coordination': {
            'mcq': [
                { question: "Which of the following is a plant hormone?", options: ["Insulin", "Thyroxin", "Oestrogen", "Cytokinin"], answerIndex: 3 },
                { question: "The gap between two neurons is called a:", options: ["dendrite", "synapse", "axon", "impulse"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "Which part of the brain maintains posture and equilibrium of the body?", options: ["Cerebrum", "Cerebellum", "Pons", "Medulla"], answerIndex: 1 },
                { question: "The growth of tendrils in pea plants is due to:", options: ["Effect of light", "Effect of gravity", "Rapid cell divisions in tendrillar cells that are away from the support", "Rapid cell divisions in tendrillar cells in contact with the support"], answerIndex: 2 },
                { question: "A doctor advised a person to take an injection of insulin because:", options: ["his blood pressure was low", "his heart was beating slowly", "he was suffering from goitre", "his sugar level in blood was high"], answerIndex: 3 },
                { question: "The hormone which is responsible for the development of male secondary sexual characters is:", options: ["Oestrogen", "Progesterone", "Testosterone", "Insulin"], answerIndex: 2 },
                { question: "Which of the following acts as both endocrine and exocrine gland?", options: ["Pancreas", "Thyroid", "Adrenal", "Liver"], answerIndex: 0 },
            ],
            'extra': []
        },
        'How Do Organisms Reproduce?': {
            'mcq': [
                { question: "The ability of a cell to divide into several cells during reproduction in Plasmodium is called:", options: ["budding", "multiple fission", "binary fission", "reduction division"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "In the list of organisms given below, those that reproduce by the asexual method are: (i) banana (ii) dog (iii) yeast (iv) Amoeba", options: ["(ii) and (iv)", "(i), (iii) and (iv)", "(i) and (iv)", "(ii), (iii) and (iv)"], answerIndex: 1 },
                { question: "The anther contains:", options: ["sepals", "ovules", "pistil", "pollen grains"], answerIndex: 3 },
                { question: "Which among the following is not the function of testes at puberty?", options: ["formation of germ cells", "secretion of testosterone", "development of placenta", "secretion of oestrogen"], answerIndex: 2 },
                { question: "The correct sequence of organs in the male reproductive system for transport of sperms is:", options: ["testis → vas deferens → urethra", "testis → ureter → urethra", "testis → urethra → ureter", "testis → vas deferens → ureter"], answerIndex: 0 },
                { question: "The process of the fusion of the male and the female gametes is called:", options: ["Fertilization", "Pollination", "Reproduction", "Germination"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Heredity': {
            'mcq': [
                { question: "Which section of DNA provides information for one protein?", options: ["Nucleus", "Chromosomes", "Trait", "Gene"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "A Mendelian experiment consisted of breeding tall pea plants bearing violet flowers with short pea plants bearing white flowers. The progeny all bore violet flowers, but almost half of them were short. This suggests that the genetic make-up of the tall parent is:", options: ["TTWW", "TTww", "TtWW", "TtWw"], answerIndex: 2 },
                { question: "An example of homologous organs is:", options: ["our arm and a dog’s fore-leg", "our teeth and an elephant’s tusks", "potato and runners of grass", "all of the above"], answerIndex: 3 },
                { question: "Who is known as the father of genetics?", options: ["Charles Darwin", "Gregor Mendel", "Jean-Baptiste Lamarck", "Hugo de Vries"], answerIndex: 1 },
                { question: "The number of pairs of sex chromosomes in the zygote of a human is:", options: ["1", "2", "22", "23"], answerIndex: 0 },
                { question: "The alternative form of a gene is called:", options: ["Allele", "Genotype", "Phenotype", "Trait"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Light Reflection & Refraction': {
            'mcq': [
                { question: "The laws of reflection hold good for:", options: ["plane mirror only", "concave mirror only", "convex mirror only", "all mirrors irrespective of their shape"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "The focal length of a plane mirror is:", options: ["at infinity", "zero", "negative", "none of these"], answerIndex: 0 },
                { question: "An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. The position of the image is:", options: ["-6 cm", "6 cm", "-30 cm", "30 cm"], answerIndex: 1 },
                { question: "The refractive index of water is 1.33. The speed of light in water will be:", options: ["1.33 x 10⁸ m/s", "3 x 10⁸ m/s", "2.26 x 10⁸ m/s", "2.66 x 10⁸ m/s"], answerIndex: 2 },
                { question: "A concave lens of focal length 15 cm forms an image 10 cm from the lens. The object is placed at a distance of:", options: ["-20 cm", "-30 cm", "40 cm", "50 cm"], answerIndex: 1 },
                { question: "The power of a lens is -4.0 D. Its focal length is:", options: ["-0.25 m", "0.25 m", "-2.5 m", "2.5 m"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Human Eye & Colourful World': {
            'mcq': [
                { question: "The human eye forms the image of an object at its:", options: ["cornea", "iris", "pupil", "retina"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "The least distance of distinct vision for a young adult with normal vision is about:", options: ["25 m", "2.5 cm", "25 cm", "2.5 m"], answerIndex: 2 },
                { question: "The change in focal length of an eye lens is caused by the action of the:", options: ["pupil", "retina", "ciliary muscles", "iris"], answerIndex: 2 },
                { question: "The splitting of white light into its component colours is called:", options: ["Refraction", "Dispersion", "Scattering", "Reflection"], answerIndex: 1 },
                { question: "The sky appears blue because some of the blue component of the sunlight is:", options: ["Absorbed", "Reflected", "Scattered", "Refracted"], answerIndex: 2 },
                { question: "The danger signals installed at the top of tall buildings are red in colour. These can be easily seen from a distance because among all other colours, the red light:", options: ["is scattered the most by smoke or fog", "is scattered the least by smoke or fog", "is absorbed the most by smoke or fog", "moves fastest in air"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Electricity': {
            'mcq': [
                { question: "The unit of electric current is:", options: ["Volt", "Watt", "Ampere", "Ohm"], answerIndex: 2 },
            ],
            'pyq': [
                { question: "What is the S.I. unit of electric potential difference?", options: ["Volt", "Ampere", "Ohm", "Watt"], answerIndex: 0 },
                { question: "Two resistors of resistances 2 Ω and 4 Ω when connected to a battery will have:", options: ["same current flowing through them when connected in parallel", "same current flowing through them when connected in series", "same potential difference across them when connected in series", "different potential difference across them when connected in parallel"], answerIndex: 1 },
                { question: "The resistivity of a material depends on:", options: ["its length", "its area of cross-section", "its temperature", "All of the above"], answerIndex: 2 },
                { question: "An electric bulb is rated 220 V and 100 W. When it is operated on 110 V, the power consumed will be:", options: ["100 W", "75 W", "50 W", "25 W"], answerIndex: 3 },
                { question: "Kilowatt-hour is the unit of:", options: ["Power", "Energy", "Current", "Potential Difference"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Magnetic Effects of Electric Current': {
            'mcq': [
                { question: "The magnetic field inside a long straight solenoid carrying current:", options: ["is zero", "decreases as we move towards its end", "increases as we move towards its end", "is the same at all points"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "The phenomenon of electromagnetic induction is:", options: ["the process of charging a body", "the process of generating magnetic field due to a current passing through a coil", "producing induced current in a coil due to relative motion between a magnet and the coil", "the process of rotating a coil of an electric motor"], answerIndex: 2 },
                { question: "A device that reverses the direction of current through a circuit is called a:", options: ["Resistor", "Commutator", "Galvanometer", "Motor"], answerIndex: 1 },
                { question: "The strength of the magnetic field produced by a current-carrying circular coil is maximum at:", options: ["the centre of the coil", "the circumference of the coil", "points near the coil", "points far from the coil"], answerIndex: 0 },
                { question: "Which of the following correctly describes the magnetic field near a long straight wire?", options: ["The field consists of straight lines parallel to the wire", "The field consists of straight lines perpendicular to the wire", "The field consists of radial lines originating from the wire", "The field consists of concentric circles centred on the wire"], answerIndex: 3 },
                { question: "An electric motor converts:", options: ["Mechanical energy into electrical energy", "Electrical energy into mechanical energy", "Mechanical energy into heat energy", "Electrical energy into light energy"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Sources of Energy': {
            'mcq': [
                { question: "Which of the following is not an example of a biomass energy source?", options: ["wood", "gobar-gas", "atomic energy", "coal"], answerIndex: 2 },
            ],
            'pyq': [
                { question: "The main constituent of biogas is:", options: ["Methane", "Carbon dioxide", "Hydrogen", "Sulphur dioxide"], answerIndex: 0 },
                { question: "Which of the following is a non-renewable source of energy?", options: ["Wood", "Sun", "Fossil fuels", "Wind"], answerIndex: 2 },
                { question: "In a hydroelectric power plant, more electrical power can be generated if water falls from a greater height because:", options: ["its temperature increases", "larger amount of potential energy is converted into kinetic energy", "the electricity content of water increases with height", "more water molecules dissociate into H⁺ and OH⁻ ions"], answerIndex: 1 },
                { question: "Solar energy is harnessed by:", options: ["Solar cookers", "Solar cells", "Solar water heaters", "All of the above"], answerIndex: 3 },
                { question: "The energy produced by the process of nuclear fission is used in:", options: ["Nuclear power plants", "Hydroelectric power plants", "Thermal power plants", "Geothermal power plants"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Our Environment': {
            'mcq': [
                { question: "In a food chain, the third trophic level is always occupied by:", options: ["carnivores", "herbivores", "decomposers", "producers"], answerIndex: 0 },
            ],
            'pyq': [
                { question: "Which of the following groups contain only biodegradable items?", options: ["Grass, flowers and leather", "Grass, wood and plastic", "Fruit-peels, cake and lime-juice", "Cake, wood and grass"], answerIndex: 2 },
                { question: "The depletion of the ozone layer is mainly due to:", options: ["Carbon dioxide", "Chlorofluorocarbons", "Sulphur dioxide", "Methane"], answerIndex: 1 },
                { question: "An ecosystem includes:", options: ["all living organisms", "non-living objects", "both living organisms and non-living objects", "sometimes living organisms and sometimes non-living objects"], answerIndex: 2 },
                { question: "Which of the following constitute a food-chain?", options: ["Grass, wheat and mango", "Grass, goat and human", "Goat, cow and elephant", "Grass, fish and goat"], answerIndex: 1 },
                { question: "The flow of energy in an ecosystem is always:", options: ["unidirectional", "bidirectional", "multidirectional", "no specific direction"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Sustainable Management of Natural Resources': {
            'mcq': [
                 { question: "The 'Chipko Andolan' is associated with:", options: ["Conservation of water", "Conservation of forests", "Conservation of soil", "Conservation of wildlife"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "The three R's to save the environment are:", options: ["Reduce, Reuse, Recycle", "Replenish, Reuse, Recycle", "Reduce, Rebuild, Restrict", "Random, Reduce, Reuse"], answerIndex: 0 },
                { question: "Which of the following is not a natural resource?", options: ["Water", "Soil", "Electricity", "Air"], answerIndex: 2 },
                { question: "The construction of large dams leads to:", options: ["Social problems", "Economic problems", "Environmental problems", "All of the above"], answerIndex: 3 },
                { question: "The main cause for abundant coliform bacteria in the river Ganga is:", options: ["disposal of unburnt corpses into water", "discharge of effluents from electroplating industries", "washing of clothes", "immersion of ashes"], answerIndex: 0 },
                { question: "Stakeholders in the conservation of forests are:", options: ["People who live in or around forests", "The Forest Department of the Government", "Industrialists", "All of the above"], answerIndex: 3 },
            ],
            'extra': []
        },
    }, 
    'Social Science': {
        'The Rise of Nationalism in Europe': {
            'mcq': [
                { question: "Who was the architect of German unification?", options: ["Napoleon", "Otto von Bismarck", "Giuseppe Mazzini", "Metternich"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "The Treaty of Constantinople of 1832 recognized ______ as an independent nation.", options: ["Greece", "Italy", "Germany", "France"], answerIndex: 0 },
                { question: "What did the crown of oak leaves worn by Germania signify?", options: ["Heroism", "Freedom", "Unity", "Readiness to fight"], answerIndex: 0 },
                { question: "The Estates-General was elected by the body of active citizens and renamed the:", options: ["National Assembly", "State Assembly", "Local Assembly", "People's Assembly"], answerIndex: 0 },
                { question: "Which region was known as the 'powder keg' of Europe?", options: ["The Balkans", "Germany", "Italy", "Austria-Hungary"], answerIndex: 0 },
                { question: "The Civil Code of 1804 in France is usually known as:", options: ["The French Code", "The Napoleonic Code", "The European Imperial Code", "The French Civil Code"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Nationalism in India': {
            'mcq': [
                { question: "Which incident led to the calling off of the Non-Cooperation Movement?", options: ["Jallianwala Bagh Massacre", "Chauri Chaura incident", "Simon Commission", "Dandi March"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "Why did Gandhiji decide to withdraw the Non-Cooperation Movement in February 1922?", options: ["The leaders were tired", "The movement was turning violent", "The British agreed to the demands", "The movement was not gaining support"], answerIndex: 1 },
                { question: "The 'Hind Swaraj' was written by:", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhas Chandra Bose"], answerIndex: 1 },
                { question: "What was the Rowlatt Act of 1919?", options: ["It allowed detention of political prisoners without trial", "It imposed a new tax on Indians", "It banned Indian languages", "It was a land revenue settlement"], answerIndex: 0 },
                { question: "The Jallianwala Bagh incident took place in which city?", options: ["Lahore", "Delhi", "Amritsar", "Meerut"], answerIndex: 2 },
                { question: "Who was the leader of the Peasant Movement of Awadh?", options: ["Alluri Sitaram Raju", "Baba Ramchandra", "Mahatma Gandhi", "Jawaharlal Nehru"], answerIndex: 1 },
                { question: "The Simon Commission was boycotted because:", options: ["It was an all-British commission", "It supported the Muslim League", "Congress was not a member", "It favored the Princely states"], answerIndex: 0 },
                { question: "The resolution of 'Purna Swaraj' or complete independence was adopted at the:", options: ["Karachi session of Congress", "Lahore session of Congress", "Calcutta session of Congress", "Nagpur session of Congress"], answerIndex: 1 },
                { question: "The Dandi March marked the beginning of which movement?", options: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "Khilafat Movement"], answerIndex: 1 },
                { question: "Who founded the 'Depressed Classes Association' in 1930?", options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Sardar Patel", "Jawaharlal Nehru"], answerIndex: 1 },
                { question: "The image of 'Bharat Mata' was first created by:", options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Abanindranath Tagore", "Natesa Sastri"], answerIndex: 1 }
            ],
            'extra': []
        },
        'The Making of a Global World': {
            'mcq': [
                { question: "What was the main reason for the decline of the Indian textile industry in the 19th century?", options: ["Scarcity of raw cotton", "Competition from British machine-made textiles", "Lack of demand", "Strikes by weavers"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "What were the 'Corn Laws'?", options: ["Laws allowing the import of corn into Britain", "Laws restricting the import of corn into Britain", "Laws imposing taxes on corn", "Laws promoting the export of corn"], answerIndex: 1 },
                { question: "The Great Depression began around:", options: ["1929", "1914", "1939", "1905"], answerIndex: 0 },
                { question: "What was the name of the disease that had a devastating impact on the cattle in Africa in the 1890s?", options: ["Rinderpest", "Plague", "Cholera", "Smallpox"], answerIndex: 0 },
                { question: "Who was the famous economist who believed that India's industrialization was crucial for its economic development?", options: ["John Maynard Keynes", "Dadabhai Naoroji", "M. Visvesvaraya", "Adam Smith"], answerIndex: 2 },
                { question: "Indentured labour was a system of:", options: ["Free labour", "Bonded labour", "Wage labour", "Slavery"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Age of Industrialisation': {
            'mcq': [
                { question: "Who invented the Spinning Jenny?", options: ["James Hargreaves", "Richard Arkwright", "Eli Whitney", "James Watt"], answerIndex: 0 },
            ],
            'pyq': [
                { question: "The first cotton mill in India was established in:", options: ["Madras", "Calcutta", "Surat", "Bombay"], answerIndex: 3 },
                { question: "Who among the following set up the first Indian jute mill in Calcutta?", options: ["Dwarkanath Tagore", "Seth Hukumchand", "Dinshaw Petit", "Jamsetjee Nusserwanjee Tata"], answerIndex: 1 },
                { question: "A 'gomastha' was:", options: ["A paid servant to supervise weavers", "A trader", "A factory owner", "A money lender"], answerIndex: 0 },
                { question: "The introduction of which new technology in England angered women?", options: ["The steam engine", "The Spinning Jenny", "The power loom", "The cotton gin"], answerIndex: 1 },
                { question: "Proto-industrialisation refers to:", options: ["The first phase of industrialisation", "The period of industrialisation before factories", "The phase of cottage industries", "The phase of heavy industries"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Print Culture & the Modern World': {
            'mcq': [
                { question: "Who invented the printing press?", options: ["Marco Polo", "Johann Gutenberg", "Martin Luther", "Erasmus"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "The 'Diamond Sutra' is the oldest printed book of which country?", options: ["China", "Japan", "Korea", "India"], answerIndex: 1 },
                { question: "The 'Ninety-five Theses' were written by:", options: ["Erasmus", "Martin Luther", "John Calvin", "Thomas More"], answerIndex: 1 },
                { question: "What was the 'Vernacular Press Act' of 1878?", options: ["An act to promote vernacular newspapers", "An act to censor vernacular newspapers", "An act to provide financial aid to vernacular newspapers", "An act to ban vernacular newspapers"], answerIndex: 1 },
                { question: "Who wrote 'Amar Jiban', the first full-length autobiography in Bengali?", options: ["Rashsundari Debi", "Pandita Ramabai", "Kailashbashini Debi", "Rokeya Sakhawat Hossain"], answerIndex: 0 },
                { question: "The first weekly newspaper published in India was:", options: ["Bombay Samachar", "Bengal Gazette", "Amrita Bazar Patrika", "The Hindu"], answerIndex: 1 },
            ],
            'extra': []
        },
        'Resources & Development': {
            'mcq': [
                { question: "Which one of the following is an example of a biotic resource?", options: ["Rock", "Mountain", "Mineral", "Flora"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "Which one of the following types of resource is iron ore?", options: ["Renewable", "Biotic", "Flow", "Non-renewable"], answerIndex: 3 },
                { question: "Which soil is also known as 'regur' soil?", options: ["Alluvial Soil", "Black Soil", "Laterite Soil", "Red Soil"], answerIndex: 1 },
                { question: "The first international Earth Summit was held in:", options: ["Geneva", "New York", "Japan", "Rio de Janeiro"], answerIndex: 3 },
                { question: "'Agenda 21' was signed to combat:", options: ["Environmental damage, poverty, disease", "Terrorism", "Global warming", "Nuclear proliferation"], answerIndex: 0 },
                { question: "Land left uncultivated for more than five agricultural years is called:", options: ["Pasture land", "Fallow land", "Barren land", "Culturable wasteland"], answerIndex: 3 },
                { question: "In which of the following states is terrace cultivation practised?", options: ["Punjab", "Plains of Uttar Pradesh", "Haryana", "Uttarakhand"], answerIndex: 3 },
                { question: "Resources which are found in a region, but have not been utilised are called:", options: ["Developed resources", "Stock", "Potential resources", "Reserves"], answerIndex: 2 },
                { question: "Which type of soil develops due to high temperature and heavy rainfall?", options: ["Black Soil", "Alluvial Soil", "Laterite Soil", "Arid Soil"], answerIndex: 2 },
                { question: "The main cause of land degradation in Punjab is:", options: ["Intensive cultivation", "Over irrigation", "Deforestation", "Overgrazing"], answerIndex: 1 },
                { question: "Red soil is reddish in colour due to:", options: ["high clay content", "presence of kankar nodules", "diffusion of iron in crystalline and metamorphic rocks", "high moisture content"], answerIndex: 2 }
            ],
            'extra': []
        },
        'Water Resources': {
            'mcq': [
                { question: "Which of the following is not a source of fresh water?", options: ["Glaciers", "Groundwater", "Rivers", "Oceans"], answerIndex: 3 },
            ],
            'pyq': [
                { question: "The Bhakra-Nangal project is built on which river?", options: ["Sutlej", "Beas", "Ravi", "Chenab"], answerIndex: 0 },
                { question: "Which of the following is a method of rainwater harvesting?", options: ["Rooftop rainwater harvesting", "Inundation channels", "Guls or Kuls", "All of the above"], answerIndex: 3 },
                { question: "The main objective of multi-purpose projects is:", options: ["Irrigation", "Electricity generation", "Flood control", "All of the above"], answerIndex: 3 },
                { question: "Which state has made rooftop rainwater harvesting structure compulsory to all the houses across the state?", options: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"], answerIndex: 2 },
                { question: "The Hirakud dam is built on which river?", options: ["Mahanadi", "Godavari", "Krishna", "Kaveri"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Agriculture': {
            'mcq': [
                { question: "Which of the following is known as 'golden fibre'?", options: ["Cotton", "Jute", "Silk", "Wool"], answerIndex: 1 },
            ],
            'pyq': [
                { question: "Which of the following is a rabi crop?", options: ["Rice", "Millet", "Gram", "Cotton"], answerIndex: 2 },
                { question: "Which type of farming is also called 'slash and burn' agriculture?", options: ["Intensive subsistence farming", "Primitive subsistence farming", "Commercial farming", "Plantation"], answerIndex: 1 },
                { question: "The Green Revolution was most successful in which states?", options: ["Punjab and Haryana", "Uttar Pradesh and Bihar", "Kerala and Tamil Nadu", "Rajasthan and Gujarat"], answerIndex: 0 },
                { question: "Which of the following is a beverage crop?", options: ["Sugarcane", "Cotton", "Tea", "Jute"], answerIndex: 2 },
                { question: "Operation Flood is related to:", options: ["Milk production", "Fish production", "Food grain production", "Water management"], answerIndex: 0 },
            ],
            'extra': []
        },
        'Power Sharing': {
            'mcq': [
                { question: "Which two languages are mainly spoken in Belgium?", options: ["French and English", "Dutch and English", "French and Dutch", "Dutch and German"], answerIndex: 2 },
            ],
            'pyq': [
                { question: "In Belgium, the percentage of French-speaking community is:", options: ["59 percent", "40 percent", "1 percent", "10 percent"], answerIndex: 1 },
                { question: "Which major social group constituted the largest share in population of Sri Lanka?", options: ["Sinhalas", "Sri Lankan Tamils", "Indian Tamils", "Muslims"], answerIndex: 0 },
                { question: "Power sharing is desirable because it helps:", options: ["to increase pressure on government", "to reduce possibilities of conflicts", "to increase the speed of decision making", "to increase the percentage of voters"], answerIndex: 1 },
                { question: "Which form of power sharing is most commonly referred to as federalism?", options: ["Horizontal division of power", "Vertical division of power", "Division of power among political parties", "Division of power among social groups"], answerIndex: 1 },
                // FIX: Corrected a corrupted question object in the mcqData. The options array was malformed and contained injected code.
                { question: "The system of 'checks and balances' is another name for which one of the following power-sharing arrangements?", options: ["Power sharing among different social groups", "Vertical division of power", "Horizontal division of power", "Power sharing in the community government"], answerIndex: 2 }
            ],
            'extra': []
        }
    }
};

export const samplePaperData: { [subject: string]: { [chapter: string]: SamplePaper[] } } = {
    'Mathematics': {
        'Real Numbers': [
            {
                id: 'math-real-numbers-1',
                title: 'Sample Question Paper - 1',
                sections: [
                    {
                        title: 'Section A',
                        description: 'This section consists of 2 multiple-choice questions of 1 mark each.',
                        questions: [
                            { qNo: 1, text: 'The decimal representation of 11 / (2³ x 5) will terminate after how many places of decimals?', type: 'MCQ', marks: 1, options: ['1', '2', '3', '4'], answer: '3' },
                            { qNo: 2, text: 'HCF of 8, 9, 25 is', type: 'MCQ', marks: 1, options: ['1', '2', '3', 'None'], answer: '1' },
                        ]
                    },
                    {
                        title: 'Section B',
                        description: 'This section consists of 1 short-answer question of 2 marks.',
                        questions: [
                            { qNo: 3, text: 'Show that every positive even integer is of the form 2q, and that every positive odd integer is of the form 2q + 1, where q is some integer.', type: 'SA', marks: 2, answer: 'Let a be any positive integer and b = 2. Then, by Euclid’s algorithm, a = 2q + r for some integer q ≥ 0, and r = 0 or r = 1, because 0 ≤ r < 2. So, a = 2q or a = 2q + 1. If a is of the form 2q, then a is an even integer. Also, a positive integer can be either even or odd. Therefore, any positive odd integer is of the form 2q + 1.' },
                        ]
                    }
                ]
            }
        ]
    }
};

export const subjectiveQuestionsData: { [subject: string]: { [chapter: string]: string[] } } = {
    'Science': {
        'Chemical Reactions & Equations': [
            "Why should a magnesium ribbon be cleaned before burning in air?",
            "What is a balanced chemical equation? Why should chemical equations be balanced?",
            "Why is respiration considered an exothermic reaction? Explain."
        ]
    },
    'Mathematics': {
        'Real Numbers': [
            "Use Euclid's division algorithm to find the HCF of 135 and 225.",
            "Explain why 7 × 11 × 13 + 13 is a composite number."
        ]
    }
};
