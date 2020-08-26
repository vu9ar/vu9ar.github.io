import React from 'react';
import fire from './config/Fire';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    signup = (e) => {
        e.preventDefault();
        fire.firestore().collection('users').where('username', '==', this.state.username).get().then(userSnapshot => {
            if (userSnapshot.docs.length !== 0) {
                throw Error('Username is taken');
            } else {
                fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(userData => {
                    fire.storage().ref('defaultProfilePicture.png').getDownloadURL().then(url => {
                        userData.user.updateProfile({
                            displayName: this.state.username,
                            photoURL: url
                        }).then(() => {
                            this.props.setModal()
                            fire.firestore().collection('users').doc(userData.user.uid).set({
                                accountCreated: new Date(),
                                email: this.state.email,
                                points: 0,
                                username: this.state.username,
                                photoUrl: url,
                                joinedGroups: [],
                                createdGroups: []
                            }).then(this.props.authListener)
                        });
                    })

                })
                    .catch(error => {
                        this.setState({ error: error.message })
                    });
            }

        })
            .catch(error => {
                this.setState({ error: error.message })
            })

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id='signUpModal'>
                <button className='closeModal' onClick={this.props.setModal}> ╳ </button>
                <form onSubmit={this.signup}>
                    <label htmlFor="username">
                        Username:
                <input pattern="^[a-zA-Z0-9_]{3,14}$" required value={this.state.username} onChange={this.handleChange} type="text" name="username" id="usernameField" />
                    </label>
                    <label htmlFor="email">
                        Email:
                <input required value={this.state.email} onChange={this.handleChange} type="email" name="email" id="emailField" />
                    </label>
                    <label htmlFor="password">
                        Password:
                <input required value={this.state.password} onChange={this.handleChange} type="password" name="password" id="passwordField" />
                    </label>
                    <input type="submit" value="Sign Up" />
                    <p>{this.state.error}</p>
                </form>
            </div>
        );
    }
}


