const express = require("express");
const router = express.Router();
const { Poll, User, BallotSubmission } = require("../database");

//

// //create a ballot
// router.post("/:userID/:pollId", async (req,res)=> {
// const userParams= req.params.userID
// const pollParams = req.params.pollId;
//   try{
//       const createDraft= await
// const update = BallotSubmission.findByPk(userParams,pollParams)

//   }catch(err){
//     res.sendStatus(400);
//   }
// })

router.patch("/id", async (req, res) => {
  try {
    const dymanic = Number(req.params.id);
    const change = await User.findByPk(dymanic, { Where: Poll });
    await change.ballotSubmission.update({
      ranking: req.body.ranking,
    
    });
res.sendStatus(400).json({})
  } catch (err) {
    console.error(err,"no good");
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const deleteBallot = await User.findByPk(userID, { include: Poll });
    console.log(deleteBallot.polls[0].ballotSubmission);
    await deleteBallot.polls[0].ballotSubmission.destroy();
    res.sendStatus(200).json(deleteBallot.polls);
  } catch (err) {
    console.log(err, "error");
    res.sendStatus(400);
  }
});

module.exports = router;
