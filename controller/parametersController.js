const { setParameters, getParameters, updateParameters } = require('../model/parametersModel.js')
const { undefinedPropertyRemover } = require('../utils/undefinedPropertyRemover.js')

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

//put
exports.updateParameters = async (req, res) => {
    //aqui é especificado a tabela
    const table = "date_parameters"
    const { id } = req.params;
    let dataSet = {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    }

    console.log(dataSet)
    dataSet = await undefinedPropertyRemover(dataSet)
    console.log(dataSet)

    try {
        const data = await updateParameters(table, id, dataSet)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
};
