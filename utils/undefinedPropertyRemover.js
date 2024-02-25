async function undefinedPropertyRemover(data) {
    // data é obejeto
    Object.keys(data).forEach(key => {
        if (data[key] === undefined) {
            delete data[key];
        }
    });

    return data
}

exports.undefinedPropertyRemover = undefinedPropertyRemover