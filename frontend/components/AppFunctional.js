import React, { useState } from 'react';
import axios from 'axios';

// önerilen başlangıç stateleri
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [index,setIndex] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [x, setX] = useState((initialIndex % 3) + 1);
  const [y, setY] = useState(Math.floor(initialIndex / 3) + 1);
  
  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    return `Koordinatlar (${x}, ${y})`
  }

  function reset() {
    // Tüm stateleri başlangıç değerlerine sıfırlamak için bu helperı kullanın.
    console.log("reset");
    setIndex(initialIndex);
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setX((initialIndex % 3) + 1);
    setY(Math.floor(initialIndex / 3) + 1);
  }

  function move(evt) {
    const direction = evt.target.id;
    console.log("move", direction);
    let newX = x;
    let newY = y;
    let errorMessage = '';
  
    switch (direction) {
      case "left":
        if (x > 1) {
          newX = x - 1;
        } else {
          errorMessage = "Sola gidemezsiniz";
        }
        break;
      case "up":
        if (y > 1) {
          newY = y - 1;
        } else {
          errorMessage = "Yukarıya gidemezsiniz";
        }
        break;
      case "right":
        if (x < 3) {
          newX = x + 1;
        } else {
          errorMessage = "Sağa gidemezsiniz";
        }
        break;
      case "down":
        if (y < 3) {
          newY = y + 1;
        } else {
          errorMessage = "Aşağıya gidemezsiniz";
        }
        break;
      default:
        break;
    }
  
    if (errorMessage === '') {
      const newIndex = (newY - 1) * 3 + newX - 1;
      setX(newX);
      setY(newY);
      setIndex(newIndex);
      setMessage(initialMessage);
      setSteps(steps + 1);
    } else {
      setMessage(errorMessage);
    }
  }

  function onChangeHandler(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmitHandler(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();

    console.log("submit");

    axios
      .post("http://localhost:9000/api/result", {
        x: x,
        y: y,
        steps: steps,
        email: email,
      })
      .then(function (response) {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
      });

    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">SOL</button>
        <button onClick={move} id="up">YUKARI</button>
        <button onClick={move} id="right">SAĞ</button>
        <button onClick={move} id="down">AŞAĞI</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input value={email} id="email" type="email" placeholder="email girin" onChange={onChangeHandler}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
