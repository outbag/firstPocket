/**
 * Created by buhe on 2017/1/25.
 */
import React, {Component, PropTypes} from 'react';
import WhiteBoard from './whiteboard';
export default class WhiteBoardIndex extends Component {
    render() {
        return (
            <div>
                <WhiteBoard
                    apiKey='87b3416b-cfcd-45f0-841f-b5d9e57bf47e'
                    boardLink='5aj5342-56tz-uhjk-9811'
                    style={{
                        width:'800px',
                        height: '800px'
                    }}
                />

            </div>
        )
    }
}
