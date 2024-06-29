// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Read = () => {
//   const [data, setData] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/${id}`)
//       .then((res) => setData(res.data))
//       .catch((err) => console.log(err));
//   }, [id]);

//   return (
//     <div style={{
//       backgroundColor: "#121212", 
//       color: "#ffffff", 
//       width: "100%", 
//       minHeight: "100vh", 
//       display: "flex", 
//       alignItems: "center", 
//       justifyContent: "center"
//     }}>
//       <div className="card text-white bg-dark" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(255,255,255,0.2)" }}>
//         <div className="text-center">
//           <img 
//             src={`/images/${data.image}`} 
//             alt={data.name} 
//             className="card-img-top rounded-circle" 
//             style={{ width: "150px", height: "150px", objectFit: "cover", margin: "20px auto" }} 
//           />
//         </div>
//         <div className="card-body">
//           <h3 className="card-title text-center">{data.name}</h3>
//           <h5 className="card-subtitle mb-2 text-center text-muted">{data.email}</h5>
//           <p className="card-text mt-4">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia suscipit voluptatibus ducimus quod commodi voluptatum, inventore quos qui fugiat excepturi odit quas enim sed deserunt quidem iusto dolores dolore magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, neque? Quae architecto perferendis ducimus ipsa eaque accusantium recusandae quisquam fugit doloribus, sed omnis impedit accusamus error maxime praesentium dolor illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo soluta nobis ducimus error fugiat ea omnis saepe, repellendus eum veritatis et accusantium obcaecati aliquam.
//           </p>
//           <div className="text-center mt-4">
//             <Link className='btn btn-outline-info' to='/'>Back</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Read;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Read = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div style={{
      backgroundColor: "#121212", // Dark background color
      color: "#ffffff", // Light text color
      minHeight: "100vh", // Full viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="card text-white bg-dark" style={{ maxWidth: "600px", borderRadius: "10px", boxShadow: "0 0 10px rgba(255,255,255,0.2)" }}>
        <div className="text-center">
          <img 
            src={`/images/${data.image}`} 
            alt={data.name} 
            className="card-img-top rounded-circle mt-4" 
            style={{ width: "150px", height: "150px", objectFit: "cover" }} 
          />
        </div>
        <div className="card-body">
          <h3 className="card-title text-center">{data.name}</h3>
          <h5 className="card-subtitle mb-2 text-center text-muted">{data.email}</h5>
          <p className="card-text mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia suscipit voluptatibus ducimus quod commodi voluptatum, inventore quos qui fugiat excepturi odit quas enim sed deserunt quidem iusto dolores dolore magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, neque? Quae architecto perferendis ducimus ipsa eaque accusantium recusandae quisquam fugit doloribus, sed omnis impedit accusamus error maxime praesentium dolor illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo soluta nobis ducimus error fugiat ea omnis saepe, repellendus eum veritatis et accusantium obcaecati aliquam.
          </p>
          <div className="text-center mt-4">
            <Link className='btn btn-outline-info' to='/'>Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
