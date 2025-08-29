// import "./routes_stlye.css";
// import sample from "./images/4.png";
// import location from "../Icons/location.png";
// export default function HomeTemplate() {
//   return (
//     <>
//       <div className="home-content-container">
//         <div className="home-content-box">
//           <ul className="home-org-profile-ul">
//             <li>
//               <img src={sample} alt="sample" />
//             </li>
//             <li>
//               <p>The Jadish organisation</p>
//             </li>
//             <li>
//               <span>organisation</span>
//             </li>
//           </ul>
//           <ul className="home-org-review-ul">
//             <li>
//               <img src={sample} alt="sample" />
//             </li>
//             <ul className="home-org-review-ul-description">
//               <li id="description-org">
//                 <p>
//                   Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                   Blanditiis explicabo similique adipisci voluptatem pariatur
//                   non eos eius dicta eum eligendi porro ad sapiente veritatis
//                   ratione quia, aperiam architecto unde ex.
//                 </p>
//               </li>
//               <li id="loaction-org-li">
//                 <img src={location} alt="" />
//                 <p>560HT , Lilongwe , Malawi</p>
//               </li>
//               <li>
//                 <p></p>
//               </li>
//             </ul>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token'); // or however you store your token

if (token) {
  try {
    const decoded = jwt_decode(token);
    const userId = decoded.userId; // replace 'userId' with the key you need

    console.log('User ID:', userId);
  } catch (error) {
    console.error('Invalid token:', error);
  }
}
