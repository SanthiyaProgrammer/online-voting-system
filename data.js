import Thumbnail1 from './assets/profile2.png'
import Thumbnail2 from './assets/profile3.jpg'
import Thumbnail3 from './assets/profile3.jpg'
import Candidate1 from './assets/profile5.jpg'
import Candidate2 from './assets/profile6.jpg'
import Candidate3 from './assets/profile10.jpg'
import Candidate4 from './assets/profile12.jpg'
import Candidate5 from './assets/profile2.png'
import Candidate6 from './assets/profile3.jpg'
import Candidate7 from './assets/profile2.png'


export const elections = [
    {
        id:"e1",
        title:"India's prime minister Elections 2025",
        description:`Provident similique lfjdkfjkfkdfhkdhfdfhfh
             dfdfsdfsdfsfsfsfdffa`,
        thumbnail: Thumbnail1,
        Candidates:["c1","c2","c3","c4"],
        voters:[]
    },
    {
        id:"e2",
        title:"India's prime minister Elections 2025",
        description:`Provident similique lfjdkfjkfkdfhkdhfdfhfh
             dfdfsdfsdfsfsfsfdffa`,
        thumbnail: Thumbnail2,
        Candidates:["c5","c6","c7"],
        voters:[]
    },
    {
        id:"e3",
        title:"India's prime minister Elections 2025",
        description:`Provident similique lfjdkfjkfkdfhkdhfdfhfh
             dfdfsdfsdfsfsfsfdffa`,
        thumbnail: Thumbnail3, 
        Candidates:[],
        voters:[]
    },

]

export const candidates = [
    {
        id:"c1",
        fullName:'bts',
        image: Candidate1,
        motto:`dfjfjjjkhjhjhjkhjkhjhjjghguguuihksjdkfjsdlfdkfhkfhskdfskjdfsjk`,
        voteCount:18,
        election:"e1"
    },
    {
        id:"c2",
        fullName:'bts',
        image: Candidate2,
        motto:`dfjfjksjdkfjsdlfdkfhkfhskdfskjdfsjk`,
        voteCount:12,
        election:"e1"
    },
    {
        id:"c3",
        fullName:'bts',
        image: Candidate1,
        motto:`dfjfjksjdkfjsdlfdkfhkfhskdfskjdfsjk`,
        voteCount:18,
        election:"e1"
    },
    {
        id:"c4",
        fullName:'marshmellow',
        image: Candidate1,
        motto:`dfjfjksjdkfjsdlfdkfhkfhskdfskjdfsjk`,
        voteCount:18,
        election:"e1"
    },
    {
        id:"c5",
        fullName:'billie',
        image: Candidate1,
        motto:`dfjfjksjdkfjsdlfdkfhkfhskdfskjdfsjk`,
        voteCount:18,
        election:"e1"
    },
 ]
 

 export const voters = [
    {
        id:"v1",
        fullName:"santhiya",
        email:"voter1mail@gmail.com",
        password:"voter1",
        isAdmin: true,
        votedElections:["e2"]
    },
    {
        id:"v2",
        fullName:"amirtha",
        email:"voter2mail@gmail.com",
        password:"voter2",
        isAdmin: false,
        votedElections:["e1","e2"]
    },
    {
        id:"v3",
        fullName:"sara",
        email:"voter3mail@gmail.com",
        password:"voter3",
        isAdmin: false,
        votedElections:["e2"]
    },
    {
        id:"v4",
        fullName:"tomy",
        email:"voter4mail@gmail.com",
        password:"voter4",
        isAdmin: true,
        votedElections:[]
    },  
    
 ]
