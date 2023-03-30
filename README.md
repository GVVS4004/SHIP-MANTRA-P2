# Real Time Location Sharing Web Application
This is an application where you can share your real time location with all the other users.


# Features
* Clients can enter their latitude and longitude coordinates or select a location from the Google Map.
* Clients can see their location on the map with a green marker.
* Clients can see the locations of other active clients with a red marker.
* Clients can share their location in real-time with other clients using Socket.IO.
* The server tracks the location of all active clients and shares them with other clients in real-time.
* The application uses Google Maps API to render the map and markers.

## Installation
  1. Clone the repository to your local machine:

```bash
git clone https://github.com/GVVS4004/SHIP-MANTRA-P2.git
```
  2. Install dependencies:
 
```bash
<!-- Terminal 1 -->

cd server
npm install
```

```bash
<!-- Terminal 2 -->

cd client/frontend
npm install
```
  3. Create a .env file in the root directory with the following content:
    SECRET_KEY=YOUR_GOOGLE_API_KEY
     see the [google maps api documentation](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.)
  4. Start the servers:
```bash
<!-- Terminal 1 -->

cd server
npm start
```
&nbsp;&nbsp; This will start the nodemon server on port 5000 on your local host.
```bash
<!-- Terminal 2 -->

cd client/frontend
npm start
```
&nbsp;&nbsp;This will start the React server on default port 3000 on your local host.
## Usage
Once you have the app running, follow these steps to share your location:
1. Open atleast two tabs to see the different locations marked in different tabs see image ![threeclients](https://user-images.githubusercontent.com/93395036/228966135-ef733d38-1d2a-43d0-9a3f-7feeb281635b.png).
2. You can open tabs by clicking on the Open New tab button on the top right of the window.
3. Enter your latitude and longitude coordinates in the form on the top side of the screen or set the marker on google maps by clicking on the location.
4. Click the "Submit" button to share your location.
5. Your location will be marked with a green marker on the map.
6. Other users who are currently active in the app will be able to see your location by red marker.
7. To view the locations of other users, simply look for markers on the map that are red. These markers represent the locations of other users who are currently active in this app.
8. The Client ID and their respective locations can be seen at the bottom of the google map.
9. If a client gets dissconnected due to any reason the marker gets vanished immidiately see this ![afterSecondClientDissconnected](https://user-images.githubusercontent.com/93395036/228966272-a08f9d95-28d3-4d71-bcc9-512daa287f27.png)
after the second client got disconnected the third client which is at khammam has only first clients location info which is at Hyderabad.


Watch the video to know the usage


https://user-images.githubusercontent.com/93395036/228970535-d888cfa1-7eae-48de-ba2c-01b06275b27e.mp4



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.



## License


[MIT](https://choosealicense.com/licenses/mit/)
