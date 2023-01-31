const axios = require("axios").default;
const getToken = async (req, res) => {
    var options = {
        method: 'POST',
        url: 'https://dev-72n50yeyb2etulrf.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        "Accept-Encoding": "gzip,deflate,compress",
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'GnvZ1L99ylcQMJuWJ9bLRqeKVRLLRiYx',
            client_secret: 'cSWk3PcFAO-X9i4PY_yY7d-m63flnvr2usJqoSp_SotTty2pzIgH7XrKzYesZ5hr',
            audience: 'https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/'
        })
    };
    axios.request(options).then(function (response) {
        // console.log(response.data);
        // return response.data.access_token
        res.status(200).json(response.data)
    }).catch(function (error) {
        console.error(error);
        // res.status(500).json(error.message)
    });
}
const getRoles = async (req, res) => {
    const { sub } = req.params
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    var options = {
        method: 'GET',
        url: `https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/roles`,
        headers: {
            authorization: `${token_type} ${access_token}`,
            "Accept-Encoding": "gzip,deflate,compress"
        }
    };
    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}
const getUsers = async (req, res) => {
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    var options = {
        method: 'GET',
        url: "https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/users",
        headers: {
            authorization: `${token_type} ${access_token}`,
            "Accept-Encoding": "gzip,deflate,compress"
        }
    };
    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}
const getUserById = async (req, res) => {
    const { sub } = req.params
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    var options = {
        method: 'GET',
        url: `https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/users/${sub}`,
        headers: {
            authorization: `${token_type} ${access_token}`,
            "Accept-Encoding": "gzip,deflate,compress"
        }
    };
    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}
const getUserRoles = async (req, res) => {
    const { sub } = req.params
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    // console.log(access_token)
    var options = {
        method: 'GET',
        url: `https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/users/${sub}/roles`,
        headers: {
            authorization: `${token_type} ${access_token}`,
            "Accept-Encoding": "gzip,deflate,compress"
        }
    };
    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}
const addUserRole = async (req, res) => {
    const { sub } = req.body
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    var options = {
        method: 'POST',
        url: `https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/users/${sub}/roles`,
        headers: {
            'content-type': 'application/json',
            authorization: `${token_type} ${access_token}`,
            'cache-control': 'no-cache'
        },
        data: { roles: ['rol_ELJPY8ZkosdF0Xcm'] }
    };

    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json({ message: "Role added successfully" });
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}
const removeUserRole = async (req, res) => {
    const { sub } = req.body
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    var options = {
        method: 'DELETE',
        url: `https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/users/${sub}/roles`,
        headers: {
            'content-type': 'application/json',
            authorization: `${token_type} ${access_token}`,
            'cache-control': 'no-cache'
        },
        data: { roles: ['rol_ELJPY8ZkosdF0Xcm'] }
    };

    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json({ message: "Role removed successfully" });
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}
const updateUser = async (req, res) => {
    const { sub, nickname } = req.body
    const response = await axios.get("https://ladionisiaback-js-production.up.railway.app/auth0/token");
    const { token_type, access_token } = response.data
    var options = {
        method: 'PATCH',
        url: `https://dev-72n50yeyb2etulrf.us.auth0.com/api/v2/users/${sub}`,
        headers: {
            'content-type': 'application/json',
            authorization: `${token_type} ${access_token}`,
            'cache-control': 'no-cache'
        },
        data: { "nickname": nickname}
    };

    axios.request(options).then(function (response) {
        // console.log(response.data);
        return res.status(200).json({ message: "Information updated successfully" });
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error.message)
    });
}



module.exports = {
    getToken,
    getUserRoles,
    getUsers,
    getUserById,
    getRoles,
    addUserRole,
    removeUserRole,
    updateUser
}