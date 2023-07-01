import {useEffect, useState} from "react";
import "./App.css";
import Dice from "./components/dice";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = useState(getRandomNum());
  const [tenzies, setTenzies] = useState(false);
  function getRandomNum() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        number: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }

    return arr;
  }
  function changeState(id) {
    setDice(oldDice =>
      oldDice.map(die => {
        return id === die.id ? {...die, isHeld: !die.isHeld} : die;
      })
    );
    console.log(id);
  }

  function endGame() {
    setDice(prevDice =>
      prevDice?.map(item => {
        if (item.isHeld) {
          return item;
        } else {
          return {
            number: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
          };
        }
      })
    );
  }
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSame = dice.every(die => dice[0].number === die.number);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>TENZIES GAME</h1>
      <div className="main-container">
        <div className="play-ground">
          {" "}
          {dice &&
            dice.map(die => (
              <Dice
                Hold={die.isHeld}
                value={die.number}
                handleClick={() => changeState(die.id)}
                key={die.id}
              />
            ))}
        </div>
        <button
          className="btn"
          onClick={
            tenzies
              ? () => {
                  setDice(getRandomNum());
                  setTenzies(false);
                }
              : endGame
          }
        >
          {tenzies ? "Play Again" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
