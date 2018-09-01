## ResponseHandler
ResponseHandler is an express middleware for sending json responses.

### Installation and Usage
```
npm install --save responsehandler
```

```
import express from 'express';
import handler from 'responsehandler';

const app = express();
app.use(handler.responseHandler);

app.get('/', () => {
  return res.successResponse('Hello World!'); // { 'status': 'success', 'message': 'Hello World!' }
});

// Examples
res.successResponse({ message: 'Fetched successfully', name: 'James' }); // { 'status': 'success', 'message': 'Fetched successfully', 'data': { 'name': 'James' } }

res.errorResponse(); // { 'status': 'error', 'message': 'An error occurred' }
res.errorResponse('Fetch failed'); // { 'status': 'error', 'message': 'Fetch failed' }
res.errorResponse({ message: 'Failed', code: 123 }); // { 'status': 'error', 'message': 'Failed', 'code': 123 }
```