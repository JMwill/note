import React, { Component } from 'react';
import { randomInt } from '../../lib/utils';
import Block from '../Block/block';

class Board extends Component {
    constructor(props) {
        super(props);
        const boardWidth = parseInt(props.boardWidth, 10);

        // 设定原始位置
        this.touchPos = {
            x: 0,
            y: 0
        };

        this.state = {
            blockArr: []
        };
        this.blockRowContainer = [];

        let idCounter = 0;
        for (let i = 0, l = boardWidth; i < l; i++) {
            const xCol = [];
            for (let j = 0; j < l; j++) {
                const blockItem = {
                    num: 0,
                    id: idCounter++,
                    info: {
                        posX: i,
                        posY: j
                    }
                };

                xCol.push(blockItem);
                this.state.blockArr.push(blockItem);
            }
            this.blockRowContainer.push(xCol);
        }

        const randomX = randomInt(0, boardWidth);
        const randomY = randomInt(0, boardWidth);

        const initNumBlock = this.blockRowContainer[randomX][randomY];
        initNumBlock.num = 2;
        this.state.blockArr
            .filter((block) => block.id === initNumBlock.id)
            .num = initNumBlock.num;
    }

    handleTouchStart(e) {
        const startTouchPos = e.changedTouches[0];
        this.touchPos.x = startTouchPos.pageX;
        this.touchPos.y = startTouchPos.pageY;
    }

    handleTouchEnd(e) {
        const endTouchPos = e.changedTouches[0];
        const rangeX = Math.abs(endTouchPos.pageX - this.touchPos.x);
        const rangeY = Math.abs(endTouchPos.pageY - this.touchPos.y);
        let direction = '';
        if (rangeX > rangeY) {
            if (endTouchPos.pageX < this.touchPos.x) direction = 'toLeft';
            else direction = 'toRight';
        } else {
            if (endTouchPos.pageY < this.touchPos.y) direction = 'toTop';
            else direction = 'toDown';
        }

        // this.boardAction(direction);
    }

    boardAction(dir) {
        let emptyBlockArr = [];
        let toLeft = () => {
        }
    }

    render() {
        return (
            <div
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
                className="board"
            >
                {this.state.blockArr.map(
                    (block) => <Block
                        key={block.id}
                        {...block}
                    />
                )}
            </div>
        );
    }
}

export default Board;
