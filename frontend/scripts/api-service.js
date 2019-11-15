
const ApiService = {
    getPlayers(page, results) {
        return fetch(`/api/players/page/${page}/results/${results}`, {
            method: 'GET'
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getCount(page, results) {
        return fetch(`/api/players/count`, {
            method: 'GET'
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    saveNew(obj) {
        return fetch(`/api/players`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    saveExisting(id, obj) {
        return fetch(`/api/players/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : Promise.resolve('OK')
            )
    },

    delete(id) {
        return fetch(`/api/players/${id}`, {
            method: 'DELETE'
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : Promise.resolve('OK')
            )
    },

}