import React from 'react';

const Character = (props) => {
    const { data } = props;
    let divStyle = {
        backgroundImage: 'url(' + props.data.thumbnail + ')'
    }
    return(
        <div className="character">
            <div className="thumb" style={divStyle}></div>
            <div className="bio">
                <p className="name">{props.data.name}</p>
                {props.data.bio}
            </div>
        </div>
    )
};

export default Character;
