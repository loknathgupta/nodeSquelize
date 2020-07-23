const jwt = require('jsonwebtoken');
let authenticate = (req, res, next) => {
    console.log('req.headers', req.headers);
    const tokenHeader = req.headers.Authtoken || req.headers.authtoken;
    try {
        if (tokenHeader && (tokenHeader).split(' ')[0] === 'Bearer') {
            let token = (tokenHeader).split(' ')[1];
            if(token !== null){
                jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                    console.log(err)
                    if (err) {
                        return res.status(401).send({ status:'error', message: err.message });
                    }
                    if (decoded) {
                        console.log('decoded', decoded)
                        res.locals.decodedToken = decoded;
                        next();
                    }
                });
            }else{
                return res.status(401).send({ status:'error', message: 'Invalid token.' });
            }

        } else {
            return res.status(401).send({ status:'error', message: 'Invalid token.' });
        }
    } catch (error) {
        return res.status(401).send({ status:'error', message: error.message });
    }
}

let refreshToken = (req, res, next) => {
    console.log('req.headers', req.headers);
    const tokenHeader = req.headers.Authtoken || req.headers.authtoken;
    try {
        if (tokenHeader && (tokenHeader).split(' ')[0] === 'Bearer') {
            let token = (tokenHeader).split(' ')[1];
            if(token !== null){
                jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                    // console.log(err)
                    if (err) {
                        return res.status(401).send({ success: false, message: err.message });
                    }
                    if (decoded) {
                        // console.log('decoded', decoded)
                        res.locals.decodedToken = decoded;
                        let token = jwt.sign({email: decoded.email},
                            process.env.JWT_KEY,
                            { 
                                expiresIn: '12h' // expires in 24 hours
                            }
                        );
        
                        console.log(token);
                        res.status(200).json({
                            status:'success',
                            message: "Token refreshed Successfully.",
                            token : token
                        });
                        // next();
                    }
                });
            }else{
                return res.status(401).send({ success: false, message: 'Invalid User.' });
            }

        } else {
            return res.status(401).send({ success: false, message: 'Invalid User.' });
        }
    } catch (error) {
        return res.status(401).send({ success: false, message: error.message });
    }
}

module.exports = {
    authenticate,
    refreshToken
}