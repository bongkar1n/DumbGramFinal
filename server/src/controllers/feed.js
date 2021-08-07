const { user, feed, follows, like, comment } = require("../../models");

exports.addFeed = async (req, res) => {
  try {
    const { caption } = req.body;
    const { userId } = req;
    const image = req.files.imageFile[0].filename;

    const dataFeed = await feed.create({
      fileName: image,
      caption,
      userId,
    });

    const feeds = await feed.findOne({
      where: {
        id: dataFeed.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully add feed",
      data: {
        feed: feeds,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFeedById = async (req, res) => {
  try {
    const { userId } = req;
   

    let feedById = await feed.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
    });


    res.send({
      status: "success",
      message: "succesfully get all feed by Id",
      data: feedById,
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};



exports.getFeedByIdUser = async (req, res) => {
  try {
    const { id } = req.params ;

    let feedById = await feed.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
    });

    res.send({
      status: "success",
      message: "succesfully get all feed by Id",
      data: feedById,
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFeedByFollow = async (req, res) => {
  try {
    const { userId } = req;

    const feedByFollow = await follows.findAll({
      where: {
        followerId: userId,
      },
      attributes: ["followingId"],
    });

    const mapResult = feedByFollow.map((f) => f.followingId);
    console.log(mapResult);

    let result = [];

    for (const key of mapResult) {
      console.log(key);
      const feeds = await feed.findAll({
        attributes: ["id", "fileName", "caption", "feedLike"],
        where: {
          userId: key,
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "email", "bio"],
          },
        },
      });
      result.push(...feeds);
    }

    res.send({
      status: "success",
      message: "succesfully get all feed by follow",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getAllFeeds = async (req, res) => {
  try {
    const getAll = await feed.findAll({
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "success",
      message: "you got all feeds",
      data: {
        feed: getAll,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addLike = async (req, res) => {
  try {
    const { feedId } = req.body;
    const { userId } = req;

    // checking feed

    const anyfeed = await feed.findOne({
      where: {
        id: feedId,
      },
    });

    if (!anyfeed) {
      res.send({
        status: "failed",
        message: "feed not found",
      });
    }

    const check = await like.findOne({
      where: {
        feedId,
        userId,
      },
    });


    if(check){

      const feeds = await feed.findOne({
          where: {
              id: feedId
          }
      })

      const likes = feeds.feedLike - 1

      await feed.update({feedLike: likes}, { where: { id: feedId } })

      await like.destroy({
          where: {
              feedId: feedId,
              UserId: userId
          }
      })

      return res.send({
          status: 'success',
          message: 'Dislike',
          feedLike: likes
      })
  }


  
      const data = await feed.findOne({
        where: {
            id: feedId
        }
    })

    await like.create({
      feedId: feedId,
      userId: userId
    })
    const likes = data.feedLike + 1

            await feed.update({feedLike: likes},{
                where: {
                    id: feedId
                }
            })

            res.send({
                status: 'success',
                id: feedId,
                feedLike: likes
            })


    const showLike = await like.findOne({
      where: {
        feedId: feedId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      include: {
        model: feed,
        as: "likeFeed",
        attributes: {
          exclude: ["id", "fileName", "caption", "createdAt", "updatedAt"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email", "image", "username", "id"],
          },
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully added like",
      data: showLike
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.isLiked = async (req, res) => {
  try {
    
    const {id} = req.params
    const {userId} = req

    const liked = await like.findOne({
      where: {
        userId,
        feedId: id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })

    if(liked){
      res.send({
        status: "success",
        message: "already liked",
        data: true
      })
    } else {
      res.send({
        status: "not yet",
        message: "not liked",
        data: false
      })
    }
    
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error"
    })
    
  }
}

exports.getAllComments = async (req, res) => {
  try {
    // const { id } = req.params;
    const { userId } = req;

    const allComments = await comment.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "feedId"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully got all comments by feed Id",
      data: {
        comment: allComments,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { feedId, comments } = req.body;
    const { userId } = req;

    const addOneComment = await comment.create({
      userId,
      feedId,
      comment: comments,
    });

    const showComment = await comment.findOne({
      where: {
        feedId: addOneComment.feedId,
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt", "feedId", "id"],
      },
      include: {
        model: feed,
        as: "feed",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
          },
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully added comment",
      data: {
        comment: showComment,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};



exports.getCommentByFeedId = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const allComments = await comment.findAll({
      where: {
        feedId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully got all comments by feed Id",
      data: {
        comment: allComments,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
