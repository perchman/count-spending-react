const PORT = process.env.PORT || 5000;
const Application = require('./framework/server/Application');
const ServiceLocator = require('./ServiceLocator');
const MongoDB = require('./framework/databases/MongoDB');

const costsRouter = require('./routers/costs-router');
const categoriesRouter = require('./routers/categories-router');
const balanceRouter = require('./routers/balance-router');

const handleResponse = require('./framework/server/middlewares/handleResponse');
const parseUrl = require('./framework/server/middlewares/parseUrl');

const app = new Application();

app.use(handleResponse);
app.use(parseUrl('http://localhost:5000'));

app.addRouter(costsRouter);
app.addRouter(categoriesRouter);
app.addRouter(balanceRouter);

const defaultDB = new MongoDB('Default');

async function start() {
    try {
        await defaultDB.connect();
        ServiceLocator.set('Default', defaultDB);

        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();