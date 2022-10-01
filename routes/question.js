const express = require("express");
const router = express.Router();

//controllers
const {
  listQuestions,
  readQuestions,
  create,
  editQuestion,
  editQuesType,
  deleteQuestion,
} = require("../controllers/question");
const { auth } = require("../middleware/auth");

router.get("/questions", listQuestions);

router.get("/read-question/:id", readQuestions);

router.post("/create-question", auth, create);

router.put("/change-question", auth, editQuestion);

router.put("/change-question-type", auth, editQuesType);

router.delete("/deleteQuestion/:id", auth, deleteQuestion);

module.exports = router;
