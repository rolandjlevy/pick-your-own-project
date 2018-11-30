import React from 'react';
import '../styles/components/choices.scss';

function Choices ({ choice, choices, currentCity, receiveChoice }) {

    function handleClick(choice, event) {
      receiveChoice(choice);
      window.location.href = "#controls";
    }

    function setButtonClass(n) {
        if (choice) {
            if (choices[n] === currentCity) { 
                return "choices__col-button-correct" 
            } else { 
                return (choices[n] === choice) ? "choices__col-button-wrong" : "choices__col-button-static";
            }
        } else {
            return "choices__col-button-static"
        }
    }

    function createButton (choice, number) {
        return <div
            onClick={event => handleClick(choices[number], event)} 
            className={setButtonClass(number)}>
            {choice}: {choices[number]} 
        </div>
    }

    return (
        <div className="choices fadein">

            <div className="choices__header">
                Which city is it?
            </div>

            <div className="choices__body">

                <div className="choices__col">
                    {createButton("A", 0)}
                    {createButton("C", 1)}
                </div>
                
                <div className="choices__col">
                    {createButton("B", 2)}
                    {createButton("D", 3)}
                </div>

            </div>
            
        </div>
    )
}

export default Choices;