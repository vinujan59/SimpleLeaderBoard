import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';

import {Card,FlatButton,RaisedButton,TextField,Table,TableHeader,TableRow,TableHeaderColumn,TableBody,TableRowColumn,Dialog} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./Main.scss');
const style = {
    textAlign:"center",
    fontSize: '16px',
    color: 'black'
};

export default class RowTeam extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    handle(row,column,n){
        this.props.onClick(this.props.pos-1,n);
    }
    render(){
        return(
            <TableRow onCellClick={this.handle.bind(this)}>
                <TableRowColumn style={style}><strong>{this.props.name}</strong></TableRowColumn>
                <TableRowColumn style={style} ><strong>{this.props.points}</strong></TableRowColumn>
                <TableRowColumn style={style}><strong>{this.props.pos}</strong></TableRowColumn>
            </TableRow>
        );
    }
}