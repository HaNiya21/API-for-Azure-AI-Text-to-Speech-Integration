const axios = require('axios');
const xml2js = require('xml2js');

const getCapitalOfFrance = async () => {
    const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
    
    const requestBody = `<?xml version="1.0" encoding="utf-8"?> 
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
            <soap:Body>
                <web:CapitalCity>
                    <web:sCountryName>France</web:sCountryName>
                </web:CapitalCity>
            </soap:Body>
        </soap:Envelope>`;
    
    try {
        const response = await axios.post(url, requestBody, {
            headers: { 'Content-Type': 'text/xml' }
        });

        const result = await xml2js.parseStringPromise(response.data);
        return result['soap:Envelope']['soap:Body'][0]['m:CapitalCityResponse'][0]['m:CapitalCityResult'][0];
    } catch (error) {
        console.error(error);
    }
};

module.exports = { getCapitalOfFrance };
