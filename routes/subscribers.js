const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

)
//Getting one 
router.get('/:id', getSubScriber, async(req, res) => {
    res.send(req.subscriber)
})


// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        SubscriberToChancel: req.body.SubscriberToChancel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
//updating one 
router.patch('/:id', getSubScriber, async(req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
      }
      if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
      }
      try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})
//Deleting one 
router.delete('/:id', getSubScriber, async(req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json
    }
})


async function getSubScriber(req, res, next) {
    try {
        const subscribers = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}


module.exports = router