import React from 'react';

class City extends React.Component {
    constructor() {
        super();
    }

    render () {
        // console.log(this.props.resultsTotalPages);  
        const keepArray = [this.props.searchQuery, "summer", "explore", "holiday", "street", "village", "town", "urban", "rural", "desert", "mountain", "view", "river", "stream", "field", "beach", "sea", "sunset", "landmark", "architecture", "city", "building", "cathedral"];  
        const ignoreArray = ["fashion", "computer", "office", "food", "guitar", "music", "sport", "background", "door", "wood", "wallpaper", "wall", "texture", "glass", "metal"];
        // "woman", "lady", "girl", "boy", "man", "sea", "flower", "wood", "travel", 
        
        const obj = {};
        const resultsNoDuplicates = this.props.results.reduce((acc, item) => {
            if (!obj[item.cover_photo.urls.regular]) {
                obj[item.cover_photo.urls.regular] = true;
                acc.push(item);
            }
            return acc;
        }, []);
        
        return (
            <div className="search__city">
                <ul className="search__city__list">
                
                {
                    resultsNoDuplicates.map(item => {
                        const imageIsRelevant = item.tags.filter(n => keepArray.indexOf(n.title) >= 0).length > 0;
                        const imageNotRelevant = item.tags.filter(n => ignoreArray.indexOf(n.title) >= 0).length > 0
                        const keepRelevantImage = imageIsRelevant && !imageNotRelevant || item.tags == [];
                        
                        return keepRelevantImage && 
                            <li key={item.id}>
                                <div>
                                    <a href={item.cover_photo.links.html}>{item.title}</a>
                                </div>
                                <img className="search__city__list-img" src={item.cover_photo.urls.regular} />
                            </li>
                })
                }
                </ul>
            </div>
        )
    }
}

export default City;