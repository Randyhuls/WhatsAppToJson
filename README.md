# WhatsAppToJson
Parse your WhatsApp chats to JSON

### Exported WhatsApp chat (.txt)
```
05-11-17 10:27:45: Randy: Sup!
05-11-17 10:27:49: Jamie: Not much
```

### whatsAppToJson(string | array)
##### Promise returning an array of chats
*Takes a path or array of paths* 

```javascript
whatsAppToJson(pathOrArrayOfPaths).then(
   (response) => console.log(response),
   (err) => console.error(err)
)
```

##### Result
```javascript
[{
    'date': 'Sun Nov 05 2017 10:27:45 GMT+0200',
    'msg': 'Sup!',
    'name': 'Randy'
},
{
    'date': 'Sun Nov 05 2017 10:27:49 GMT+0200',
    'msg': 'Not much',
    'name': 'Jamie'
}]
```

