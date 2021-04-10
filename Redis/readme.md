# Initial setup

```js
const redis = require('redis');
const client = redis.createClient();

// as client.get expects a callback, we'll make it return a promise instead
const { promisify } = require('util');
client.get = promisify(client.get);

const cachedPosts = await client.get('posts');
if (cachedPosts) {
	console.log('serving from cache');
  return res.json(JSON.parse(cachedPosts));
} else {
  // server logic to return posts
	console.log('serving from mongoDB');
  client.set('posts', JSON.stringify(posts));
}
```



# Commands

##SET

```js
client.set('country', 'Portugal');
```

With expiration of 60 seconds (TTL = 60):

```js
client.set('country', 'Portugal', 'EX', 60);
```



##GET

```js
client.get('country', console.log)
```



##HMSET

**H**ash **M**ap **SET**

```js
client.hmset('countries', 'Portugal', 'Spain', 'UK');
```

Values don't only have to be strings. They can also be hashes (objects):

```js
client.hmset('countries', {
    'Europe': 'Portugal',
    'Asia': 'Japan',
    'America': 'Canada'
});
```

Values in Redis can also be lists, sets (which are unsorted), sorted sets, hyperLogLogs, etc.



##HGETALL

```js
client.hgetall('countries', console.log)
```



##RPUSH

```js
client.rpush(['countries', 'Portugal', 'Spain'], console.log)
```

This creates a list called `countries` and pushes two elements to it



##LRANGE

Retrieves the elements of a list.

```js
client.lrange('countries', 0, -1, console.log) // ['Portugal', 'Spain']
```



##SADD

Same as `RPUSH`, but doesn't allow duplicates i.e. stores sets instead of arrays.

```js
client.sadd(['countries', 'Portugal', 'Portugal', 'Spain'], console.log)
```



##SMEMBERS

Retrieves members of the set. The order isn't preserved.

```js
client.smembers('countries', console.log)
```



##EXISTS

```js
client.exists('cities', console.log)
```



##DEL

```js
client.del('countries', console.log)
```



##INCR

Increments a given key by 1.

```js
client.set('population', 5);
client.incr('population', console.log) // 6
```

