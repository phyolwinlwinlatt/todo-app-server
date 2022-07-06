const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.create)
router.get('/', todoController.getAll)
router.delete('/', todoController.deleteMany)

router.get('/:id', todoController.getOne)
router.put('/:id', todoController.updateOne)
router.delete('/:id', todoController.deleteOne)

module.exports = router