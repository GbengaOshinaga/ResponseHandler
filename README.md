## ResponseHandler
ResponseHandler is an express middleware for sending json responses.

### Installation and Usage
```
npm install --save json-response-handler
```

```
import express from 'express';
import responseHandler from 'json-response-handler';

const app = express();
app.use(responseHandler);

app.get('/', () => {
  return res.successResponse('Hello World!'); // { 'status': 'success', 'message': 'Hello World!' }
});

// Examples
// successResponse accepts a status code as optional second argument - default is 200
res.successResponse({ message: 'Fetched successfully', name: 'James' }, 201); // { 'status': 'success', 'message': 'Fetched successfully', 'data': { 'name': 'James' } }

res.errorResponse(); // { 'status': 'error', 'message': 'An error occurred' }

//errorResponse also accepts status code as optional second argument - default is 400
res.errorResponse('Fetch failed', 404); // { 'status': 'error', 'message': 'Fetch failed' }
res.errorResponse({ message: 'Failed', code: 123 }); // { 'status': 'error', 'message': 'Failed', 'code': 123 }
```
