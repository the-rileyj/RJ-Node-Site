/**
 * Created by RJ on 7/23/2017.
 */
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'vars.env' });

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
        console.log(`Express running → PORT ${server.address().port}`);
});
