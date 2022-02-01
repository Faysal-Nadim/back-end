const Freight = require('../models/freightCat');

exports.newFreight = async (req, res) => {
    const freightObj = {
        name: req.body.name,
        rate: req.body.rate,
        createdBy: req.user._id
    }

    const fCat = new Freight(freightObj);
    await fCat.save((error, freight) => {
        if (error) return res.status(400).json({ error });
        if (freight) {
            return res.status(201).json({ freight });
        }
    });

};

exports.getFreight = async (req, res) => {
    await Freight.find({})
        .exec((error, freights) => {
            if (error) return res.status(400).json({ error });
            if (freights) {
                return res.status(200).json({ freights });
            }
        });
};



exports.updateFreight = async (req, res) => {
    const { _id, name, rate } = req.body;
    const freight = { name, rate };
    await Freight.findByIdAndUpdate(_id, freight, { new: true })
        .exec((error, updatedFreight) => {
            if (error) return res.status(400).json({ error });
            if (updatedFreight) {
                return res.status(201).json({ updatedFreight });
            }
        })

}

exports.deleteFreight = async(req, res) => {
    const { _id } = req.body;
    await Freight.findByIdAndDelete( _id )
    .exec();
}