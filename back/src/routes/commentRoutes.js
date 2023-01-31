const controllers = require("../controllers/commentControllers");
const express = require('express');

const router = express.Router();

const { getProductComments, postComment, destroyComment, updateRating, getCommentById, updateComment, reportComment, disableComment, getAllDisabledComments, getAllReportedComments,enableComment } = controllers;


router.get('/',getProductComments)
router.get('/disabled',getAllDisabledComments)
router.get('/reported',getAllReportedComments)
router.get('/comment/:commentId',getCommentById)
router.post('/:productId', postComment)
router.patch('/:commentId',updateComment)
router.patch('/enable/:commentId',enableComment)
router.patch('/rating/:commentId',updateRating)
router.patch('/report/:commentId',reportComment)
router.patch('/disable/:commentId',disableComment)
router.delete('/destroy/:commentId',destroyComment)


module.exports = router;