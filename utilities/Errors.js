
const Errors = {
    //1**: "Opportunity Errors",
    "100": "Opportunity already exists",
    "101": "Opportunity does not exist",
    "102": "Opportunity has been updated",
    "103": "Opportunity has been deleted",    
    "104": "No Opportunity match",
    "105": "Error while getting industry and territory",
    //2**: "Industry Errors",
    "200": "Industry already exists",
    "201": "Industry does not exist",
    "202": "Industry has been updated",
    "203": "Industry has been deleted",
    "204": "No Industry match",
    //3**: "Territory Errors",
    "300": "Territory already exists",
    "301": "Territory does not exist",
    "302": "Territory has been updated",
    "303": "Territory has been deleted",
    "304": "No Territory match",
}


module.exports = function generateError(ErrCode) {

    return new Error(Errors[ErrCode]);

}