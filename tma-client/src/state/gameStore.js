import { observable } from 'mobx';

class Message {
    @observable id;
    @observable userID;
    @observable content;
    @observable timestamp;

    constructor(id, userID, message) {
        this.id = id;
        this.userID = userID;
        this.content = message.content;
        this.timestamp = message.timestamp;
    }
}

class GameStore {
    @observable messages = [];

    @action addMessage(id, message) {
        this.messages.push(
            new Message(id, message)
        );
    }
}

export default new GameStore();