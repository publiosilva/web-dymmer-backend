## Backend DyMMer

### Quality Measures endpoit
- Get list of all available quality measures:
```
Method: GET  | Endpoint: https://<SERVER+URL>/qualitymeasures/list
```

- Send selected measures and feature tree to compute the quality measures:
```
{
  method: 'POST',
  url: 'https://<SERVER+URL>/qualitymeasures/apply',
  headers: {
    'content-type': 'application/json'
  },
  body: {
    measures: [{
      _id: Number,
      file: String,
      name: String,
      initials: String,
      Desription: String,
      Computation: String,
    }],
    featureTree: {}
  },
}
```
### Feature Model XML to JSON conversion
```
<SERVER+URL>/xml/xml-to-json
```

### Users endpoints
```
<SERVER+URL>/users/register
<SERVER+URL>/users/authenticate
Method: GET | Endpoint: https://<SERVER+URL>/users/list
Method: GET | Endpoint: https://<SERVER+URL>/users/get/:userId
<SERVER+URL>/users/remove/:userId
```

### Feture Model endpoints
```
<SERVER+URL>/featuremodels/create
Method: GET | Endpoint: https://<SERVER+URL>/featuremodels/list
Method: GET | Endpoint: https://<SERVER+URL>/featuremodels/get/:featureModelId
<SERVER+URL>/featuremodels/update/:featureModelId
<SERVER+URL>/featuremodels/remove/:featureModelId
```
