import React from 'react';

// class Block extends Component {
export default (props) =>
    <div
        className={
            `board-block
            board-block-posx-${props.info.posX}
            board-block-posy-${props.info.posY}
            ${(props.num ? 'has-num' : '')}`
        }
    ><span>{props.num ? props.num : ''}</span></div>;
// }
