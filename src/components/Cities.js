import React from 'react';

class Cities extends React.Component {
    constructor() {
        super();
    }

    render () {
        const keepArray = [this.props.currentCity, "tower", "summer", "explore", "holiday", "street", "village", "town", "urban", "rural", "desert", "mountain", "view", "river", "stream", "field", "beach", "sea", "sunset", "landmark", "architecture", "city", "building", "cathedral"];  
        // const ignoreArray = ["leaf", "fashion", "table", "coffee", "fish", "computer", "office", "food", "guitar", "music", "sport", "background", "door", "wood", "wallpaper", "wall", "texture", "glass", "metal"];
        const ignoreArray = ["wood", "wall", "texture", "glass", "metal"];
        // "woman", "lady", "girl", "boy", "man", "flower"
        
        const obj = {};
        const resultsNoDuplicates = this.props.results.reduce((acc, item) => {
            if (!obj[item.id] && item.cover_photo) {
                obj[item.id] = true;
                acc.push(item);
            }
            return acc;
        }, []);
        return (

            <div className="city__photos">
                <ul className="city__photos__list">
                {
                    resultsNoDuplicates.map(item => {
                        const imageIsRelevant = item.tags.filter(n => keepArray.indexOf(n.title) >= 0).length > 0;
                        const imageNotRelevant = item.tags.filter(n => ignoreArray.indexOf(n.title) >= 0).length > 0;
                        const keepRelevantImage = imageIsRelevant && !imageNotRelevant || item.tags == [];
                        
                        return keepRelevantImage && 
                        <li key={item.id}>
                            <div className="city__photos__list-img" style={{backgroundImage: `url(${item.cover_photo.urls.regular})`}} >
                                <a href={item.cover_photo.links.html}>{item.title}</a>
                            </div>
                        </li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Cities;