import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import "./style.css";
import Dice from "./components/dice";
import Confetti from "react-confetti";

function App() {
  // States
  const [diceArr, setDiceArr] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numRolls, setNumRolls] = useState(0);
  const [highestRolls, setHighestRolls] = useState(0);

  // Functions & Varriables
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      const newDiceArr1 = diceArr.map((dice) => {
        return dice.isHeld ? { ...dice } : generateNewDice();
      });

      setDiceArr(newDiceArr1);
      setNumRolls(numRolls + 1);
    } else {
      setTenzies(false);
      setDiceArr(allNewDice());
      setHighestRolls(highestRolls <= numRolls ? highestRolls : numRolls);
      setNumRolls(0);
    }
  }

  function holdDice(id) {
    const newDiceArr2 = diceArr.map((dice) =>
      dice.id === id ? { ...dice, isHeld: !dice.isHeld } : { ...dice }
    );

    setDiceArr(newDiceArr2);
  }

  // UseEffects

  useEffect(() => {
    const allHeldDice = diceArr.every(
      (dice) => dice.isHeld && diceArr[0].value === dice.value
    );

    if (allHeldDice) {
      setTenzies(true);
    }
  }, [diceArr]);

  return (
    <main className="main__app">
      {tenzies && <Confetti width={windowSize[0]} height={windowSize[1]} />}
      <div className="tenzie">
        <div className="tenzie__info">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="counter__tracker">
          <div className=" score">
            <h3 className="track__title">Current Score</h3>
            <p className="num__rolls">
              Number of Rolls: <span className="rolls">{numRolls}</span>
            </p>
          </div>
          <div className=" score">
            <h3 className="track__title">Highest Score</h3>
            <p className="num__rolls">
              Number of Rolls: <span className="rolls">{highestRolls}</span>
            </p>
          </div>
        </div>
        <div className="dice-container">
          <Dice holdDice={holdDice} dices={diceArr} />
        </div>
        <button onClick={rollDice} className="btn">
          {`${tenzies ? "New Game" : "Roll"}`}
        </button>
      </div>
    </main>
  );
}

export default App;
