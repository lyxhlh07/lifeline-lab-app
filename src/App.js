import React, { Component } from 'react';
import Button from './components/button';
import axios from 'axios';
import './App.scss';
import Card from './components/card';

class App extends Component {
    state = {
        page: 1,
        seed: '',
        users: []
    }

    clickMeHandler = () => {
        this.setState({ page: 1, seed: '' }, this.getUser);
    }

    nextPageHandler = () => {
        this.setState({ page: this.state.page + 1 }, this.getUser);
    }

    prevPageHandler = () => {
        this.setState({ page: this.state.page - 1 }, this.getUser);
    }

    pageChangedHandler = (e) => {
        if(!e.target.value) {
            this.setState({ page: 1 }, this.getUser);
            return;
        }

        const pattern = /^[0-9]*$/;
        const valid = pattern.test(e.target.value);
        
        if(valid) {
            this.setState({ page: e.target.value }, this.getUser);
        }
    }

    getUser = async () => {
        await axios({ 
            url: 'https://randomuser.me/api', 
            method: 'GET',
            params: {
                results: 9,
                page: this.state.page,
                seed: this.state.seed
            }
        })
        .then((response) => {
            this.setState({
                users: response.data.results,
                seed: response.data.info.seed
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div className="App" >
                <div className="click-button">
                <Button onClick={this.clickMeHandler}>Click me</Button>
                </div>
                { this.state.users.length > 0 && 
                    <React.Fragment>
                        <div className="user-list">
                            { this.state.users.map((user, index) => {
                                return (
                                    <Card key={index} width="31%" marginBottom={15}>
                                        <div className="title"><b>User Details</b></div>
                                        <div className="user-container">
                                            <div className="profile-pic-container">
                                                <img src={user.picture.large} alt="profile"/>
                                            </div>
                                            <div>
                                                <div><b>First name:</b> {user.name.first}</div>
                                                <div><b>Last name:</b> {user.name.last}</div>
                                            </div>
                                        </div>
                                    </Card>
                                )})
                            }
                        </div>
                        <div className="footer">
                            { this.state.page > 1 ?
                                <Button onClick={this.prevPageHandler}>Previous</Button>
                                :
                                <div style={{ width: 70 }}></div>
                            }
                            <div>Page <input onChange={this.pageChangedHandler} value={this.state.page}/></div>
                            <Button onClick={this.nextPageHandler}>Next</Button>
                        </div>
                    </React.Fragment>
                }
               
            </div>
        );
    }
}

export default App;
