import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket1 = io.connect("http://85.193.88.165:3001");
const socket2 = io.connect("http://85.193.88.165:3002");

function App() {
   

   const [messageList, setMessageList] = useState([]);
   const [messageList2, setMessageList2] = useState([]);

   const sendMessage1 = async () => {
      await socket1.emit("get_info", "hello", (respone) => {
         setMessageList((list) => [...list, respone]);
      });
   };

   const sendMessage2 = async () => {
      await socket2.emit("get_info", "hello", (respone) => {
         setMessageList2((list) => [...list, respone]);
      });
   };

   return (
      <div className="App">
         <div className="App__part __side">
            <div className="__side_box chat-body">
               <h2>Server 1</h2>
               <p className="chat-body__subtext">Выводит информацию о:</p>
               <ul>
                  <li className="chat-body__tasktext">
                     архитектуре процессора
                  </li>
                  <li className="chat-body__tasktext">
                     количестве логических процессоров в системе{" "}
                  </li>
               </ul>
               <div className="chat-body__view">
                  {messageList.map((messageContent) => {
                     return (
                        <div key={messageContent.id} className="message">
                           <div>
                              <div className="message-content">
                                 <p className="message-content__text text-content__time">
                                       request time is{" "}
                                       {new Date(
                                          messageContent.time
                                       ).toTimeString().split(' ')[0]
                                      }:
                                 </p>
                                 <p className="message-content__text text-content">
                                    {messageContent.mes.task1}
                                 </p>
                                 <p className="message-content__text text-content">
                                    memory usage:<br/>
                                    <ul>
                                       {messageContent.mes.task2.map( (el, i) => (
                                          <li key={i}>{el}</li>
                                       ))}
                                    </ul>
                                    
                                 </p>
                              </div>
                              <div className="message-meta"></div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               <div className="chat-footer">
                  <button className="chat-button" onClick={sendMessage1}>
                     Получить даные с сервера &#9658;
                  </button>
               </div>
            </div>
         </div>

         <div className="App__part __main">
            <header className="App-header">
               <h1>Real-time service with socket connection</h1>
               <img src={logo} className="App-logo" alt="logo" />
               <div className="chat-window">
                  <div className="chat-header">
                     <h2>Developed by Dubrovin Oleg</h2>
                  </div>
               </div>
            </header>
         </div>

         <div className="App__part __side">
            <div className="__side_box chat-body">
               <h2>Server 2</h2>
               <p className="chat-body__subtext">Выводит информацию о:</p>
               <ul>
                  <li className="chat-body__tasktext">
                     количестве процессов в системе
                  </li>
                  <li className="chat-body__tasktext">
                     количестве используемой памяти
                  </li>
               </ul>
               <div className="chat-body__view">
               {messageList2.map((messageContent) => {
                     return (
                        <div key={messageContent.id} className="message">
                           <div>
                              <div className="message-content">
                                 <p className="message-content__text text-content__time">
                                       request time is{" "}
                                       {new Date(
                                          messageContent.time
                                       ).toTimeString().split(' ')[0]
                                      }:
                                 </p>
                                 <p className="message-content__text text-content">
                                    {messageContent.mes.task1}
                                 </p>
                                 <p className="message-content__text text-content">
                                    {messageContent.mes.task2}
                                 </p>
                              </div>
                              <div className="message-meta"></div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               <div className="chat-footer">
                  <button className="chat-button" onClick={sendMessage2}>
                     Получить даные с сервера &#9658;
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
