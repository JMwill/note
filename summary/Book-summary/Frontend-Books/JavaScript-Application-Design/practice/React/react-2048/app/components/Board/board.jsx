/* eslint prefer-const: "off" */
import React, { Component } from 'react';
import { randomInt } from '../../lib/utils';
import Block from '../Block/block';

class Board extends Component {
    constructor(props) {
        super(props);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.genTwoDimensionArr = this.genTwoDimensionArr.bind(this);
        this.addRandomNum = this.addRandomNum.bind(this);
        this.joinTwoDimensionArr = this.joinTwoDimensionArr.bind(this);

        this.toDecrease = this.toDecrease.bind(this);
        this.toIncrease = this.toIncrease.bind(this);

        // 设定原始位置
        this.touchPos = {
            x: 0,
            y: 0
        };

        let boardWidth = parseInt(this.props.boardWidth, 10);
        let idCounter = 0;
        let blockArr = [];
        for (let i = 0, l = boardWidth; i < l; i++) {
            for (let j = 0; j < l; j++) {
                let blockItem = {
                    num: 0,
                    id: idCounter++,
                    info: {
                        posX: j,
                        posY: i
                    }
                };
                blockArr.push(blockItem);
            }
        }
        this.state = { blockArr };
    }

    componentWillMount() {
        this.addRandomNum();
    }

    componentDidMount() {
        let elem = document.querySelector('.board');
        elem.focus();
    }

    handleTouchStart(e) {
        let startTouchPos = e.changedTouches[0];
        this.touchPos.x = startTouchPos.pageX;
        this.touchPos.y = startTouchPos.pageY;
    }

    handleTouchEnd(e) {
        let endTouchPos = e.changedTouches[0];
        let rangeX = Math.abs(endTouchPos.pageX - this.touchPos.x);
        let rangeY = Math.abs(endTouchPos.pageY - this.touchPos.y);
        let direction = '';
        if (rangeX > rangeY) {
            if (endTouchPos.pageX < this.touchPos.x) direction = 'toLeft';
            else direction = 'toRight';
        } else {
            if (endTouchPos.pageY < this.touchPos.y) direction = 'toTop';
            else direction = 'toDown';
        }

        this.boardAction(direction);
    }

    genTwoDimensionArr(isHori = true) {
        let resultArr = [];
        let blockArr = this.state.blockArr;
        let boardWidth = parseInt(this.props.boardWidth, 10);

        if (isHori) {
            for (let i = 0, l = blockArr.length; i < l; i += boardWidth) {
                resultArr.push(blockArr.slice(i, i + boardWidth));
            }
        } else {
            for (let i = 0, l = boardWidth; i < l; i++) {
                let vertArr = [];
                for (let j = 0; j < l; j++) {
                    vertArr.push(blockArr[j * boardWidth + i]);
                }
                resultArr.push(vertArr);
            }
        }

        return resultArr;
    }

    joinTwoDimensionArr(arr, isHori = true) {
        let resultArr = [];
        if (isHori) {
            arr.forEach((innerArr) => {
                resultArr = resultArr.concat(innerArr);
            });
        } else {
            let tempArr = [];
            arr.forEach(() => tempArr.push([]));
            arr.forEach((innerArr) => {
                for (let i = 0, l = innerArr.length; i < l; i++) {
                    tempArr[i].push(innerArr[i]);
                }
            });
            resultArr = this.joinTwoDimensionArr(tempArr);
        }
        return resultArr;
    }

    toDecrease(twoDimensionArr) {
        /* eslint no-param-reassign: "off" */
        twoDimensionArr.forEach((arr) => {
            let withNumBlocks = arr.filter(block => block.num);
            for (let i = 0, l = withNumBlocks.length - 1; i < l; i++) {
                if (withNumBlocks[i].num === withNumBlocks[i + 1].num) {
                    withNumBlocks[i].num += withNumBlocks[i + 1].num;
                    withNumBlocks[i + 1].num = 0;
                }
            }

            withNumBlocks = withNumBlocks.filter(block => block.num);

            arr.forEach((block, index) => {
                if (withNumBlocks[index]) {
                    block.num = withNumBlocks[index].num;
                } else {
                    block.num = 0;
                }
            });
        });

        return twoDimensionArr;
    }

    toIncrease(twoDimensionArr) {
        /* eslint no-param-reassign: "off" */
        twoDimensionArr.forEach(arr => arr.reverse());
        twoDimensionArr = this.toDecrease(twoDimensionArr);
        twoDimensionArr.forEach(arr => arr.reverse());
        return twoDimensionArr;
    }

    boardAction(dir) {
        let boarder = this;
        let action = {
            toLeft: () => boarder.joinTwoDimensionArr(
                boarder.toDecrease(boarder.genTwoDimensionArr())
            ),
            toRight: () => boarder.joinTwoDimensionArr(
                boarder.toIncrease(boarder.genTwoDimensionArr())
            ),
            toTop: () => boarder.joinTwoDimensionArr(
                boarder.toDecrease(boarder.genTwoDimensionArr(false))
            , false),
            toDown: () => boarder.joinTwoDimensionArr(
                boarder.toIncrease(boarder.genTwoDimensionArr(false))
            , false)
        };

        this.setState({ blockArr: action[dir]() });
        this.addRandomNum();
    }

    addRandomNum() {
        let blockArr = this.state.blockArr;
        let emptyBlockIndexArr = [];
        blockArr.forEach((block, index) => {
            if (!block.num) emptyBlockIndexArr.push(index);
        });

        if (emptyBlockIndexArr.length === 0) return;

        let index =
        emptyBlockIndexArr[
            randomInt(0, emptyBlockIndexArr.length)
        ];

        blockArr[index].num = 2;

        this.setState({ blockArr });
    }

    render() {
        return (
            <div
                onKeyPress={this.handleKeyPress}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                className="board"
            >
                <div className="board-background">
                    <div className="board-block board-block-posx-0 board-block-posy-0 "></div>
                    <div className="board-block board-block-posx-0 board-block-posy-1 "></div>
                    <div className="board-block board-block-posx-0 board-block-posy-2 "></div>
                    <div className="board-block board-block-posx-0 board-block-posy-3 "></div>

                    <div className="board-block board-block-posx-1 board-block-posy-0 "></div>
                    <div className="board-block board-block-posx-1 board-block-posy-1 "></div>
                    <div className="board-block board-block-posx-1 board-block-posy-2 "></div>
                    <div className="board-block board-block-posx-1 board-block-posy-3 "></div>

                    <div className="board-block board-block-posx-2 board-block-posy-0 "></div>
                    <div className="board-block board-block-posx-2 board-block-posy-1 "></div>
                    <div className="board-block board-block-posx-2 board-block-posy-2 "></div>
                    <div className="board-block board-block-posx-2 board-block-posy-3 "></div>

                    <div className="board-block board-block-posx-3 board-block-posy-0 "></div>
                    <div className="board-block board-block-posx-3 board-block-posy-1 "></div>
                    <div className="board-block board-block-posx-3 board-block-posy-2 "></div>
                    <div className="board-block board-block-posx-3 board-block-posy-3 "></div>
                </div>

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
