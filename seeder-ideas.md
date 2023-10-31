* npx sequelize-cli model:generate --name ReviewImage --attributes reviewId:INTEGER,url:STRING

* npx sequelize-cli model:generate --name Booking --attributes spotId:INTEGER,userId:INTEGER,startDate:DATE,endDate:DATE

* npx sequelize-cli model:generate --name Review --attributes spotId:INTEGER,userId:INTEGER,review:STRING,stars:INTEGER

npx sequelize-cli model:generate --name Spot --attributes ownerId:INTEGER,address:STRING,city:STRING,state:STRING,country:STRING,lat:DECIMAL,lng:DECIMAL,name:STRING,description:STRING,price:DECIMAL

npx sequelize-cli model:generate --name SpotImage --attributes spotId:INTEGER,url:STRING,preview:BOOLEAN


integer
string
boolean
date
float: approximate decimal number
decimal: exact decimal number



# GroundBnB
- Include disclaimer on main page:
  + No refunds given for not being able to fit in your chosen subterranean abode. DOUBLE CHECK DESCRIPTION BEFORE BOOKING.

## Seeders
- Shanghai Tunnels in Portland
- Cask of Amantiatto reference
- Some Dude's Basement
- Legit just a random crevice in a cave where bats sleep
- Pistol Shrimp/Goby hole under a rock. You gotta pay to pet sit, basically, while the Goby is on vacation
- Legit just a random crevice in a cave where bats sleep
- Chauvet Cave in France (cave paintings)
- Cave in Greece where Zeus was Said to Have Been Born (include a few of these, as there are conflicting legends)
- Some Doomsday Bunker in the US -- may or may not include radioactive giant cockroaches
- Montezuma Castle (Arizona)
- Elengubu (underground city in Cappadocia -- Turkey) -- might need to go back like a thousand years for all the comforts of home, but it'll still keep you dry today
- Roman Catacombs -- never feel alone again!
- Trapdoor spider -- has a DOOR and everything!
- Meerkat
- Prairie Dog
- Burrowing Owl
- Naked Mole Rat
- Desert Tortoise (might actually fit a human?)
- Burrowing Urchin (underwater, small circular burrows carved out of LIMESTONE.)
- Ant nest
- Termite Mound in Botswana -- a child might be able to fit?
- Space Under the Erickson House
- Hobbit Hole -- evil ring probably not included
- A Burrow (have like twelve of these, all slightly different)
- Some Polar Bear Den in the Snow
  + "I don't know, does this really count as a ground dwelling? It's over ice... sort of misleading, ngl"
  + "What is this, icebnb? -eyerollemoji-"
- That Annoying Mole Hill in Jim's Front Yard
  + "Nice lack of view, but they want you to sweep when you leave?  Like why, the floor is dirt?"
