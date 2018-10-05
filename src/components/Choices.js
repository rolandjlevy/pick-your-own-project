import React from 'react';

class Choices extends React.Component {
    constructor() {
        super();
    }

    render () {
        
        return (
            <div className="choices">
               
               <div className="choices__header">
                    Which city is this?
                </div>
                <div className="choices__body">
                    <div className="choices__col1">
                        <div>A: New York</div>
                        <div>B: Miami</div>
                    </div>
                    <div className="choices__col2">
                        <div>C: Philadelphia</div>
                        <div>D: Boston</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Choices;