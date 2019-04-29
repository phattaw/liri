This is my interpretation of the LIRI app. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. It can also take in data from random.txt and perform the same command as if you had supplied it to liri yourself.

LIRI can take in one of the following commands:

   concert-this

   spotify-this-song

   movie-this

   do-what-it-says
   
What follows are some images of how to go about getting the most from the LIRI application.

concert-this shows you information on the concert schedule for the supplied artist. An example of using it is 'concert-this Weird Al'.

[concert-this usage examples](usageInfo/concertThis.png)

spotify-this-song shows you information on a song or artist you may be interested in. E.G. 'spotify-this-song Poker Face'

[spotify-this-song usage examples](usageInfo/spotifyThis.png)

movie-this shows you information on a movie you are interested in. E.G. 'movie-this Lord of the rings: two towers'

[movie-this usage examples](usageInfo/movieThis.png)

do-what-it-says reads the file 'random.txt' from where LIRI is called and will run any command you enter in there. E.G. 'movie-this,Lord of the rings: the two towers'. The comma is important to separate the two parts of the command.

[do-what-it-says usage examples](usageInfo/doWhatItSaysConcertThis.png)
[movie-this usage examples](usageInfo/doWhatItSaysMovieThis.png)
[spotify-this-song usage examples](usageInfo/doWhatItSaysSpotifyThisSong.png)

There is potential for the user to make mistakes when entering data in the file. To help, the user is instructed on how to use the commands passed or what kind of error LIRI is encountering. What follows is some common examples of user error.

[usage error examples](usageInfo/randomTXTUserErrors.png)

