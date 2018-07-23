# liri-node-app

LIRI is a node.js application built to test node api packages for Spotify, Twitter, and OMDB.
Run the app in the command line using node and give it one of four commands:

 - my-tweets (ex. node liri.js my-tweets)
     - This returns the text and date created for your 20 most recent tweets.

 - spotify-this-song (ex. node liri.js spotify-this-song "all the small things")
     - This returns title, artist, album, and a preview url if available.
     - If no search is entered, this command defaults to "The Sign" by Ace of Base.

 - movie-this (ex. node liri.js movie-this "iron man")
     - This returns the title, release year, imdb rating, rotten tomatoes rating, plot, and cast of the given movie. 
     - If no search is entered, this command defaults to "Mr. Nobody".

 - do-what-it-says (ex. node liri.js do-what-it-says)
     - This command reads a file called random.txt and performs one of the previous three commands based on what is written in the text file.
     - Currently, this command will read random.txt and then execute a spotify-this-song command for the track titled "Whistleblower"