class NetworkState {

    constructor(initialMessage) {
        this.state = 'initial';
        this.message = initialMessage;
        this.initialMessage = initialMessage;
    }

    static init(initialMessage) {
        return new NetworkState(initialMessage)
    }

    isInitial() {
        return this.state == 'initial'
    }

    load(message) {
        this.state = 'loading';
        this.message = message;
    }

    isLoading(){
        return this.state == 'loading';
    }

    succeed(message) {
        this.state = 'success';
        this.message = message;
    }

    isSuccess(){
        return this.state == 'success';
    }

    fail(message) {
        this.state = 'failed';
        this.message = message;
    }

    isFailed(){
        return this.state == 'failed';
    }

    isInitialOrSuccess() {
        return this.state == 'initial' || this.state == 'success'
    }

    reset(){
        this.state = 'initial';
        this.message = this.initialMessage;
    }

}

export default NetworkState;