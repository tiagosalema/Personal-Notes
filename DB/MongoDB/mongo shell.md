# mongo shell

|                              | JSON          | BSON           |
| ---------------------------- | ------------- | -------------- |
| imports (back to the server) | `mongoimport` | `mongorestore` |
| exports (from the server)    | `mongoexport` | `mongodump`    |



**Export**

+ BSON

  ```sh
  mongodump --uri "<Atlas Cluster URI>"
  ```

  example:

  ```shell
  mongodump --uri "mongodb+srv://sandbox.XXXX.mongodb.net/myFirstDB"
  ```

  

+ JSON

  ```sh
  mongoexport --uri="<Atlas Cluster URI>" --collection=<name> --out=<filename>.json
  ```



**Import** 

+ BSON

  ```sh
  mongodump --uri "<Atlas Cluster URI>" --drop <folder_name>
  ```

  example:

  ```shell
  mongorestore --uri "mongodb+srv://sandbox.XXXX.mongodb.net/myFirstDB" --drop dump
  ```

  This is run on a folder that contains the `dump` folder. It will drop the `myFirstDB` collection (to avoid duplicates) and update the `dump` folder in its place.

  

+ JSON

  ```shell
  mongoimport --uri "mongodb+srv://sandbox.XXXX.mongodb.net/myFirstDB" --drop sales.json
  ```

  This is run on a folder that contains the ` sales.json` file. It will drop the `myFirstDB` collection (to avoid duplicates) and update the `dump` folder in its place.

  A collection can also be specified:

  ```shell
  mongoimport --uri "mongodb+srv://sandbox.XXXX.mongodb.net/myFirstDB" --drop sales.json --collection sales
  ```

  If the collection isn't specified, it will have the same name as the imported file i.e. `sales`





## Query

```shell
show dbs												# shows all databases in cluster

use sample_training 						# activates the sample_training database

show collections 								# shows collections in the active database

db.zips.find({"state": "NY"})		# finds query in collection zips of active database
```

`it` iterates through the cursor

```shell
db.zips.find({"state": "NY"}).count()

db.zips.find({"state": "NY", "city": "ALBANY"})

db.zips.find({"state": "NY", "city": "ALBANY"}).pretty()
```

```shell
db.inspections.findOne();
```

```shell
db.inspections.insert({
  "field1" : "value1",
  "field2" : "value2",
})													# inserts 1 document
db.inspections.insert([
	{ "field1": "value1", "field2" : "value2" },
  { "field1": "value1", "field2" : "value2" }
])													# inserts many documents by use of []
```

## Update

```shell
# increment every population field by 10 that is found by the query { "city": "NY" }
db.cities.updateMany({ "city": "NY" }, { "$inc": { "population": 10 } })
```

```shell
# updates population to 17630. If the 'population' field doesn't exist, an error is NOT thrown. The field is created instead.
db.cities.updateOne({ "city": "NY" }, { "$set": { "population": 17630 } })
```

+ Push element to array

```shell
# pushes another element to the 'scores' array
db.grades.updateOne({
	"student_id": 250,
	"class_id": 339
},
{
	"$push": {
		"scores": {
			"type": "extra credit",
			"score": 100
		}
	}
})
```

## Delete

```shell
db.inspections.deleteMany({ "test": 1 })
db.inspections.deleteOne({ "test": 3 })

db.<collection>.drop()
```



# operators

## comparison operators

format:

```
{ <field>: { <operator>: <value> } }
```



|      |                          |
| ---- | ------------------------ |
| $eq  | equal to                 |
| $ne  | not equal to             |
| $gt  | greater than             |
| $lt  | less than                |
| $gte | greater than or equal to |
| $lte | less than or equal to    |

## logic operators

+ $and
+ $or
+ $nor

format:

```
{ <operator>: [{statement1},{statement2},...] }
```



+ $not

format:

```
{$not: {statement}}
```

