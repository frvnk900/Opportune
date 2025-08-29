import './style.css'
import doc from './Icons/text-field-icon/doc.png'
import send from './Icons/text-field-icon/send-msg.png'
import microphone from './Icons/text-field-icon/micro-min.png'
export default function PromptTemplate(){
    return(
       <>
         <div className="prompt-container">
            <ul className="add-file-box">
                
                 <li id='record-btn-li'>
                    <button><img src={microphone} alt=""/></button>
                </li>
                <li id='file-upload-btn'>
                    <label htmlFor="file-input">
                          <img src={doc} alt="" />
                    </label>
                    <input type="file" name="file-input" id="file-input" />           
                </li> 

            </ul>
            <ul className="inputfield-box" id="send-btn-field">
                <li>
                 <textarea maxLength={200} minLength={1} mul placeholder="How can assist you...."/>
                </li>
                   <li>
                
                  <button>
                    <img src={send} />
                  </button>
                </li>
    
            </ul>
           

         </div>
       </>

    )
}