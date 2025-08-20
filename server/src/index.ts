import app from './app';           
import listEndpoints from 'express-list-routes';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);

  const routes = listEndpoints(app);
  console.log('--- Express routes ---');
  console.log(routes);
  console.log('--- end routes ---');
});
