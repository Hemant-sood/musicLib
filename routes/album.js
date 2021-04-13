const express = require('express');
const router = express.Router();
const Song = require('../model/Song');
const Album = require('../model/Album');
const auth = require('../middleware/auth').auth;
const getCurrentUser = require('../middleware/auth').getCurrentUser;
const { response } = require('express');


router.get('/', auth, async(request, response) => {

    var data;
    var user = await getCurrentUser(request.cookies);

    if (!user || !user.isArtist)
        return response.status(401).send("Invalid user");

    var album = await Album.find({ artist: user._id });

    var data = {
        album
    };

    response.render('../views/album.ejs', { data });

});

router.get('/:id', auth, async(request, response) => {

    let album;
    try {
        album = await Album.findById(request.params.id).populate("songs");
    } catch (ex) {
        return response.status(404).send("Invalid Album");
    }
    if (!album)
        return response.send("Invalid Album");

    var data = {
        album
    };

    response.render("../views/showAlbum.ejs", { data });

});


// To Rename a specific Album
router.post('/renameAlbum', auth, async(request, response) => {

    let user = await getCurrentUser(request.cookies);
    if (!user || !user.isArtist) {

        return response.status(401).send("Artist not found");
    }

    const albumId = request.body.albumId;
    const albumNewName = request.body.albumNewName;

    let resAlbum = await Album.findById(albumId);

    if (!resAlbum)
        return response.send({
            msg: "Album does not exist"
        });

    resAlbum.name = albumNewName;
    await resAlbum.save();


    response.send({ msg: "Album Rename successfully" });

});


module.exports = router;