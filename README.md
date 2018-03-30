react + server https://daveceddia.com/create-react-app-express-backend/
modal - https://daveceddia.com/open-modal-in-react/

# Setup
1. Run ```mongod.exe```
2. Run server ```node app.js```
3. Run react ```npm start```




notes: Methods follow the same semantics as regular ES6 classes, meaning that they don't automatically bind this to the instance. You'll have to explicitly use .bind(this) or arrow functions =>
<div onClick={() => this.tick()}>
<div onClick={this.tick.bind(this)}>
