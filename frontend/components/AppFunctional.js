import React, { useState } from 'react'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [index,setIndex] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [x, setX] = useState((initialIndex % 3) + 1);
  const [y, setY] = useState(Math.floor(initialIndex / 3) + 1);
  
 
  

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    
    return [x,y];
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    return `Koordinatlar (${getXY()[0]}, ${getXY()[1]})`
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

  function nextIndex(targetIndex) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir next indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function move(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  const direction = evt.target.id;
  console.log("move", direction);
  let newX = x;
  let newY = y;

  switch (direction) {
    case "left":
      newX = Math.max(1, x - 1);
      break;
    case "up":
      newY = Math.max(1, y - 1);
      break;
    case "right":
      newX = Math.min(3, x + 1);
      break;
    case "down":
      newY = Math.min(3, y + 1);
      break;
    default:
      break;
  }

  if (newX !== x || newY !== y) {
    const newIndex = (newY - 1) * 3 + newX - 1;
    setX(newX);
    setY(newY);
    setIndex(newIndex);
    setMessage(initialMessage);
    setSteps(steps + 1);
  } else {
    setMessage(`${direction} yönünde gidemezsiniz.`);
  }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
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
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
