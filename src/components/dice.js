const Dice = (props) => {
  const divs = props.dices.map((dice) => (
    <div
      onClick={() => props.holdDice(dice.id)}
      key={dice.id}
      className={`dice ${dice.isHeld && "green-dice"} `}
    >
      {dice.value}
    </div>
  ));

  return <>{divs}</>;
};

export default Dice;
