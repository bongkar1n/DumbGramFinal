const { user, follows } = require("../../models");

exports.following = async (req, res) => {
  try {
    const { userId } = req;

    const anyuser = await user.findOne({
      where: {
        id: userId,
      },
    });

    if (!anyuser) {
      res.send({
        status: "failed",
        message: "user not found",
      });
    }

    const following = await follows.findAll({
      where: {
        followerId: userId,
      },
      attributes: [["followerId", "id"]],
      include: {
        model: user,
        as: "following",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
    });

    const userFollowing = following.map((f) => ({
      id: f.id,
      user: f.following,
    }));

    res.send({
      status: "success",
      message: "successfully show whom you follow ",
      data: {
        following: userFollowing,
      },
    });
  } catch (error) {
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFollower = async (req, res) => {
  try {
    const { userId } = req;
    const anyuser = await user.findOne({
      where: {
        id: userId,
      },
    });

    if (!anyuser) {
      res.send({
        status: "failed",
        message: "user not found",
      });
    }

    const followers = await follows.findAll({
      where: {
        followingId: userId,
      },
      attributes: [["followingId", "id"]],
      include: {
        model: user,
        as: "follower",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
    });

    const userFollow = followers.map((f) => ({
      id: f.id,
      user: f.follower,
    }));

    res.send({
      status: "success",
      data: {
        followers: userFollow,
      },
    });
  } catch (error) {
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const anyuser = await user.findOne({
      where: {
        id,
      },
    });

    if (!anyuser) {
      res.send({
        status: "failed",
        message: "user not found",
      });
    }

    //check if it has been followed

    const check = await follows.findOne({
      where:{
        followerId: userId,
        followingId: id,
      }
    });

    if (!check) {
      const addFollows = await follows.create({
        followerId: userId,
        followingId: id,
      });
    } 
    // else {
    //   return res.send({
    //     status: "failed",
    //     message: "you already followed this user",
    //   });
      // const eraseFollow = await follows.destroy({
      //   where: {
      //     id: check.id
      //   }
      // })
      
    // }

    const showAdd = await follows.findOne({
      where: {
        id: addFollows.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "followingId"],
      },
      include: {
        model: user,
        as: "following",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully followed other person",
      data: {
        follow: showAdd,
      },
    });
  } catch (error) {
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    // const {followed} = req.body

    const check = await follows.findOne({
      where: {
        followerId: userId,
        followingId: id,
      }
    });

    if(check) {
      
      const deleteFollow = await follows.destroy({
        where: {
          id: check.id
        }
      })
    } 
    // else {
    //   res.send({
    //     status: "failed",
    //     message: "You already deleted this"
    //   })
    // }

    res.send({
      status: "success",
      message: "successfully deleted following's status",
      data: deleteFollow
    })



    
  } catch (error) {
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
}



exports.isFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const follow = await follows.findOne({
      where: {
        followerId: userId,
        followingId: id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })

    if(follow){
      res.send({
        status: "success",
        message: "successfully get follow data",
        data: true
      });
    } else {
      res.send({
        status: "fail",
        message: "not following",
        data: false
      });
    }

  } catch (error) {
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
}