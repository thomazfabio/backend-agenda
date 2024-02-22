const {setParameters, getParameters} = require('../model/parametersModel.js')

//get
exports.getParameters = async (req, res) => {
    const data = await getParameters()
    console.log(data) 
    res.json(data)
};

//post
exports.setParameters = async (req, res) => {
   const data = await setParameters(req.body)
    console.log(data)
    res.json(data)
};
