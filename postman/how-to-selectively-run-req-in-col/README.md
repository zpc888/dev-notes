# Context
It is very often when run a postman collection of requests, it ony invokes some requests based on the iterated data.

It took me a hour to figure out how with trial and error approach since the documentation from postman site seems unclear to me.

We had about 8 spring batch applications, invoked by spring data flow [spring cloud dataflow](https://github.com/zpc888/dev-notes/blob/master/k8s/samples/y2021/run-spring-batch-on-cloud-dataflow/run-spring-boot-batch-on-cloud-dataflow.md). They try to move 10 different kinds of events from upstream app to downstream with minor transformations via REST APIs. Due to security reason, pushing events to downstream app is unavailable for a while. We manually login browser and use postman interceptor to borrow browser session and cookie to post hundreds of event instances for these 10 different event requests.

Manual post with copy-n-paste is time consuming and error prone. My logic guess is that postman should support batch posts via collection. So I create a collection containing 10 different event post request template, each body contains 2 parts:
* static header json
* dynamic payload with a variable {{jsonPayload}}, see one example
```json
{
    "eventType": "...",
    "eventSubtype": "...",
    "sourceApp": "...",
    "sourceRegion": "...",
    "sourceLob": "...",
    "sourceUserId": "...",
    "sourceTimestamp": "2020-10-20T12:08:56.000+0000",
    "sourceLang": "en",
    "payload": 
    
  {{jsonPayload}}

}
```

# Problem
The upstream jobs will generate a json file, which looks like:
```json
[
    {"a-event": {"a-event-payload-field1": "value1", "a-event-payload-field2": "value2", "a-event-payload-field...": "value..."}},
    {"b-event": {"b-event-payload-field1": "value1", "b-event-payload-field2": "value2", "b-event-payload-field...": "value..."}},
    {"a-event": {"a-event-payload-field1": "value1a", "a-event-payload-field2": "value2a", "a-event-payload-field...": "value..."}},
    {"c-event": {"c-event-payload-field1": "value1", "c-event-payload-field2": "value2", "c-event-payload-field...": "value..."}},
    {"...-event": {"...-event-payload-field1": "value1", "...-event-payload-field2": "value2", "...-event-payload-field...": "value..."}}
]
```
When run the collection with this json file with the below javascript from "Pre-request Script", for each record, it will run all request templates under this collection. What we want is to run one and only one request based on __EVENT TYPE__
```javascript
let reqObj = pm.iterationData.toObject();
let [reqType, reqData] = Object.entries(reqObj)[0];
pm.globals.set("jsonPayload", JSON.stringify(reqData));
```

# Solution
Postman provides `postman.setNextRequest('to run next request')` function to let user explicitly call different request. 

* My initial try is to put the below code under collection's "Pre-request Script"
```javascript
let reqObj = pm.iterationData.toObject();
let [reqType, reqData] = Object.entries(reqObj)[0];
pm.globals.set("jsonPayload", JSON.stringify(reqData));
postman.setNextRequest(reqType);
```
That causes the 1st request from the collection infinite loop. I cannot figure out the logic behind this.

* then try to put the above code under each request's "Pre-request Script"
It still causes the 1st request from the collection infinite loop.

* Then try to put `postman.setNextRequest(null);` for each request template's "Tests"
It still doesn't work

* Finally try to create a new request to hit google as the first request, then put the above javascript under the 1st request "Pre-request Script", no scripts for the 1st request's "Tests", but put `postman.setNextRequest(null);` for all other request templates' "Tests".
Now it works perfectly, except each result containing 2 requests - the 1st one is google, the 2nd one is the real one.

Any improvements on this? Googling doesn't come out some useful information. Maybe I should spend some time to read the postman documentation for a better solution.
