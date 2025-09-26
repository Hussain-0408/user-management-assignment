// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// function UserTable() {
//     const [data1, setData1] = useState([])

//     useEffect(() => {
//         axios.get("https://jsonplaceholder.typicode.com/users")
//             .then((res) => {
//                console.log(res.data)
//                setData1(res.data)
//             })      
//     },[0])
   

//     return (
//         <div>
//             <ul>
//                 {data1.map((e, index) => (                  
//                     <div key={index}>
//                         <li >{e.id}</li>
//                         <li>{e.title}</li>
//                         <li>{e.name}</li>
//                     </div>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// export default UserTable