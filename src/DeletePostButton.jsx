import React from 'react';
import fire from './config/Fire';
export default class DeletePostButton extends React.Component {

    handleClick = () => {
        let confirm = window.confirm("Are you sure you want to delete this post?");
        const uid = fire.auth().currentUser.uid;
        if (confirm) {
            fire.firestore().collection('posts').doc(this.props.docId).get().then(docRef => {
                if(this.props.type==='image') {
                    fire.storage().ref(`users/${uid}/${this.props.docId}/${docRef.data().imageName}`).delete();
                }
                fire.firestore().collection('posts').doc(this.props.docId).delete().then(this.props.updatePosts)
            }).catch(error => console.error(error));
            
        }
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Delete
            </button>
        );
    }
}