## expressive operator

Allows the use of variables

$expr

format

```
{ $expr: { <expression> } }
```



```MQL
{ "$expr": {
					"$and": [
									{ "$gt": [ "$tripduration", 1200 ]},
                  { "$eq": [ "$end station id", "$start station id" ]}
								]
           }
}
```

Notice the used syntax:

```
									{ <field>: { <operator>: <value> } }
```

Instead of, as it has been usual:

```
									{ <operator>: { <field>: <value> } }
```

The former is the usual MQL syntax, whilst the latter is the aggregation syntax.

## array operator

+ $size	specifies exactly how many items the array should have

+ $all e.g. the amenities array has to have at least these 3 items

  ```
  {
  	"amenities": { "$all": [ "Internet", "Wifi",  "Kitchen" ] }
  }
  ```

+ $elemMatch returns arrays whose object has a field with the specified value

  ```
  {
  	"scores": {
  		"$elemMatch": {
  			"type": "extra credit"
  		}
  	}
  }
  ```

  this would return the first student, but not the second:

  ```
  {
  	"_id": "1",
  	"scores": [
  		{
  			"type": "exam",
  			"score": 73.5
  		},
  		{
  			"type": "extra credit",
  			"score": 100
  		}
  	]
  }
  ```

  ```
  {
  	"_id": "2",
  	"scores": [
  		{
  			"type": "exam",
  			"score": 93.5
  		},
  		{
  			"type": "homework",
  			"score": 25.3
  		}
  	]
  }
  ```

  



# Projections

Limit how many fields are fetched in every document. Especially useful when documents have too many fields that aren't necessary.

```
db.<collection>.find({ <query> },{ <projection> })
```

Where the projection consists of fields with values 1 only or fields with values 0 only:

```
{
	"field 1": 1,
	"field 2": 1
}
```

fields outputted will only be `field 1` and `field 2`

```
{
	"field 1": 0,
	"field 2": 0
}
```

fields outputted will be **_all but_** `field 1` and `field 2`

It is only possible to include both `1` and `0` in the same projection if the 0 is only being applied to `_id`, as this field is always included by default.



# Aggregate

Uses `.aggregate` instead of `.find`

```
db.listingsAndReviews.aggregate([
                                  { "$match": { "amenities": "Wifi" } },
                                  { "$project": { "price": 1,
                                                  "address": 1,
                                                  "_id": 0 }}]).pretty()
```



```
db.listingsAndReviews.aggregate([
                                  { "$project": { "address": 1, "_id": 0 }},
                                  { "$group": { "_id": "$address.country",
                                                "count": { "$sum": 1 } } }
                                ])
```



# Cursor methods

+ pretty()
+ count()
+ limit()
+ sort()

Sort zips by population in descending (`-1`) order (from most populated to least)

```
db.zips.find().sort({ "pop": -1 })
```

Only the 5 most populated

```
db.zips.find().sort({ "pop": -1 }).limit(5)
```

Most populated with cities sorted in alphabetical order

```
db.zips.find().sort({ "pop": -1, "city": 1 })
```



# Indexes

```
use sample_training

db.trips.find({ "birth year": 1989 })

db.trips.find({ "start station id": 476 }).sort( { "birth year": 1 } )

db.trips.createIndex({ "birth year": 1 })

db.trips.createIndex({ "start station id": 1, "birth year": 1 })
```



# Update

## Upsert

Set to false by default. When set to true, a new collection is created if the data doesn't exist yet, or will be updated if it already does.

```
db.iot.updateOne({ "sensor": r.sensor, "date": r.date,
                   "valcount": { "$lt": 48 } },
                         { "$push": { "readings": { "v": r.value, "t": r.time } },
                           "$inc": { "valcount": 1, "total": r.value } },
                 { "upsert": true })
```







```
mongo "mongodb+srv://sandbox.vcaob.mongodb.net/admin" --username m001-student
```

