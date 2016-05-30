import React, {Component,PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Card,List,ListItem,Snackbar,FontIcon,FlatButton,RaisedButton,TextField,Table,TableHeader,TableRow,TableHeaderColumn,TableBody,TableRowColumn,Dialog} from 'material-ui';
var _ = require('lodash');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./Main.scss');
require('./app.css');
var update = require('react-addons-update');
import RowTeam from './RowTeam';

var PureRenderMixin = require('react-addons-pure-render-mixin');
var mixin = [PureRenderMixin];
const style = {
    textAlign: "center",
    fontSize: '16px',
    color: 'black'
};
const divStyle = {
    fontSize: '16px',
    color: 'black'
};
const dialogStyle = {
    fontSize: '20px',
    color: 'black'
};
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: [],
            isAddTeam: false,
            isEditRow: false,
            teams: [],
            currentTeam: "",
            isTeamAdded: false,
            isPointsAdded: false,
            isRowDeleted: false,
            addPointRow: 0,
            isViewTeam: false,
            isRegister: false
        };
        if (localStorage.getItem('teams')) {
            this.state.teams = JSON.parse(localStorage.getItem('teams'));
        }
    }

    handleRequestCloseTeamAdd() {
        this.setState({isTeamAdded: false});
    }

    handleRequestClosePointAdd() {
        this.setState({isPointsAdded: false});
    }

    handleRequestCloseRowDelete() {
        this.setState({isRowDeleted: false});
    }

    handleOpen() {
        this.setState({isAddTeam: true});
    }

    handleClose() {
        this.setState({isAddTeam: false, isEditRow: false});
    }

    addTeam() {
        this.setState({isAddTeam: false});
        var teamName = this.refs.teamName.getValue();
        var teams = update(this.state.teams, {
            $push: [{name: teamName, points: 0, members: []}]
        });

        this.setState({
            teams: teams,
            isTeamAdded: true
        });
    }

    editRow(i, j) {
        //j -  column console.log(i+"  " +j);
        if (j == 1) {
            this.setState({isViewTeam: true, addPointRow: i});
        }
        else if (j == 2) {
            this.setState({isEditRow: true, addPointRow: i});
        }
        else {
            this.setState({isRegister: true, addPointRow: i});
        }
    }

    addPoint(i) {
        this.setState({isEditRow: false});
        var points = this.refs.points.getValue();
        var temp = parseInt(points) + parseInt(this.state.teams[i].points);
        var teams = this.state.teams;
        teams[i].points = temp;
        this.setState({
            teams: teams,
            isPointsAdded: true
        });
    }

    deleteRow(i) {
        this.setState({isEditRow: false});
        if (this.state.teams.length != 0) {
            var teams = update(this.state.teams, {$splice: [[i, 1]]});
            this.setState({
                teams: teams,
                isRowDeleted: true
            });
        }
    }

    register() {
        var t = this.state.teams;
        t[this.state.addPointRow].members.push(this.refs.register.getValue());
        this.state.teams = t;
        this.setState({isRegister: false});
    }

    render() {
        this.state.teams = _.sortBy(this.state.teams, 'points', function (n) {
            return Math.sin(n);
        }).reverse();

        var teams = this.state.teams.map(function (q, i) {
            return (<RowTeam name={q.name}
                             points={q.points}
                             onClick={this.editRow.bind(this)}
                             key={i}
                             pos={i+1}/>
            );
        }.bind(this));
        localStorage.clear();
        localStorage.setItem('teams', JSON.stringify(this.state.teams));
        return (
            <div style={divStyle}>
                <Card>
                    <ReactCSSTransitionGroup transitionName='team' transitionAppear={true}
                                             transitionAppearTimeout={500} transitionEnterTimeout={500}
                                             transitionLeaveTimeout={500}>
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow onRowClick={this.handleOpen.bind(this)}>
                                    <TableHeaderColumn style={style}><strong>Team</strong></TableHeaderColumn>
                                    <TableHeaderColumn style={style}><strong>Points</strong></TableHeaderColumn>
                                    <TableHeaderColumn style={style}><strong>Rank</strong></TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
                                {teams}
                            </TableBody>
                        </Table>
                    </ReactCSSTransitionGroup>
                </Card>

                <Dialog
                    style={dialogStyle}
                    title="Add Team"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            secondary={true}
                            onTouchTap={this.handleClose.bind(this)}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.addTeam.bind(this)}
                        />
                    ]}
                    modal={false}
                    open={this.state.isAddTeam}>
                    <TextField
                        ref="teamName"
                        hintText="Team Name"
                        floatingLabelText="Team Name"
                    /><br/>
                </Dialog>

                <Dialog
                    style={dialogStyle}
                    title="Add Points"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            secondary={true}
                            onTouchTap={this.handleClose.bind(this)}
                        />,
                        <FlatButton
                            label="Delete"
                            primary={true}
                            onTouchTap={this.deleteRow.bind(this,this.state.addPointRow)}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.addPoint.bind(this,this.state.addPointRow)}
                        />
                    ]}
                    modal={false}
                    open={this.state.isEditRow}>
                    <TextField
                        ref="points"
                        hintText="Points"
                        floatingLabelText="Points"
                    /><br/>
                </Dialog>
                <Dialog
                    style={dialogStyle}
                    title="Register"
                    modal={false}
                    onRequestClose={this.register.bind(this)}
                    open={this.state.isRegister}>
                    <TextField
                        ref="register"
                        hintText="Name"
                        floatingLabelText="Name"
                    /><br/>
                </Dialog>
                <Dialog
                    style={dialogStyle}
                    title="Team Members"
                    modal={false}
                    onRequestClose={()=> {this.setState({isViewTeam:false})}}
                    open={this.state.isViewTeam}>
                    <List>
                        {
                            this.state.teams[this.state.addPointRow] && (
                                !(this.state.teams[this.state.addPointRow].members) ? (<p>Nothing to show</p>)
                                    : (this.state.teams[this.state.addPointRow].members.map((q) => {
                                    return ( <ListItem style={dialogStyle} primaryText={q} leftIcon={<FontIcon className="fa fa-user"/>}/>)
                                })))
                        }
                    </List>
                </Dialog>
                <Snackbar
                    open={this.state.isTeamAdded}
                    message="Team Successfully added"
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestCloseTeamAdd.bind(this)}
                />
                <Snackbar
                    open={this.state.isPointsAdded}
                    message="Points Successfully added"
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClosePointAdd.bind(this)}
                />
                <Snackbar
                    open={this.state.isRowDeleted}
                    message="Row Deleted Successfully"
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestCloseRowDelete.bind(this)}
                />
            </div>
        )
    }
}

export default Main;