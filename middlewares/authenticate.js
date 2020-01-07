const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //console.log('req.headers', req.headers);
    const tokenHeader = req.headers.Authtoken || req.headers.authtoken;
    try {
        if (tokenHeader && (tokenHeader).split(' ')[0] === 'Bearer') {
            let token = (tokenHeader).split(' ')[1];
            if(token !== null){
                jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                    console.log(err)
                    if (err) {
                        return res.status(401).send({ success: false, message: err.message });
                    }
                    if (decoded) {
                        console.log('decoded', decoded)
                        res.locals.decodedToken = decoded;
                        next();
                    }
                });
            }else{
                return res.status(401).send({ success: false, message: 'Invalid token' });
            }

        } else {
            return res.status(401).send({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).send({ success: false, message: error.message });
    }
}