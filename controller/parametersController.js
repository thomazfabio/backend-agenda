const { setParameters, getParameters } = require('../model/parametersModel.js')

//get
exports.getParameters = async (req, res) => {
    const data = await getParameters()
    console.log(data)
    res.json(data)
};

//post
exports.setParameters = async (req, res) => {
    let dataSet = {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    }
    const data = await setParameters(dataSet)
    console.log(data)
    res.json(data)
};
