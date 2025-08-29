import "./routes_stlye.css";
import logo from '../Icons/logo/logo-min5kb.png'
import { Bars } from "react-loader-spinner";

export default function RecordingTemplate() {
  return (
    <>
      <br></br>
      <div className="recording-container">
        <div className="recording-wave">
          <li>
            {" "}
            <Bars
              height="250"
              width="90"
              color="#0654a8"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass="waves"
              visible={true}
            />
          </li>
        </div>
        <div className="recording-box">
          <ul>
            <li><p>Recording..</p></li>
            <li>
              <button>STOP</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="notice-record">
        <ul>
            <li>*PLEASE stay away from background noise.</li>
            <br></br>
            <li>*SPEAK smooth as you can.</li>
            <br />
            <li>*NOTE <span>GOLBIN AI</span> can make mistakes</li>
            <br></br>
            
        </ul>
      </div>
      <div className="side-logo">
          <li>
            <img src={logo} alt="" />
          </li>
 
      </div>
      <div id="try-say-somthing-tag">
         <ul>
          <li>TRY <br></br>SAYING <br></br> SOMETHING.</li>
         </ul>
      </div>
    </>
  );
}
